async function mineIronOre(bot) {
  // Check if the bot has enough cobblestone to craft a stone pickaxe
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  if (cobblestoneCount < 3) {
    // Mine 3 cobblestone using the wooden pickaxe
    await mineBlock(bot, "stone", 3);
    bot.chat("Cobblestone mined.");
  }

  // Place the crafting table
  const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);
  bot.chat("Crafting table placed.");

  // Craft a stone pickaxe using the cobblestone and sticks
  await craftItem(bot, "stone_pickaxe", 1);
  bot.chat("Stone pickaxe crafted.");

  // Find and mine 1 iron ore using the stone pickaxe
  const ironOreBlock = bot.findBlock({
    matching: mcData.blocksByName.iron_ore.id,
    maxDistance: 32
  });
  if (!ironOreBlock) {
    bot.chat("No iron ore found nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundIronOre = bot.findBlock({
        matching: mcData.blocksByName.iron_ore.id,
        maxDistance: 32
      });
      return foundIronOre;
    });
  }
  await mineBlock(bot, "iron_ore", 1);
  bot.chat("Iron ore mined.");
}