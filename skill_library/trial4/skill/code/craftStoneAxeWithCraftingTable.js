async function craftStoneAxeWithCraftingTable(bot) {
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (cobblestoneCount >= 3 && stickCount >= 2) {
    // Place the crafting table if it's not already placed
    const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
    const craftingTableBlock = bot.blockAt(craftingTablePosition);
    if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
      await placeItem(bot, "crafting_table", craftingTablePosition);
      bot.chat("Crafting table placed.");
    }

    // Craft the stone axe using the cobblestones and sticks on the crafting table
    await craftItem(bot, "stone_axe", 1);
    bot.chat("Stone axe crafted.");
  } else {
    if (stickCount < 2) {
      // Craft sticks using spruce planks
      await craftItem(bot, "stick", 1);
      bot.chat("Sticks crafted.");
    }
    bot.chat("Not enough materials to craft a stone axe.");
  }
}