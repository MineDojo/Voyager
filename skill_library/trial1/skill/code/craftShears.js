async function craftShears(bot) {
  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a pair of shears using the crafting table
  await craftItem(bot, "shears", 1);
  bot.chat("Crafted a pair of shears.");
}