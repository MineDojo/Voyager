async function mineCopperOreWithStonePickaxe(bot) {
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
  const copperOreBlock = bot.findBlock({
    matching: mcData.blocksByName.copper_ore.id,
    maxDistance: 32
  });
  if (!copperOreBlock) {
    bot.chat("No copper ore found nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundCopperOre = bot.findBlock({
        matching: mcData.blocksByName.copper_ore.id,
        maxDistance: 32
      });
      return foundCopperOre;
    });
  }
  await mineBlock(bot, "copper_ore", 1);
  bot.chat("Copper ore mined.");
}