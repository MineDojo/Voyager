async function craftIronLeggingsAndBoots(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.count(mcData.itemsByName["iron_ingot"].id);
  if (ironIngots < 11) {
    // Mine iron ores
    await mineBlock(bot, "iron_ore", 11 - ironIngots);

    // Check if there are enough coal in the inventory
    const coalCount = bot.inventory.count(mcData.itemsByName["coal"].id);
    if (coalCount < 11 - ironIngots) {
      // Mine coal
      await mineBlock(bot, "coal_ore", 11 - ironIngots - coalCount);
    }

    // Place a furnace near the player
    const furnacePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "furnace", furnacePosition);

    // Smelt iron ores into iron ingots
    for (let i = 0; i < 11 - ironIngots; i++) {
      await smeltItem(bot, "raw_iron", "coal");
    }
  }

  // Check if there is a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  if (!craftingTable) {
    // Craft a crafting table
    await craftItem(bot, "crafting_table", 1);
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft iron leggings using the crafting table
  await craftItem(bot, "iron_leggings", 1);

  // Craft iron boots using the crafting table
  await craftItem(bot, "iron_boots", 1);
  bot.chat("Iron leggings and iron boots crafted.");
}