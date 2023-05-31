async function killThreeChickens(bot) {
  // Equip a weapon (preferably a sword) to kill the chickens
  const sword = bot.inventory.findInventoryItem(mcData.itemsByName["stone_sword"].id) || bot.inventory.findInventoryItem(mcData.itemsByName["wooden_sword"].id);
  if (sword) {
    await bot.equip(sword, "hand");
  } else {
    bot.chat("No sword found, using bare hands.");
  }

  // Explore the area to find 3 chickens
  let chickens = [];
  while (chickens.length < 3) {
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const nearbyChicken = bot.nearestEntity(entity => {
        return entity.name === "chicken" && entity.position.distanceTo(bot.entity.position) < 32;
      });
      if (nearbyChicken && !chickens.includes(nearbyChicken)) {
        chickens.push(nearbyChicken);
        return chickens.length === 3 ? chickens : null;
      }
      return null;
    });
  }

  // Kill each chicken one by one
  for (const chicken of chickens) {
    await killMob(bot, chicken.name, 300);
  }

  // Report the completion of the task
  bot.chat("3 chickens killed.");
}