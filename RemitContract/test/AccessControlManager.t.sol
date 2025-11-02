// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AccessControlManager.sol";

/// @title AccessControlManagerTest
/// @notice Unit tests for AccessControlManager contract
contract AccessControlManagerTest is Test {
    AccessControlManager accessControlManager;

    function setUp() public {
        accessControlManager = new AccessControlManager();
    }

    function testDefaultAdminRole() public view {
        assertTrue(accessControlManager.hasRole(accessControlManager.DEFAULT_ADMIN_ROLE(), address(this)));
        assertTrue(accessControlManager.hasRole(accessControlManager.ADMIN_ROLE(), address(this)));
    }

    function testGrantRole() public {
        address user = address(0x123);
        accessControlManager.grantRole(accessControlManager.AGENT_ROLE(), user);
        assertTrue(accessControlManager.hasRole(accessControlManager.AGENT_ROLE(), user));
    }

    function testRevokeRole() public {
        address user = address(0x123);
        accessControlManager.grantRole(accessControlManager.AGENT_ROLE(), user);
        accessControlManager.revokeRole(accessControlManager.AGENT_ROLE(), user);
        assertFalse(accessControlManager.hasRole(accessControlManager.AGENT_ROLE(), user));
    }

    // function testOnlyAdminCanGrant() public {
    //     address user = address(0x123);
    //     bytes32 adminRole = accessControlManager.ADMIN_ROLE();
        
    //     vm.prank(user);
    //     vm.expectRevert(
    //         abi.encodeWithSelector(
    //             bytes4(keccak256("AccessControlUnauthorizedAccount(address,bytes32)")),
    //             user,
    //             adminRole
    //         )
    //     );
    //     accessControlManager.grantRole(accessControlManager.AGENT_ROLE(), user);
    // }
}