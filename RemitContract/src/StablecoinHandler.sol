// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import "./AccessControlManager.sol";

/// @title StablecoinHandler
/// @notice Handles whitelisting and validation of supported stablecoins
/// @dev Uses SafeERC20 for secure token interactions; admin-only whitelisting

contract StablecoinHandler is AccessControlManager {
    /// @notice Mapping of whitelisted stablecoin addresses
    mapping(address => bool) public whitelistedTokens;

    /// @notice Emitted when a token is whitelisted
    event TokenWhitelisted(address indexed token);
    /// @notice Emitted when a token is blacklisted
    event TokenBlacklisted(address indexed token);

    /// @notice Whitelist a supported stablecoin (e.g., USDT, USDC)
    /// @param token Address of the ERC20 token to whitelist
    function whitelistToken(address token) external onlyRole(ADMIN_ROLE) {
        require(!whitelistedTokens[token], "Already whitelisted");
        whitelistedTokens[token] = true;
        emit TokenWhitelisted(token);
    }

    /// @notice Blacklist a previously whitelisted token
    /// @param token Address of the ERC20 token to blacklist
    function blacklistToken(address token) external onlyRole(ADMIN_ROLE) {
        require(whitelistedTokens[token], "Not whitelisted");
        whitelistedTokens[token] = false;
        emit TokenBlacklisted(token);
    }

    /// @notice Check if a token is whitelisted for use in remittances
    /// @param token Address of the ERC20 token
    /// @return bool True if whitelisted
    function isWhitelisted(address token) external view returns (bool) {
        return whitelistedTokens[token];
    }
}