async function exploreCaveAndGatherResources(bot) {
  // Equip torches
  const torches = bot.inventory.findInventoryItem(mcData.itemsByName.torch.id);
  if (!torches) {
    bot.chat("No torches found in inventory. Crafting torches...");
    await craftTorches(bot);
  }
  await bot.equip(mcData.itemsByName.torch.id, "hand");

  // Find a cave entrance and start exploring
  const caveEntrance = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const caveBlock = bot.findBlock({
      matching: block => {
        return block && block.name === "air" && block.position && block.position.y < 60;
      },
      maxDistance: 32
    });
    return caveBlock;
  });
  if (!caveEntrance) {
    bot.chat("No cave entrance found nearby.");
    return;
  }
  bot.chat("Cave entrance found. Exploring the cave...");

  // Explore the cave and gather resources
  await exploreUntil(bot, new Vec3(1, 0, 1), 300, () => {
    const caveBlock = bot.findBlock({
      matching: block => {
        return block && block.name === "air" && block.position && block.position.y < 60;
      },
      maxDistance: 32
    });
    if (caveBlock) {
      bot.placeBlock(caveBlock, new Vec3(0, 1, 0));
    }
    const mob = bot.nearestEntity(entity => {
      return entity.type === "mob" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    if (mob) {
      killMob(bot, mob.name, 300);
    }
    const ores = ["coal_ore", "iron_ore", "gold_ore", "diamond_ore"];
    for (const ore of ores) {
      const oreBlock = bot.findBlock({
        matching: mcData.blocksByName[ore].id,
        maxDistance: 32
      });
      if (oreBlock) {
        mineBlock(bot, ore, 1);
      }
    }
    return null; // Continue exploring until the time limit is reached
  });

  bot.chat("Finished exploring the cave and gathering resources.");
}