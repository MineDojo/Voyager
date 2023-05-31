async function craftWoodenPickaxe(bot) {
  const spruceLogCount = bot.inventory.count(mcData.itemsByName.spruce_log.id);
  if (spruceLogCount >= 1) {
    // Craft 4 wooden planks from 1 spruce log
    await craftItem(bot, "spruce_planks", 1);
    bot.chat("Spruce planks crafted.");

    // Craft 4 sticks from 2 wooden planks
    await craftItem(bot, "stick", 1);
    bot.chat("Sticks crafted.");

    // Check if there is a crafting table in the inventory
    const craftingTableCount = bot.inventory.count(mcData.itemsByName.crafting_table.id);
    if (craftingTableCount === 0) {
      // Craft a crafting table using 4 wooden planks
      await craftItem(bot, "crafting_table", 1);
      bot.chat("Crafting table crafted.");
    }

    // Find a suitable position to place the crafting table
    const craftingTablePosition = bot.entity.position.offset(1, -1, 0);

    // Place the crafting table at the found position
    await placeItem(bot, "crafting_table", craftingTablePosition);
    bot.chat("Crafting table placed.");

    // Craft a wooden pickaxe using 3 wooden planks and 2 sticks
    await craftItem(bot, "wooden_pickaxe", 1);
    bot.chat("Wooden pickaxe crafted.");
  } else {
    bot.chat("Not enough spruce logs to craft a wooden pickaxe.");
  }
}