async function craftIronHelmet(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.count(mcData.itemsByName["iron_ingot"].id);
  if (ironIngots < 5) {
    // Mine iron ores
    await mineBlock(bot, "iron_ore", 5 - ironIngots);

    // Place a furnace near the player
    const furnacePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "furnace", furnacePosition);

    // Smelt iron ores into iron ingots
    for (let i = 0; i < 5 - ironIngots; i++) {
      await smeltItem(bot, "raw_iron", "coal");
    }
  }

  // Place the crafting table near the player
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft an iron helmet using iron ingots and the crafting table
  await craftItem(bot, "iron_helmet", 1, craftingTablePosition);
  bot.chat("Iron helmet crafted.");
}