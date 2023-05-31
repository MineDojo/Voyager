async function craftIronSword(bot) {
  const ironIngotCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (ironIngotCount >= 2 && stickCount >= 1) {
    // Place the crafting table if it's not already placed
    const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
    const craftingTableBlock = bot.blockAt(craftingTablePosition);
    if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
      await placeItem(bot, "crafting_table", craftingTablePosition);
      bot.chat("Crafting table placed.");
    }

    // Craft the iron sword using the iron ingots and stick
    await craftItem(bot, "iron_sword", 1);
    bot.chat("Iron sword crafted.");
  } else {
    bot.chat("Not enough materials to craft an iron sword.");
  }
}