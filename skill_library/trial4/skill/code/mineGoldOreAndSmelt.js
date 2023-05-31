async function mineGoldOreAndSmelt(bot) {
  // Check if the bot has an iron pickaxe or better in its inventory
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.diamond_pickaxe.id);

  // If not, craft an iron pickaxe
  if (!ironPickaxe && !diamondPickaxe) {
    await craftItem(bot, "iron_pickaxe", 1);
    bot.chat("Iron pickaxe crafted.");
  }

  // Explore in a random direction until a gold ore is found
  const randomDirection = new Vec3(Math.random() > 0.5 ? 1 : -1, 0, Math.random() > 0.5 ? 1 : -1);
  const goldOre = await exploreUntil(bot, randomDirection, 300, () => {
    const foundGoldOre = bot.findBlock({
      matching: mcData.blocksByName.gold_ore.id,
      maxDistance: 32
    });
    return foundGoldOre;
  });
  if (goldOre) {
    // Mine the gold ore
    await mineBlock(bot, "gold_ore", 1);
    bot.chat("Gold ore mined.");

    // Place the furnace if not already placed
    const furnaceBlock = bot.findBlock({
      matching: mcData.blocksByName.furnace.id,
      maxDistance: 32
    });
    if (!furnaceBlock) {
      const furnacePosition = bot.entity.position.offset(1, -1, 1);
      await placeItem(bot, "furnace", furnacePosition);
      bot.chat("Furnace placed.");
    }

    // Smelt the gold ore in the furnace to obtain a gold ingot
    await smeltItem(bot, "gold_ore", "coal", 1);
    bot.chat("Gold ore smelted into gold ingot.");
  } else {
    bot.chat("Gold ore not found within exploration time.");
  }
}