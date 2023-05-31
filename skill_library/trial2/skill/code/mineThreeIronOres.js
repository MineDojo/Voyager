async function mineThreeIronOres(bot) {
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  if (!stonePickaxe) {
    bot.chat("No stone pickaxe found. Mining cobblestone and crafting one...");
    await mineBlock(bot, "stone", 3);
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    await craftItem(bot, "stone_pickaxe", 1);
    bot.chat("Stone pickaxe crafted.");
  }
  await bot.equip(mcData.itemsByName.stone_pickaxe.id, "hand");
  const ironOreBlock = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const foundIronOre = bot.findBlock({
      matching: mcData.blocksByName.iron_ore.id,
      maxDistance: 32
    });
    return foundIronOre;
  });
  if (!ironOreBlock) {
    bot.chat("No iron ore found nearby. Exploring...");
  }
  await mineBlock(bot, "iron_ore", 3);
  bot.chat("3 iron ores mined.");
}