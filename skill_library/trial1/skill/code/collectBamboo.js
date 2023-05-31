async function collectBamboo(bot) {
  // Equip the iron sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  await bot.equip(ironSword, "hand");

  // Find bamboo plants using the exploreUntil function
  const bambooPlants = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const bambooPlants = bot.findBlocks({
      matching: block => block.name === "bamboo",
      maxDistance: 32,
      count: 10
    });
    return bambooPlants.length >= 10 ? bambooPlants : null;
  });
  if (!bambooPlants) {
    bot.chat("Could not find enough bamboo plants.");
    return;
  }

  // Break 10 bamboo plants using the iron sword
  for (const bambooPlant of bambooPlants) {
    const block = bot.blockAt(bambooPlant);
    await bot.dig(block);
  }
  bot.chat("Broke 10 bamboo plants.");

  // Collect the dropped bamboo items
  for (const bambooPlant of bambooPlants) {
    await bot.pathfinder.goto(new GoalBlock(bambooPlant.x, bambooPlant.y, bambooPlant.z));
  }
  bot.chat("Collected 10 bamboo.");
}