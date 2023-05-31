async function mineSpruceLogs(bot) {
  const spruceLogName = "spruce_log";
  const spruceLogCount = 3;
  const spruceLogBlock = bot.findBlock({
    matching: block => block.name === spruceLogName,
    maxDistance: 32
  });
  if (!spruceLogBlock) {
    bot.chat("No spruce log found nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundLog = bot.findBlock({
        matching: block => block.name === spruceLogName,
        maxDistance: 32
      });
      return foundLog;
    });
  }
  await mineBlock(bot, spruceLogName, spruceLogCount);
  bot.chat("Spruce logs mined.");
}