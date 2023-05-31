async function killTropicalFish(bot) {
  // Equip the iron sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName.iron_sword.id);
  await bot.equip(ironSword, "hand");
  bot.chat("Iron sword equipped.");

  // Find the nearest tropical fish
  const tropicalFish = bot.nearestEntity(entity => {
    return entity.name === "tropical_fish" && entity.position.distanceTo(bot.entity.position) < 32;
  });

  // Kill the tropical fish using the iron sword
  if (tropicalFish) {
    await killMob(bot, "tropical_fish", 300);
    bot.chat("Tropical fish killed.");
  } else {
    bot.chat("No tropical fish found nearby.");
  }
}