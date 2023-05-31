async function mineThreeMoreOakLogs(bot) {
  for (let i = 0; i < 3; i++) {
    const oakLogBlock = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const oakLog = bot.findBlock({
        matching: mcData.blocksByName["oak_log"].id,
        maxDistance: 32
      });
      return oakLog;
    });
    if (!oakLogBlock) {
      bot.chat("Could not find an oak log.");
      return;
    }
    await mineBlock(bot, "oak_log", 1);
  }
  bot.chat("3 more oak logs mined.");
}