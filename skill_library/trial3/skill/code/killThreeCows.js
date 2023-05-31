async function killThreeCows(bot) {
  // Explore the area to find 3 cows
  let cows = [];
  while (cows.length < 3) {
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const nearbyCow = bot.nearestEntity(entity => {
        return entity.name === "cow" && entity.position.distanceTo(bot.entity.position) < 32;
      });
      if (nearbyCow && !cows.includes(nearbyCow)) {
        cows.push(nearbyCow);
        return cows.length === 3 ? cows : null;
      }
      return null;
    });
  }

  // Equip a weapon (preferably a sword) to kill the cows
  const sword = bot.inventory.findInventoryItem(mcData.itemsByName["stone_sword"].id) || bot.inventory.findInventoryItem(mcData.itemsByName["wooden_sword"].id);
  if (sword) {
    await bot.equip(sword, "hand");
  } else {
    bot.chat("No sword found, using bare hands.");
  }

  // Kill each cow one by one
  for (const cow of cows) {
    await killMob(bot, cow.name, 300);
  }

  // Report the completion of the task
  bot.chat("3 cows killed.");
}