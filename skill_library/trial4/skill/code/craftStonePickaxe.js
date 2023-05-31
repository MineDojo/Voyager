async function craftStonePickaxe(bot) {
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

    // Find the stone pickaxe recipe
    const stonePickaxeRecipe = bot.recipesFor(mcData.itemsByName.stone_pickaxe.id, null, 1, craftingTableBlock)[0];

    // Craft the stone pickaxe using the found recipe and the crafting table
    await bot.craft(stonePickaxeRecipe, 1, craftingTableBlock);
    bot.chat("Stone pickaxe crafted.");
  } else {
    bot.chat("Not enough materials to craft a stone pickaxe.");
  }
}