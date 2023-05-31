async function craftStoneShovel(bot) {
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (cobblestoneCount >= 1 && stickCount >= 2) {
    // Place the crafting table if it's not already placed
    const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
    const craftingTableBlock = bot.blockAt(craftingTablePosition);
    if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
      await placeItem(bot, "crafting_table", craftingTablePosition);
      bot.chat("Crafting table placed.");
    }

    // Craft the stone shovel using the cobblestone and sticks on the crafting table
    await craftItem(bot, "stone_shovel", 1);
    bot.chat("Stone shovel crafted.");
  } else {
    bot.chat("Not enough materials to craft a stone shovel.");
  }
}