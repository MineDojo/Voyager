async function mineFiveLapisLazuliOres(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Find 5 lapis_lazuli_ore blocks
  const lapisOres = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
    const lapisOres = bot.findBlocks({
      matching: block => block.name === "lapis_ore",
      maxDistance: 32,
      count: 5
    });
    return lapisOres.length >= 5 ? lapisOres : null;
  });
  if (!lapisOres) {
    bot.chat("Could not find enough lapis lazuli ores.");
    return;
  }

  // Mine the 5 lapis_lazuli_ore blocks
  await mineBlock(bot, "lapis_ore", 5);
  bot.chat("5 lapis lazuli ores mined.");
}