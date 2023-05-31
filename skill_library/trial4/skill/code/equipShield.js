async function equipShield(bot) {
  // Check if the bot has a shield in its inventory
  const shield = bot.inventory.findInventoryItem(mcData.itemsByName.shield.id);

  // If the shield is found, equip it in the "off-hand" slot
  if (shield) {
    await bot.equip(shield, "off-hand");
    bot.chat("Shield equipped.");
  } else {
    bot.chat("No shield found in the inventory.");
  }
}