async function collectFiveCactusBlocks(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Find 5 cactus blocks using the exploreUntil function
  const cactusBlocks = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const cactusBlocks = bot.findBlocks({
      matching: block => block.name === "cactus",
      maxDistance: 32,
      count: 5
    });
    return cactusBlocks.length >= 5 ? cactusBlocks : null;
  });
  if (!cactusBlocks) {
    bot.chat("Could not find enough cactus blocks.");
    return;
  }

  // Mine the 5 cactus blocks using the mineBlock function
  await mineBlock(bot, "cactus", 5);
  bot.chat("5 cactus blocks mined.");

  // Collect the dropped cactus items
  for (const cactusBlock of cactusBlocks) {
    await bot.pathfinder.goto(new GoalBlock(cactusBlock.x, cactusBlock.y, cactusBlock.z));
  }
  bot.chat("Collected 5 cactus blocks.");
}