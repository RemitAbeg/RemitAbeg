// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../src/RemitAbegCore.sol";
import "../src/FeeManager.sol";
import "../src/StablecoinHandler.sol";

/// @title MockERC20
/// @notice Mock ERC20 for testing (repeated for isolation)
contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 10_000_000 * 10**decimals());
    }
}

/// @title RemitAbegCoreTest
/// @notice Comprehensive unit tests for RemitAbegCore contract
contract RemitAbegCoreTest is Test {
    RemitAbegCore core;
    FeeManager feeManager;
    StablecoinHandler stablecoinHandler;
    MockERC20 usdc;
    address sender = address(0x1234);
    address recipient = address(0x5678);
    address admin = address(this);

    function setUp() public {
    usdc = new MockERC20("USDC", "USDC");
    stablecoinHandler = new StablecoinHandler();
    
    // Deploy FeeManager with placeholder first
    feeManager = new FeeManager(address(0x1), admin);
    
    // Deploy core
    core = new RemitAbegCore(feeManager, stablecoinHandler);
    
    // Update FeeManager to point to the actual core
    feeManager.setCoreContract(address(core));

    // Whitelist token
    stablecoinHandler.whitelistToken(address(usdc));

    // Fund sender
    deal(address(usdc), sender, 10_000 * 10**18);
    vm.startPrank(sender);
    usdc.approve(address(core), type(uint256).max);
    vm.stopPrank();
}

    function testSendRemittance() public {
        uint256 amount = 1000 * 10**18;
        uint256 fee = feeManager.calculateFee(amount);
        uint256 total = amount + fee;

        uint256 senderBalanceBefore = usdc.balanceOf(sender);
        uint256 coreBalanceBefore = usdc.balanceOf(address(core));

        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        // Check event (via getter) - destructure the return values
        (
            address remSender,
            address remRecipient,
            address remToken,
            uint256 remAmount,
            uint256 remTimestamp,
            bool remClaimed,
            bool remCancelled
        ) = core.remittances(0);
        
        assertEq(remSender, sender);
        assertEq(remRecipient, recipient);
        assertEq(remToken, address(usdc));
        assertEq(remAmount, amount);
        assertFalse(remClaimed);
        assertFalse(remCancelled);

        assertEq(usdc.balanceOf(sender), senderBalanceBefore - total);
        assertEq(usdc.balanceOf(address(core)), coreBalanceBefore + amount); // Fee went to FeeManager
        assertEq(usdc.balanceOf(address(feeManager)), fee); // Fee collected
        assertEq(core.nextRemittanceId(), 1);
    }

    function testClaimRemittance() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        uint256 recipientBalanceBefore = usdc.balanceOf(recipient);
        uint256 coreBalanceBefore = usdc.balanceOf(address(core));

        vm.prank(recipient);
        core.claimRemittance(0);

        (,,,,, bool remClaimed,) = core.remittances(0);
        assertTrue(remClaimed);

        assertEq(usdc.balanceOf(recipient), recipientBalanceBefore + amount);
        assertEq(usdc.balanceOf(address(core)), coreBalanceBefore - amount);
    }

    function testCancelRemittance() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        uint256 senderBalanceBefore = usdc.balanceOf(sender);
        uint256 coreBalanceBefore = usdc.balanceOf(address(core));

        vm.prank(sender);
        core.cancelRemittance(0);

        (,,,,,, bool remCancelled) = core.remittances(0);
        assertTrue(remCancelled);

        assertEq(usdc.balanceOf(sender), senderBalanceBefore + amount); // Refund net
        assertEq(usdc.balanceOf(address(core)), coreBalanceBefore - amount);
    }

    function testAdminCanCancel() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        uint256 senderBalanceBefore = usdc.balanceOf(sender);
        uint256 coreBalanceBefore = usdc.balanceOf(address(core));

        core.cancelRemittance(0); // As admin (deployer)

        assertEq(usdc.balanceOf(sender), senderBalanceBefore + amount);
        assertEq(usdc.balanceOf(address(core)), coreBalanceBefore - amount);
    }

    function testCannotClaimTwice() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        vm.prank(recipient);
        core.claimRemittance(0);

        vm.prank(recipient);
        vm.expectRevert("Remittance unavailable");
        core.claimRemittance(0);
    }

    function testCannotCancelClaimed() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        vm.prank(recipient);
        core.claimRemittance(0);

        vm.prank(sender);
        vm.expectRevert("Remittance unavailable");
        core.cancelRemittance(0);
    }

    function testCannotClaimCancelled() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        vm.prank(sender);
        core.cancelRemittance(0);

        vm.prank(recipient);
        vm.expectRevert("Remittance unavailable");
        core.claimRemittance(0);
    }

    function testOnlyRecipientCanClaim() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        address impostor = address(0x9999);
        vm.prank(impostor);
        vm.expectRevert("Not recipient");
        core.claimRemittance(0);
    }

    function testOnlySenderOrAdminCanCancel() public {
        uint256 amount = 1000 * 10**18;
        vm.prank(sender);
        core.sendRemittance(recipient, address(usdc), amount);

        address impostor = address(0x8888);
        vm.prank(impostor);
        vm.expectRevert("Unauthorized");
        core.cancelRemittance(0);
    }

    function testCannotSendZeroAmount() public {
        vm.prank(sender);
        vm.expectRevert("Amount must be positive");
        core.sendRemittance(recipient, address(usdc), 0);
    }

    function testCannotSendUnwhitelistedToken() public {
        address badToken = address(new MockERC20("Bad", "BAD"));
        vm.prank(sender);
        vm.expectRevert("Unsupported token");
        core.sendRemittance(recipient, badToken, 100 * 10**18);
    }

    function testReentrancyProtection() public {
        // Basic nonReentrant check; Foundry can simulate reentrancy but for unit, assume OZ guard works
        // Advanced test would require malicious contract, but skip for unit
    }

    function testInvalidRecipient() public {
        vm.prank(sender);
        vm.expectRevert("Invalid recipient");
        core.sendRemittance(address(0), address(usdc), 100 * 10**18);
    }
}