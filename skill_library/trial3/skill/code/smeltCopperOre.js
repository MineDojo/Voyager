async function smeltCopperOre(bot) {
  // Check if there is a furnace in the inventory
  const furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);

  // If there is no furnace, craft one using cobblestone
  if (!furnace) {
    await craftItem(bot, "furnace", 1);
  }

  // Place the furnace near the player
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "furnace", furnacePosition);

  // Find a copper ore block
  const copperOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const copperOre = bot.findBlock({
      matching: mcData.blocksByName["copper_ore"].id,
      maxDistance: 32
    });
    return copperOre;
  });

  // Mine the copper ore block
  await mineBlock(bot, "copper_ore", 1);

  // Smelt the raw copper using coal as fuel in the furnace
  await smeltItem(bot, "raw_copper", "coal", 1);

  // Collect the smelted copper ingot
  bot.chat("1 copper ore smelted.");
}