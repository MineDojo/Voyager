async function craftIronChestplate(bot) {
  const ironIngotCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  if (ironIngotCount >= 8) {
    // Place the crafting table if it's not already placed
    const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
    const craftingTableBlock = bot.blockAt(craftingTablePosition);
    if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
      await placeItem(bot, "crafting_table", craftingTablePosition);
      bot.chat("Crafting table placed.");
    }

    // Craft the iron chestplate using the iron ingots
    await craftItem(bot, "iron_chestplate", 1);
    bot.chat("Iron chestplate crafted.");
  } else {
    bot.chat("Not enough iron ingots to craft an iron chestplate.");
  }
}