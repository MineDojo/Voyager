async function killTwoPigs(bot) {
  // Equip the wooden sword
  const woodenSword = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_sword.id);
  await bot.equip(woodenSword, "hand");

  // Find and kill the first pig
  await killMob(bot, "pig", 300);
  bot.chat("Killed the first pig.");

  // Find and kill the second pig
  await killMob(bot, "pig", 300);
  bot.chat("Killed the second pig.");

  // Collect the dropped items from the killed pigs
  const pigDrops = ["raw_porkchop"];
  for (const drop of pigDrops) {
    const droppedItem = bot.findBlock({
      matching: block => block.name === drop,
      maxDistance: 32
    });
    if (droppedItem) {
      await bot.pathfinder.goto(new GoalBlock(droppedItem.position.x, droppedItem.position.y, droppedItem.position.z));
    }
  }
  bot.chat("Collected dropped items from the killed pigs.");
}