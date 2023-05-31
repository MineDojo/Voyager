async function craftWhiteBedWithExploration(bot) {
  // Step 1: Explore the area to find and kill sheep to collect the required wool blocks if needed
  const requiredWool = 3;
  const woolCount = bot.inventory.count(mcData.itemsByName.white_wool.id);
  if (woolCount < requiredWool) {
    bot.chat("Collecting wool from sheep...");
    for (let i = 0; i < requiredWool - woolCount; i++) {
      const sheep = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
        const sheep = bot.nearestEntity(entity => {
          return entity.name === "sheep" && entity.position.distanceTo(bot.entity.position) < 32;
        });
        return sheep;
      });
      if (sheep) {
        await killMob(bot, "sheep");
      } else {
        bot.chat("No sheep found. Please try again later.");
        return;
      }
    }
    bot.chat("Wool collected.");
  }

  // Step 2: Craft 2 more spruce planks if needed
  const requiredPlanks = 3;
  const planksCount = bot.inventory.count(mcData.itemsByName.spruce_planks.id);
  if (planksCount < requiredPlanks) {
    bot.chat("Crafting more spruce_planks...");
    await craftItem(bot, "spruce_planks", requiredPlanks - planksCount);
    bot.chat("Spruce_planks crafted.");
  }

  // Step 3: Place a crafting table if not already placed
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    bot.chat("Crafting_table placed.");
  }

  // Step 4: Craft a white bed using the 3 white wool blocks and 3 spruce planks
  bot.chat("Crafting a white bed...");
  await craftItem(bot, "white_bed", 1);
  bot.chat("White bed crafted.");
}