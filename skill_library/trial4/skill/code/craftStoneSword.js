async function craftStoneSword(bot) {
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (cobblestoneCount >= 2 && stickCount >= 1) {
    // Place the crafting table if it's not already placed
    const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
    const craftingTableBlock = bot.blockAt(craftingTablePosition);
    if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
      await placeItem(bot, "crafting_table", craftingTablePosition);
      bot.chat("Crafting table placed.");
    }

    // Craft the stone sword using the cobblestone and stick
    await craftItem(bot, "stone_sword", 1);
    bot.chat("Stone sword crafted.");
  } else {
    if (stickCount < 1) {
      // Craft sticks using spruce planks
      await craftItem(bot, "stick", 1);
      bot.chat("Sticks crafted.");
    }
    bot.chat("Not enough materials to craft a stone sword.");
  }
}