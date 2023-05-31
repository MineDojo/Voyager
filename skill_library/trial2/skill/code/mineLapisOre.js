async function mineLapisOre(bot) {
  const pickaxeTypes = [mcData.itemsByName.stone_pickaxe.id, mcData.itemsByName.iron_pickaxe.id, mcData.itemsByName.diamond_pickaxe.id, mcData.itemsByName.netherite_pickaxe.id];
  let pickaxe = bot.inventory.items().find(item => pickaxeTypes.includes(item.type));
  if (!pickaxe) {
    bot.chat("No suitable pickaxe found. Mining cobblestone and crafting a stone pickaxe...");
    await mineBlock(bot, "stone", 3);
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    await craftItem(bot, "stone_pickaxe", 1);
    pickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
    bot.chat("Stone pickaxe crafted.");
  }
  await bot.equip(pickaxe, "hand");
  const lapisOreBlock = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const foundLapisOre = bot.findBlock({
      matching: mcData.blocksByName.lapis_ore.id,
      maxDistance: 32
    });
    return foundLapisOre;
  });
  if (!lapisOreBlock) {
    bot.chat("No lapis ore found nearby. Exploring...");
  }
  await mineBlock(bot, "lapis_ore", 1);
  bot.chat("Lapis ore mined.");
}