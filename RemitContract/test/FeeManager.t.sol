// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../src/FeeManager.sol";

/// @title MockERC20
/// @notice Mock ERC20 for testing
contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1_000_000 * 10**decimals());
    }
}

/// @title FeeManagerTest
/// @notice Unit tests for FeeManager contract
contract FeeManagerTest is Test {
    FeeManager feeManager;
    MockERC20 mockToken;
    address core = address(0xDead);
    address feeRecipient = address(0xFee);

    function setUp() public {
        mockToken = new MockERC20("Mock USDC", "mUSDC");
        feeManager = new FeeManager(core, feeRecipient);
    }

    function testConstructor() public {
        assertEq(feeManager.feeRate(), 50);
        assertEq(feeManager.feeRecipient(), feeRecipient);
    }

    function testCalculateFee() public view {
        uint256 amount = 1000 * 10**18; // Assuming 18 decimals
        uint256 fee = feeManager.calculateFee(amount);
        assertEq(fee, (amount * 50) / 10000); // 0.5% = 5e15
    }

    function testUpdateFeeRate() public {
        uint256 newRate = 100; // 1%
        feeManager.updateFeeRate(newRate);
        assertEq(feeManager.feeRate(), newRate);
    }

    function testCannotUpdateFeeRateTooHigh() public {
        vm.expectRevert("Fee rate too high");
        feeManager.updateFeeRate(1001); // >10%
    }

    function testRecordFee() public {
        // recordFee has require(msg.sender == address(this))
        // So we need to call it from the FeeManager contract itself
        // We'll use vm.prank to impersonate the FeeManager contract
        vm.prank(address(feeManager));
        feeManager.recordFee(address(mockToken), 100);
        assertEq(feeManager.collectedFees(address(mockToken)), 100);
    }

    function testWithdrawFees() public {
        uint256 feeAmount = 100 * 10**18;
        // Transfer tokens to FeeManager first
        mockToken.transfer(address(feeManager), feeAmount);
        
        // Record the fee (from FeeManager's perspective)
        vm.prank(address(feeManager));
        feeManager.recordFee(address(mockToken), feeAmount);
        
        uint256 balanceBefore = mockToken.balanceOf(feeRecipient);

        // Withdraw as admin (from test contract's perspective - which is admin)
        vm.prank(address(feeManager));
        feeManager.withdrawFees(address(mockToken), feeAmount);

        assertEq(feeManager.collectedFees(address(mockToken)), 0);
        assertEq(mockToken.balanceOf(feeRecipient), balanceBefore + feeAmount);
    }

    function testCannotWithdrawMoreThanCollected() public {
        vm.prank(address(feeManager));
        vm.expectRevert("Exceeds collected fees");
        feeManager.withdrawFees(address(mockToken), 100);
    }

    function testOnlyAdminCanUpdateFeeRate() public {
        address nonAdmin = address(0x123);
        bytes32 adminRole = feeManager.ADMIN_ROLE();
        
        vm.prank(nonAdmin);
        vm.expectRevert(
            abi.encodeWithSelector(
                bytes4(keccak256("AccessControlUnauthorizedAccount(address,bytes32)")),
                nonAdmin,
                adminRole
            )
        );
        feeManager.updateFeeRate(100);
    }

    function testOnlyAdminCanWithdraw() public {
        address nonAdmin = address(0x123);
        
        // Record a fee first
        vm.prank(address(feeManager));
        feeManager.recordFee(address(mockToken), 100);
        
        bytes32 adminRole = feeManager.ADMIN_ROLE();
        
        vm.prank(nonAdmin);
        vm.expectRevert(
            abi.encodeWithSelector(
                bytes4(keccak256("AccessControlUnauthorizedAccount(address,bytes32)")),
                nonAdmin,
                adminRole
            )
        );
        feeManager.withdrawFees(address(mockToken), 100);
    }
}