async function killThreeSheep(bot) {
  // Equip a weapon (preferably a sword) to kill the sheep
  const sword = bot.inventory.findInventoryItem(mcData.itemsByName["stone_sword"].id) || bot.inventory.findInventoryItem(mcData.itemsByName["wooden_sword"].id);
  if (sword) {
    await bot.equip(sword, "hand");
  } else {
    bot.chat("No sword found, using bare hands.");
  }

  // Explore the area to find 3 sheep
  let sheep = [];
  while (sheep.length < 3) {
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const nearbySheep = bot.nearestEntity(entity => {
        return entity.name === "sheep" && entity.position.distanceTo(bot.entity.position) < 32;
      });
      if (nearbySheep && !sheep.includes(nearbySheep)) {
        sheep.push(nearbySheep);
        return sheep.length === 3 ? sheep : null;
      }
      return null;
    });
  }

  // Kill each sheep one by one
  for (const singleSheep of sheep) {
    await killMob(bot, singleSheep.name, 300);
  }

  // Report the completion of the task
  bot.chat("3 sheep killed.");
}