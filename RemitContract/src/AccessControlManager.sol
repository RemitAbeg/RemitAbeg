// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/AccessControl.sol";

/// @title AccessControlManager
/// @notice Manages role-based permissions for the RemitAbeg protocol
/// @dev Inherits from OpenZeppelin's AccessControl for standard role management

contract AccessControlManager is AccessControl {
    /// @notice Role for protocol administrators
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    /// @notice Role for trusted agents (e.g., off-ramp partners)
    bytes32 public constant AGENT_ROLE = keccak256("AGENT_ROLE");
    /// @notice Role for regular users (optional for future restrictions)
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    /// @dev Constructor grants default admin role and ADMIN_ROLE to deployer
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
}