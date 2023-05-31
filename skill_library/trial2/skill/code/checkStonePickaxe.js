async function checkStonePickaxe(bot) {
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  if (stonePickaxe) {
    bot.chat("The bot already has a stone pickaxe in its inventory.");
  } else {
    bot.chat("The bot does not have a stone pickaxe in its inventory.");
  }
}