async function mineWoodLog(bot) {
  const woodLogNames = ["oak_log", "birch_log", "spruce_log", "jungle_log", "acacia_log", "dark_oak_log", "mangrove_log"];

  // Find a wood log block
  const woodLogBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    return bot.findBlock({
      matching: block => woodLogNames.includes(block.name),
      maxDistance: 32
    });
  });
  if (!woodLogBlock) {
    bot.chat("Could not find a wood log.");
    return;
  }

  // Mine the wood log block
  await mineBlock(bot, woodLogBlock.name, 1);
  bot.chat("Wood log mined.");
}