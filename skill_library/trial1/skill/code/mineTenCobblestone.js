async function mineTenCobblestone(bot) {
  // Check if the bot has a pickaxe in the inventory
  const pickaxe = bot.inventory.items().find(item => item.name.endsWith("_pickaxe"));

  // If not, craft a wooden pickaxe using the available resources in the inventory
  if (!pickaxe) {
    await craftWoodenPickaxe(bot);
  } else {
    // Equip the pickaxe
    await bot.equip(pickaxe, "hand");
  }

  // Use the exploreUntil function to find cobblestone blocks
  const cobblestoneBlocks = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const cobblestoneBlocks = bot.findBlocks({
      matching: block => block.name === "stone",
      maxDistance: 32,
      count: 10
    });
    return cobblestoneBlocks.length >= 10 ? cobblestoneBlocks : null;
  });
  if (!cobblestoneBlocks) {
    bot.chat("Could not find enough cobblestone.");
    return;
  }

  // Mine 10 cobblestone blocks using the mineBlock function
  await mineBlock(bot, "stone", 10);
  bot.chat("10 cobblestone mined.");
}