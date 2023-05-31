async function mineWoodLog(bot) {
  const logNames = ["oak_log", "birch_log", "spruce_log", "jungle_log", "acacia_log", "dark_oak_log", "mangrove_log"];
  const logBlock = bot.findBlock({
    matching: block => logNames.includes(block.name),
    maxDistance: 32
  });
  if (!logBlock) {
    bot.chat("No wood log found nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundLog = bot.findBlock({
        matching: block => logNames.includes(block.name),
        maxDistance: 32
      });
      return foundLog;
    });
  }
  await mineBlock(bot, logBlock.name, 1);
  bot.chat("Wood log mined.");
}