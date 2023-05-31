async function killFourSheep(bot) {
  // Equip the wooden sword
  const woodenSword = bot.inventory.findInventoryItem(mcData.itemsByName.wooden_sword.id);
  await bot.equip(woodenSword, "hand");

  // Find and kill the first three sheep
  for (let i = 1; i <= 3; i++) {
    await killMob(bot, "sheep", 300);
    bot.chat(`Killed sheep ${i}.`);
  }

  // Find and kill the fourth sheep
  await killMob(bot, "sheep", 300);
  bot.chat("Killed the fourth sheep.");

  // Collect the dropped items from the killed sheep
  const sheepDrops = ["wool", "raw_mutton"];
  for (const drop of sheepDrops) {
    const droppedItem = bot.findBlock({
      matching: block => block.name === drop,
      maxDistance: 32
    });
    if (droppedItem) {
      await bot.pathfinder.goto(new GoalBlock(droppedItem.position.x, droppedItem.position.y, droppedItem.position.z));
    }
  }
  bot.chat("Collected dropped items from the killed sheep.");
}