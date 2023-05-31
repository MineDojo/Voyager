async function craftSpyglass(bot) {
  const requiredCopperIngots = 2;
  const requiredAmethystShards = 1;
  const copperIngotsCount = bot.inventory.count(mcData.itemsByName.copper_ingot.id);
  const amethystShardsCount = bot.inventory.count(mcData.itemsByName.amethyst_shard.id);
  if (copperIngotsCount < requiredCopperIngots || amethystShardsCount < requiredAmethystShards) {
    bot.chat("Not enough copper ingots or amethyst shards to craft a spyglass.");
    return;
  }
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  if (!craftingTable) {
    const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "crafting_table", craftingTablePosition);
    bot.chat("Crafting_table placed.");
  }
  await craftItem(bot, "spyglass", 1);
  bot.chat("Spyglass crafted.");
}