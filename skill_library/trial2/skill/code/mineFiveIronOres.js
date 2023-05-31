async function mineFiveIronOres(bot) {
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  if (!stonePickaxe && !ironPickaxe) {
    bot.chat("No stone or iron pickaxe found. Mining cobblestone and crafting a stone pickaxe...");
    await mineBlock(bot, "stone", 3);
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    await craftItem(bot, "stone_pickaxe", 1);
    bot.chat("Stone pickaxe crafted.");
  }
  const pickaxeToUse = ironPickaxe || stonePickaxe;
  await bot.equip(pickaxeToUse, "hand");
  await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const foundIronOre = bot.findBlock({
      matching: mcData.blocksByName.iron_ore.id,
      maxDistance: 32
    });
    return foundIronOre;
  });
  await mineBlock(bot, "iron_ore", 5);
  bot.chat("5 iron ores mined.");
}