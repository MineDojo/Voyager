async function craftIronHelmet(bot) {
  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft an iron helmet using the crafting table
  await craftItem(bot, "iron_helmet", 1);
  bot.chat("Crafted an iron helmet.");
}