async function craftIronPickaxe(bot) {
  const ironIngotCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  const sprucePlankCount = bot.inventory.count(mcData.itemsByName.spruce_planks.id);
  if (ironIngotCount >= 3) {
    if (stickCount < 2) {
      if (sprucePlankCount < 2) {
        // Craft spruce planks from spruce logs
        await craftItem(bot, "spruce_planks", 1);
        bot.chat("Spruce planks crafted.");
      }

      // Craft sticks using spruce planks
      await craftItem(bot, "stick", 1);
      bot.chat("Sticks crafted.");
    }

    // Place the crafting table if it's not already placed
    const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
    const craftingTableBlock = bot.blockAt(craftingTablePosition);
    if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
      await placeItem(bot, "crafting_table", craftingTablePosition);
      bot.chat("Crafting table placed.");
    }

    // Craft the iron pickaxe using the iron ingots and sticks
    await craftItem(bot, "iron_pickaxe", 1);
    bot.chat("Iron pickaxe crafted.");
  } else {
    bot.chat("Not enough iron ingots to craft an iron pickaxe.");
  }
}