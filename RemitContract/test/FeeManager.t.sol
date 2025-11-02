// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../src/AccessControlManager.sol";

/// @title FeeManager
/// @notice Manages platform fee rates, collection, and withdrawal
/// @dev Tracks collected fees per token; fees are transferred from Core contract
contract FeeManager is AccessControlManager {
    /// @notice Fee rate in basis points (e.g., 50 = 0.5%)
    uint256 public feeRate;
    /// @notice Address to receive withdrawn fees
    address public feeRecipient;
    /// @notice Accumulated fees per token
    mapping(address => uint256) public collectedFees;

    /// @notice Emitted when fee rate is updated
    event FeeRateUpdated(uint256 indexed newRate);
    /// @notice Emitted when fees are withdrawn
    event FeesWithdrawn(address indexed token, uint256 amount);

    /// @notice Constructor sets initial fee rate and recipient; requires Core address for validation
    /// @param _core Address of the RemitAbegCore contract
    /// @param _feeRecipient Address to send fees to
    constructor(address _core, address _feeRecipient) {
        require(_core != address(0), "Invalid core address");
        require(_feeRecipient != address(0), "Invalid fee recipient");
        feeRate = 50; // Default 0.5%
        feeRecipient = _feeRecipient;
    }

    /// @notice Update the platform fee rate (admin only)
    /// @param _newRate New fee rate in basis points
    function updateFeeRate(uint256 _newRate) external onlyRole(ADMIN_ROLE) {
        require(_newRate <= 1000, "Fee rate too high"); // Max 10%
        feeRate = _newRate;
        emit FeeRateUpdated(_newRate);
    }

    /// @notice Calculate fee for a given amount
    /// @param amount Amount to calculate fee on
    /// @return fee Fee amount in same units as input
    function calculateFee(uint256 amount) external view returns (uint256) {
        return (amount * feeRate) / 10000;
    }

    /// @notice Record a fee collection (called by Core after transfer)
    /// @param token Token address
    /// @param fee Fee amount collected
    function recordFee(address token, uint256 fee) external {
        require(msg.sender == address(this), "Only self"); // Enforced by Core transfer before call
        collectedFees[token] += fee;
    }

    /// @notice Withdraw accumulated fees for a token (admin only)
    /// @param token Token address
    /// @param amount Amount to withdraw
    function withdrawFees(address token, uint256 amount) external onlyRole(ADMIN_ROLE) {
        require(amount > 0, "Amount must be positive");
        require(collectedFees[token] >= amount, "Exceeds collected fees");
        collectedFees[token] -= amount;
        SafeERC20.safeTransfer(IERC20(token), feeRecipient, amount);
        emit FeesWithdrawn(token, amount);
    }
}