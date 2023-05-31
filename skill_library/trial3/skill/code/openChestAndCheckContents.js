async function openChestAndCheckContents(bot) {
  const targetChestPosition = new Vec3(5, 61, 134);

  // Find the chest at the specified position
  const chestPosition = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const chest = bot.findBlock({
      matching: mcData.blocksByName["chest"].id,
      maxDistance: 32,
      position: targetChestPosition
    });
    return chest ? chest.position : null;
  });

  // Check the contents of the chest
  await checkItemInsideChest(bot, chestPosition);
  bot.chat("Chest at (5, 61, 134) opened and contents checked.");
}