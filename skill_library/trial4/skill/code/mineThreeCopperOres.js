async function mineThreeCopperOres(bot) {
  // Check if there are 3 copper ores nearby
  const copperOres = bot.findBlocks({
    matching: mcData.blocksByName.copper_ore.id,
    maxDistance: 32,
    count: 3
  });

  // If not, explore until 3 copper ores are found
  if (copperOres.length < 3) {
    bot.chat("Not enough copper ores nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundCopperOres = bot.findBlocks({
        matching: mcData.blocksByName.copper_ore.id,
        maxDistance: 32,
        count: 3
      });
      return foundCopperOres.length >= 3 ? foundCopperOres : null;
    });
  }

  // Mine the 3 copper ores using the stone_pickaxe or iron_pickaxe
  await mineBlock(bot, "copper_ore", 3);
  bot.chat("3 copper ores mined.");
}