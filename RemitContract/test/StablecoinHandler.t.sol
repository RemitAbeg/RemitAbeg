// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/StablecoinHandler.sol";

/// @title StablecoinHandlerTest
/// @notice Unit tests for StablecoinHandler contract
contract StablecoinHandlerTest is Test {
    StablecoinHandler stablecoinHandler;
    address usdc = address(0xA0b86a33e644E8a3a9C4A2e8b1C7F2D3E4f5a6B7);
    address usdt = address(0xb1C7f2d3e4F5a6B7C8D9e0F1A2b3c4d5E6F7a8B9);

    function setUp() public {
        stablecoinHandler = new StablecoinHandler();
    }

    function testWhitelistToken() public {
        stablecoinHandler.whitelistToken(usdc);
        assertTrue(stablecoinHandler.isWhitelisted(usdc));
    }

    function testBlacklistToken() public {
        stablecoinHandler.whitelistToken(usdc);
        stablecoinHandler.blacklistToken(usdc);
        assertFalse(stablecoinHandler.isWhitelisted(usdc));
    }

    function testIsWhitelisted() public {
        assertFalse(stablecoinHandler.isWhitelisted(usdc));
        stablecoinHandler.whitelistToken(usdc);
        assertTrue(stablecoinHandler.isWhitelisted(usdc));
    }

    function testCannotWhitelistTwice() public {
        stablecoinHandler.whitelistToken(usdc);
        vm.expectRevert("Already whitelisted");
        stablecoinHandler.whitelistToken(usdc);
    }

    function testCannotBlacklistUnwhitelisted() public {
        vm.expectRevert("Not whitelisted");
        stablecoinHandler.blacklistToken(usdc);
    }

    function testOnlyAdminCanWhitelist() public {
        address nonAdmin = address(0x123);
        vm.prank(nonAdmin);
        vm.expectRevert();
        stablecoinHandler.whitelistToken(usdc);
    }
}