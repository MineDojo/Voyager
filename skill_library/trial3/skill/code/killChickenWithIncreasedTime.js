async function killChickenWithIncreasedTime(bot) {
  // Explore the area to find a chicken with an increased exploration time limit
  const chicken = await exploreUntil(bot, new Vec3(1, 0, 1), 120, () => {
    const chicken = bot.nearestEntity(entity => {
      return entity.name === "chicken" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return chicken;
  });
  if (!chicken) {
    bot.chat("No chicken found.");
    return;
  }

  // Equip a weapon (preferably a sword) to kill the chicken
  const sword = bot.inventory.findInventoryItem(mcData.itemsByName["stone_sword"].id) || bot.inventory.findInventoryItem(mcData.itemsByName["wooden_sword"].id);
  if (sword) {
    await bot.equip(sword, "hand");
  } else {
    bot.chat("No sword found, using bare hands.");
  }

  // Kill the chicken
  await killMob(bot, "chicken", 300);

  // Report the completion of the task
  bot.chat("1 chicken killed.");
}