async function plantOakSapling(bot) {
  // Find a suitable location to plant the oak sapling
  const targetBlock = bot.findBlock({
    matching: block => {
      return block.name === "grass_block" || block.name === "dirt";
    },
    maxDistance: 32
  });
  if (!targetBlock) {
    bot.chat("Could not find a suitable location to plant the oak sapling.");
    return;
  }

  // Go to the location
  await bot.pathfinder.goto(new GoalBlock(targetBlock.position.x, targetBlock.position.y, targetBlock.position.z));

  // Equip the oak sapling in the bot's hand
  const oakSapling = bot.inventory.findInventoryItem(mcData.itemsByName["oak_sapling"].id);
  await bot.equip(oakSapling, "hand");

  // Right-click on the ground to plant the oak sapling
  await bot.activateBlock(targetBlock);

  // Send a chat message to indicate the oak sapling has been planted
  bot.chat("Oak sapling planted.");
}