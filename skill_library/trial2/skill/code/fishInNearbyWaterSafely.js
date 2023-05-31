async function fishInNearbyWaterSafely(bot) {
  // Check if the bot has a fishing rod in its inventory
  let fishingRod = bot.inventory.findInventoryItem(mcData.itemsByName.fishing_rod.id);
  if (!fishingRod) {
    await craftFishingRod(bot);
    fishingRod = bot.inventory.findInventoryItem(mcData.itemsByName.fishing_rod.id);
  }

  // Find a nearby water block
  const waterBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const foundWaterBlock = bot.findBlock({
      matching: mcData.blocksByName.water.id,
      maxDistance: 32
    });
    return foundWaterBlock;
  });

  // Move to a block adjacent to the water block
  const adjacentBlock = waterBlock.position.offset(0, 1, 0);
  await bot.pathfinder.goto(new GoalBlock(adjacentBlock.x, adjacentBlock.y, adjacentBlock.z));

  // Look at the water block
  await bot.lookAt(waterBlock.position);

  // Equip the fishing rod
  await bot.equip(fishingRod, "hand");

  // Check for hostile mobs nearby and kill them if necessary
  const hostileMobs = ["zombie", "skeleton", "creeper"];
  for (const mobName of hostileMobs) {
    const mob = bot.nearestEntity(entity => {
      return entity.name === mobName && entity.position.distanceTo(bot.entity.position) < 16;
    });
    if (mob) {
      await killMob(bot, mobName, 300);
    }
  }

  // Fish in the water
  try {
    await bot.fish();
    bot.chat("Fished in the nearby water.");
  } catch (error) {
    if (error.message === "Fishing cancelled") {
      bot.chat("Fishing was cancelled. Trying again...");
      await fishInNearbyWaterSafely(bot);
    } else {
      throw error;
    }
  }
}