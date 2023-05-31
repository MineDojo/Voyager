async function craftShieldImproved(bot) {
  // Check if there are enough oak planks in the inventory
  let oakPlanksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);

  // If not, check if there are enough oak logs in the inventory
  if (oakPlanksCount < 6) {
    let oakLogsCount = bot.inventory.count(mcData.itemsByName.oak_log.id);
    const planksToCraft = Math.ceil((6 - oakPlanksCount) / 4);

    // If not, explore to find and mine oak logs
    if (oakLogsCount < planksToCraft) {
      await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
        const oak_log = bot.findBlock({
          matching: mcData.blocksByName["oak_log"].id,
          maxDistance: 32
        });
        return oak_log;
      });
      await mineBlock(bot, "oak_log", planksToCraft - oakLogsCount);
      bot.chat("Collected oak logs.");
    }

    // Craft oak planks from oak logs
    await craftItem(bot, "oak_planks", planksToCraft);
    bot.chat("Crafted oak planks.");
    oakPlanksCount = bot.inventory.count(mcData.itemsByName.oak_planks.id);
  }

  // Check if there are enough iron ingots in the inventory
  let ironIngotsCount = bot.inventory.count(mcData.itemsByName.iron_ingot.id);

  // If not, explore to find and mine iron ores
  if (ironIngotsCount < 1) {
    await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
      const iron_ore = bot.findBlock({
        matching: mcData.blocksByName["iron_ore"].id,
        maxDistance: 32
      });
      return iron_ore;
    });
    await mineBlock(bot, "iron_ore", 1);
    bot.chat("Collected iron ores.");

    // Smelt iron ores into iron ingots
    await smeltItem(bot, "iron_ore", "coal", 1);
    bot.chat("Smelted iron ores into iron ingots.");
  }

  // Place the crafting table near the bot
  const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft a shield using the crafting table
  await craftItem(bot, "shield", 1);
  bot.chat("Crafted a shield.");
}