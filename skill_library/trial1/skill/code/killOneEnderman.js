async function killOneEnderman(bot) {
  // Equip the iron sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  await bot.equip(ironSword, "hand");

  // Find the nearest enderman
  const enderman = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const enderman = bot.nearestEntity(entity => {
      return entity.name === "enderman" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return enderman;
  });
  if (!enderman) {
    bot.chat("Could not find an enderman.");
    return;
  }

  // Kill the enderman using the iron sword
  await killMob(bot, "enderman", 300);
  bot.chat("Killed an enderman.");

  // Collect the dropped items
  await bot.pathfinder.goto(new GoalBlock(enderman.position.x, enderman.position.y, enderman.position.z));
  bot.chat("Collected dropped items.");
}