async function killOneZombie(bot) {
  // Equip the iron sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  await bot.equip(ironSword, "hand");

  // Find the nearest zombie
  const zombie = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const zombie = bot.nearestEntity(entity => {
      return entity.name === "zombie" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return zombie;
  });
  if (!zombie) {
    bot.chat("Could not find a zombie.");
    return;
  }

  // Kill the zombie using the iron sword
  await killMob(bot, "zombie", 300);
  bot.chat("Killed a zombie.");

  // Collect the dropped items
  await bot.pathfinder.goto(new GoalBlock(zombie.position.x, zombie.position.y, zombie.position.z));
  bot.chat("Collected dropped items.");
}