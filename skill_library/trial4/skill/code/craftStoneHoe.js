async function craftStoneHoe(bot) {
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const stickCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (cobblestoneCount >= 2 && stickCount >= 2) {
    // Place the crafting table if it's not already placed
    const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
    const craftingTableBlock = bot.blockAt(craftingTablePosition);
    if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
      await placeItem(bot, "crafting_table", craftingTablePosition);
      bot.chat("Crafting table placed.");
    }

    // Craft the stone hoe using the cobblestone and sticks on the crafting table
    await craftItem(bot, "stone_hoe", 1);
    bot.chat("Stone hoe crafted.");
  } else {
    if (stickCount < 2) {
      // Craft sticks using spruce planks
      await craftItem(bot, "stick", 1);
      bot.chat("Sticks crafted.");
    }
    if (cobblestoneCount < 2) {
      // Mine 2 cobblestone
      await mineBlock(bot, "cobblestone", 2);
      bot.chat("Cobblestone mined.");
    }
    // Retry crafting the stone hoe
    await craftStoneHoe(bot);
  }
}