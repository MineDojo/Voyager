async function mineFiveIronOres(bot) {
  // Check if the bot has a stone pickaxe or better in its inventory
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);

  // If not, craft a stone pickaxe using the cobblestone and sticks in the inventory
  if (!stonePickaxe && !ironPickaxe) {
    await craftItem(bot, "stone_pickaxe", 1);
    bot.chat("Stone pickaxe crafted.");
  }

  // Find 5 iron ore blocks nearby
  const ironOres = bot.findBlocks({
    matching: mcData.blocksByName.iron_ore.id,
    maxDistance: 32,
    count: 5
  });

  // If not enough iron ore blocks are found nearby, explore until 5 iron ore blocks are found
  if (ironOres.length < 5) {
    bot.chat("Not enough iron ores nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundIronOres = bot.findBlocks({
        matching: mcData.blocksByName.iron_ore.id,
        maxDistance: 32,
        count: 5
      });
      return foundIronOres.length >= 5 ? foundIronOres : null;
    });
  }

  // Mine the 5 iron ore blocks using the stone pickaxe or better
  await mineBlock(bot, "iron_ore", 5);
  bot.chat("5 iron ores mined.");
}