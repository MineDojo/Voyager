async function mineEmeraldOre(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");
  bot.chat("Iron pickaxe equipped.");

  // Explore until an emerald ore is found
  const emeraldOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const foundEmeraldOre = bot.findBlock({
      matching: mcData.blocksByName.emerald_ore.id,
      maxDistance: 32
    });
    return foundEmeraldOre;
  });
  if (emeraldOre) {
    // Mine the emerald ore
    await mineBlock(bot, "emerald_ore", 1);
    bot.chat("Emerald ore mined.");
  } else {
    bot.chat("Emerald ore not found within exploration time.");
  }
}