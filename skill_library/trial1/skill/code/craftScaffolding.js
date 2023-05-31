async function craftScaffolding(bot) {
  // Check if we have a crafting table in the inventory
  const craftingTableCount = bot.inventory.count(mcData.itemsByName.crafting_table.id);

  // If not, craft a crafting table
  if (craftingTableCount === 0) {
    await craftItem(bot, "crafting_table", 1);
    bot.chat("Crafted a crafting table.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft 10 scaffolding using the crafting table
  await craftItem(bot, "scaffolding", 1);
  bot.chat("Crafted 10 scaffolding.");
}