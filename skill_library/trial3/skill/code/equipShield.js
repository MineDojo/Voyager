async function equipShield(bot) {
  // Find the shield in the bot's inventory
  const shield = bot.inventory.findInventoryItem(mcData.itemsByName["shield"].id);

  // Equip the shield in the off-hand slot
  await bot.equip(shield, "off-hand");
  bot.chat("Shield equipped.");
}