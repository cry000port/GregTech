addTool("Iron", 64, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Bronze", 48, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Diamond", 320, {hammer: 1, wrench: 0, file: 0, knife: 0, saw: 0, mortar: 1});
addTool("Emerald", 64, {hammer: 1, wrench: 0, file: 0, knife: 0, saw: 0});
addTool("Quartz", 16, {hammer: 1, wrench: 0, file: 0, knife: 0, saw: 0});
addTool("Star", 1280, {hammer: 1, wrench: 0, file: 0, knife: 0, saw: 0});
addTool("Gold", 32, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Lead", 16, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Steel", 128, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Silver", 16, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Flint", 16, {hammer: 0, wrench: 0, file: 0, knife: 0, saw: 0, mortar: 1});

Recipes.addShaped({id: ItemID.IronSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', 280, 0, '#', ItemID.IronSawBlade, 0]);

Recipes.addShaped({id: ItemID.BronzeSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', 280, 0, '#', ItemID.BronzeSawBlade, 0]);

Recipes.addShaped({id: ItemID.GoldSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', ItemID.SteelRod, 0, '#', ItemID.GoldSawBlade, 0]);

Recipes.addShaped({id: ItemID.SteelSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', 280, 0, '#', ItemID.SteelSawBlade, 0]);

Recipes.addShaped({id: ItemID.SilverSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', ItemID.SteelRod, 0, '#', ItemID.SilverSawBlade, 0]);

Recipes.addShaped({id: ItemID.IronHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 265, 0]);

Recipes.addShaped({id: ItemID.GoldHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', ItemID.SteelRod, 0, '#', 266, 0]);


Recipes.addShaped({id: ItemID.BronzeHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', ItemID.BronzeIngot, 0]);

Recipes.addShaped({id: ItemID.SilverHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', ItemID.SteelRod, 0, '#', ItemID.SilverIngot, 0]);

Recipes.addShaped({id: ItemID.SteelHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', ItemID.SteelIngot, 0]);


Recipes.addShaped({id: ItemID.DiamondHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 264, 0]);


Recipes.addShaped({id: ItemID.EmeraldHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 388, 0]);


Recipes.addShaped({id: ItemID.QuartzHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 406, 0]);


Recipes.addShaped({id: ItemID.StarHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 399, 0]);

Recipes.addShaped({id: ItemID.BronzeFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', 280, 0, '#', ItemID.BronzePlate, 0]);

Recipes.addShaped({id: ItemID.SteelFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', 280, 0, '#', ItemID.SteelPlate, 0]);

Recipes.addShaped({id: ItemID.SilverFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', ItemID.SteelRod, 0, '#', ItemID.SilverPlate, 0]);


Recipes.addShaped({id: ItemID.IronFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', 280, 0, '#', ItemID.IronPlate, 0]);


Recipes.addShaped({id: ItemID.GoldFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', ItemID.SteelRod, 0, '#', ItemID.GoldPlate, 0]);
