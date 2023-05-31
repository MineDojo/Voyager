async function equipIronLeggingsAndBoots(bot) {
  // Find the iron leggings and iron boots in the bot's inventory
  const ironLeggings = bot.inventory.findInventoryItem(mcData.itemsByName["iron_leggings"].id);
  const ironBoots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_boots"].id);

  // Check if the bot has iron leggings and iron boots
  if (ironLeggings && ironBoots) {
    // Equip the iron leggings in the legs slot
    await bot.equip(ironLeggings, "legs");

    // Equip the iron boots in the feet slot
    await bot.equip(ironBoots, "feet");

    // Send a chat message to indicate that the iron leggings and iron boots have been equipped
    bot.chat("Iron leggings and iron boots equipped.");
  } else {
    bot.chat("Iron leggings and/or iron boots not found in inventory.");
  }
}