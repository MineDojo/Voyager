async function mineWoodLog(bot) {
  const logNames = ["oak_log", "birch_log", "spruce_log", "jungle_log", "acacia_log", "dark_oak_log", "mangrove_log"];

  // Find a wood log block
  const logBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    for (const logName of logNames) {
      const log = bot.findBlock({
        matching: mcData.blocksByName[logName].id,
        maxDistance: 32
      });
      if (log) return log;
    }
    return null;
  });
  if (!logBlock) {
    bot.chat("Could not find a wood log.");
    return;
  }

  // Mine the wood log block
  await mineBlock(bot, logBlock.name, 1);
  bot.chat("Wood log mined.");
}