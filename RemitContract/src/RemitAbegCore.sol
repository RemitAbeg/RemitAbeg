// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import "./AccessControlManager.sol";
import "./FeeManager.sol";
import "./StablecoinHandler.sol";

/// @title RemitAbegCore
/// @notice Core logic for creating, claiming, and cancelling remittances
/// @dev Handles token transfers securely; integrates with FeeManager and StablecoinHandler

contract RemitAbegCore is AccessControlManager, ReentrancyGuard {
    FeeManager public immutable feeManager;
    StablecoinHandler public immutable stablecoinHandler;

    /// @notice Struct for remittance records
    struct Remittance {
        address sender;
        address recipient;
        address token;
        uint256 amount; // Net amount for recipient (after fee)
        uint256 timestamp;
        bool claimed;
        bool cancelled;
    }

    /// @notice Mapping of remittance ID to details
    mapping(uint256 => Remittance) public remittances;
    /// @notice Next available remittance ID
    uint256 public nextRemittanceId;

    /// @notice Emitted when a remittance is sent
    event RemittanceSent(
        uint256 indexed id,
        address indexed sender,
        address indexed recipient,
        address token,
        uint256 amount
    );
    /// @notice Emitted when a remittance is claimed
    event RemittanceClaimed(uint256 indexed id, address indexed claimant);
    /// @notice Emitted when a remittance is cancelled
    event RemittanceCancelled(uint256 indexed id);

    /// @notice Constructor initializes dependencies
    /// @param _feeManager Address of FeeManager contract
    /// @param _stablecoinHandler Address of StablecoinHandler contract
    constructor(FeeManager _feeManager, StablecoinHandler _stablecoinHandler) {
        require(address(_feeManager) != address(0), "Invalid fee manager");
        require(address(_stablecoinHandler) != address(0), "Invalid stablecoin handler");
        feeManager = _feeManager;
        stablecoinHandler = _stablecoinHandler;
    }

    /// @notice Send a remittance (amount is net for recipient; fee added)
    /// @param recipient Recipient address
    /// @param token Stablecoin token address
    /// @param amount Net amount for recipient
    function sendRemittance(address recipient, address token, uint256 amount)
        external
        nonReentrant
    {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be positive");
        require(stablecoinHandler.isWhitelisted(token), "Unsupported token");

        uint256 fee = feeManager.calculateFee(amount);
        uint256 total = amount + fee;

        IERC20 erc20 = IERC20(token);
        SafeERC20.safeTransferFrom(erc20, msg.sender, address(this), total);
        SafeERC20.safeTransfer(erc20, address(feeManager), fee);
        feeManager.recordFee(token, fee);

        remittances[nextRemittanceId] = Remittance({
            sender: msg.sender,
            recipient: recipient,
            token: token,
            amount: amount,
            timestamp: block.timestamp,
            claimed: false,
            cancelled: false
        });

        emit RemittanceSent(nextRemittanceId, msg.sender, recipient, token, amount);
        nextRemittanceId++;
    }

    /// @notice Claim a remittance (recipient only)
    /// @param id Remittance ID
    function claimRemittance(uint256 id) external nonReentrant {
        Remittance storage rem = remittances[id];
        require(!rem.claimed && !rem.cancelled, "Remittance unavailable");
        require(msg.sender == rem.recipient, "Not recipient");

        rem.claimed = true;
        SafeERC20.safeTransfer(IERC20(rem.token), rem.recipient, rem.amount);

        emit RemittanceClaimed(id, msg.sender);
    }

    /// @notice Cancel a remittance (sender or admin only; refunds net amount)
    /// @param id Remittance ID
    function cancelRemittance(uint256 id) external nonReentrant {
        Remittance storage rem = remittances[id];
        require(!rem.claimed && !rem.cancelled, "Remittance unavailable");
        require(
            msg.sender == rem.sender || hasRole(ADMIN_ROLE, msg.sender),
            "Unauthorized"
        );

        rem.cancelled = true;
        SafeERC20.safeTransfer(IERC20(rem.token), rem.sender, rem.amount);

        emit RemittanceCancelled(id);
    }
}