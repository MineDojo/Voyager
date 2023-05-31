async function mineFiveCoalOres(bot) {
  // Check if there are 5 coal ores nearby
  const coalOres = bot.findBlocks({
    matching: mcData.blocksByName.coal_ore.id,
    maxDistance: 32,
    count: 5
  });

  // If not, explore until 5 coal ores are found
  if (coalOres.length < 5) {
    bot.chat("Not enough coal ores nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundCoalOres = bot.findBlocks({
        matching: mcData.blocksByName.coal_ore.id,
        maxDistance: 32,
        count: 5
      });
      return foundCoalOres.length >= 5 ? foundCoalOres : null;
    });
  }

  // Mine the 5 coal ores using the iron_pickaxe
  await mineBlock(bot, "coal_ore", 5);
  bot.chat("5 coal ores mined.");
}