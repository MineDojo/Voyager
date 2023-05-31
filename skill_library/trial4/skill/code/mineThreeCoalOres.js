async function mineThreeCoalOres(bot) {
  // Check if there are 3 coal ores nearby
  const coalOres = bot.findBlocks({
    matching: mcData.blocksByName.coal_ore.id,
    maxDistance: 32,
    count: 3
  });

  // If not, explore until 3 coal ores are found
  if (coalOres.length < 3) {
    bot.chat("Not enough coal ores nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundCoalOres = bot.findBlocks({
        matching: mcData.blocksByName.coal_ore.id,
        maxDistance: 32,
        count: 3
      });
      return foundCoalOres.length >= 3 ? foundCoalOres : null;
    });
  }

  // Mine the 3 coal ores using the stone pickaxe
  await mineBlock(bot, "coal_ore", 3);
  bot.chat("3 coal ores mined.");
}