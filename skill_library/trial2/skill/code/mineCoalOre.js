async function mineCoalOre(bot) {
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  if (!stonePickaxe) {
    bot.chat("No stone pickaxe found in inventory.");
    return;
  }
  await bot.equip(mcData.itemsByName.stone_pickaxe.id, "hand");
  const coalOreBlock = bot.findBlock({
    matching: mcData.blocksByName.coal_ore.id,
    maxDistance: 32
  });
  if (!coalOreBlock) {
    bot.chat("No coal ore found nearby. Exploring...");
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const foundCoalOre = bot.findBlock({
        matching: mcData.blocksByName.coal_ore.id,
        maxDistance: 32
      });
      return foundCoalOre;
    });
  }
  await mineBlock(bot, "coal_ore", 1);
  bot.chat("Coal ore mined.");
}