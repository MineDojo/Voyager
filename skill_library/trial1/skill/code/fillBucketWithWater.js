async function fillBucketWithWater(bot) {
  // Find a water block nearby
  const waterBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const water = bot.findBlock({
      matching: mcData.blocksByName.water.id,
      maxDistance: 32,
    });
    return water;
  });
  if (!waterBlock) {
    bot.chat("Could not find water.");
    return;
  }

  const adjacentBlock = waterBlock.position.offset(0, 1, 0);
  // Go to the water block
  await bot.pathfinder.goto(
    new GoalGetToBlock(adjacentBlock.x, adjacentBlock.y, adjacentBlock.z)
  );

  // Equip the bucket
  const bucket = bot.inventory.findInventoryItem(mcData.itemsByName.bucket.id);
  await bot.equip(bucket, "hand");

  // Look at the water block
  await bot.lookAt(waterBlock.position);

  // Activate the bucket to collect water
  await bot.activateItem();
  bot.chat("Filled the bucket with water.");
}
