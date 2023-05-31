async function craftFurnace(bot) {
  // Check if the bot has enough cobblestone to craft a furnace
  const cobblestoneCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  if (cobblestoneCount < 8) {
    // Mine cobblestone using the stone pickaxe
    await mineBlock(bot, "stone", 8 - cobblestoneCount);
    bot.chat("Cobblestone mined.");
  }

  // Place the crafting table if it's not already placed
  const craftingTablePosition = bot.entity.position.offset(1, -1, 0);
  const craftingTableBlock = bot.blockAt(craftingTablePosition);
  if (!craftingTableBlock || craftingTableBlock.name !== "crafting_table") {
    await placeItem(bot, "crafting_table", craftingTablePosition);
    bot.chat("Crafting table placed.");
  }

  // Craft a furnace using the cobblestones
  await craftItem(bot, "furnace", 1);
  bot.chat("Furnace crafted.");
}