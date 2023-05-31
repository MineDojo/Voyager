async function killOneSpider(bot) {
  // Equip the iron sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  await bot.equip(ironSword, "hand");

  // Find the nearest spider
  const spider = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const spider = bot.nearestEntity(entity => {
      return entity.name === "spider" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return spider;
  });
  if (!spider) {
    bot.chat("Could not find a spider.");
    return;
  }

  // Kill the spider using the iron sword
  await killMob(bot, "spider", 300);
  bot.chat("Killed a spider.");

  // Collect the dropped items
  await bot.pathfinder.goto(new GoalBlock(spider.position.x, spider.position.y, spider.position.z));
  bot.chat("Collected dropped items.");
}