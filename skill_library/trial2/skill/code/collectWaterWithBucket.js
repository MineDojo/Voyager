async function collectWaterWithBucket(bot) {
  const waterBlock = bot.findBlock({
    matching: mcData.blocksByName.water.id,
    maxDistance: 32
  });
  if (!waterBlock) {
    bot.chat("No water block found nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundWaterBlock = bot.findBlock({
        matching: mcData.blocksByName.water.id,
        maxDistance: 32
      });
      return foundWaterBlock;
    });
  }
  const bucket = bot.inventory.findInventoryItem(mcData.itemsByName.bucket.id);
  await bot.equip(bucket, "hand");
  await bot.lookAt(waterBlock.position);
  await bot.activateItem();
  bot.chat("Water collected with bucket.");
}