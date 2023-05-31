async function craftCraftingTable(bot) {
  const spruceLogCount = bot.inventory.count(mcData.itemsByName.spruce_log.id);
  if (spruceLogCount >= 1) {
    // Craft 4 spruce planks from 1 spruce log
    await craftItem(bot, "spruce_planks", 1);
    bot.chat("Spruce planks crafted.");

    // Craft a crafting table using the 4 spruce planks
    await craftItem(bot, "crafting_table", 1);
    bot.chat("Crafting table crafted.");
  } else {
    bot.chat("Not enough spruce logs to craft a crafting table.");
  }
}