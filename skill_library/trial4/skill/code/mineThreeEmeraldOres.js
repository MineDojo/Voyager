async function mineThreeEmeraldOres(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");
  bot.chat("Iron pickaxe equipped.");

  // Initialize emerald ores count
  let emeraldOresMined = 0;

  // Explore and mine emerald ores until 3 are mined
  while (emeraldOresMined < 3) {
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
      emeraldOresMined++;
      bot.chat(`Emerald ore mined. Total: ${emeraldOresMined}/3`);
    } else {
      bot.chat("Emerald ore not found within exploration time. Continuing search...");
    }
  }
}