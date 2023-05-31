async function craftIronChestplate(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.count(mcData.itemsByName["iron_ingot"].id);
  if (ironIngots < 8) {
    // Mine iron ores
    await mineBlock(bot, "iron_ore", 8 - ironIngots);

    // Place a furnace near the player
    const furnacePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "furnace", furnacePosition);

    // Smelt iron ores into iron ingots
    for (let i = 0; i < 8 - ironIngots; i++) {
      await smeltItem(bot, "raw_iron", "coal");
    }
  }

  // Check if there is a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  if (!craftingTable) {
    // Craft a crafting table
    await craftItem(bot, "crafting_table", 1);
  }

  // Try to place the crafting table near the player at different positions until it is successfully placed
  const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
  let craftingTablePosition = null;
  for (const offset of offsets) {
    try {
      craftingTablePosition = bot.entity.position.offset(offset.x, offset.y, offset.z);
      await placeItem(bot, "crafting_table", craftingTablePosition);
      break;
    } catch (error) {
      console.log("Error placing crafting_table:", error.message);
    }
  }
  if (!craftingTablePosition) {
    bot.chat("Failed to place crafting table. Please try again.");
    return;
  }

  // Craft an iron chestplate using iron ingots and the crafting table
  await craftItem(bot, "iron_chestplate", 1, craftingTablePosition);
  bot.chat("Iron chestplate crafted.");
}