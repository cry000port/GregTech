addTool1("Wood", {dur: 15, lvl: 1, eff: 1.5, dmg: 1, ench: 8});
ToolAPI.setTool(ItemID.WoodSword, "Wood", ToolType.sword);
ToolAPI.setTool(ItemID.WoodShovel, "Wood", ToolType.shovel);
ToolAPI.setTool(ItemID.WoodPickaxe, "Wood", ToolType.pickaxe);
ToolAPI.setTool(ItemID.WoodAxe, "Wood", ToolType.axe);
ToolAPI.setTool(ItemID.WoodHoe, "Wood", ToolType.hoe);
Recipes.addShaped({id: ItemID.WoodSword, count: 1, data: 0}, [" b "," b "," a "], ['a', 280, 0, 'b', 5, -1]);
Recipes.addShaped({id: ItemID.WoodAxe, count: 1, data: 0}, ["bb ","ba "," a "], ['a', 280, 0, 'b', 5, -1]); 
Recipes.addShaped({id: ItemID.WoodShovel, count: 1, data: 0}, [" b "," a "," a "], ['a', 280, 0, 'b', 5, -1]);
Recipes.addShaped({id: ItemID.WoodHoe, count: 1, data: 0}, ["bb "," a "," a "], ['a', 280, 0, 'b', 5, -1]); 
Recipes.addShaped({id: ItemID.WoodPickaxe, count: 1, data: 0}, ["bbb"," a "," a "], ['a', 280, 0, 'b', 5, -1]);

addTool1("Flint", {dur: 63, lvl: 2, eff: 2, dmg: 2, ench: 10});
ToolAPI.setTool(ItemID.FlintSword, "Flint", ToolType.sword);
ToolAPI.setTool(ItemID.FlintShovel, "Flint", ToolType.shovel);
ToolAPI.setTool(ItemID.FlintPickaxe, "Flint", ToolType.pickaxe);
ToolAPI.setTool(ItemID.FlintAxe, "Flint", ToolType.axe);
ToolAPI.setTool(ItemID.FlintHoe, "Flint", ToolType.hoe);
Recipes.addShaped({id: ItemID.FlintSword, count: 1, data: 0}, [" b "," b "," a "], ['a', 280, 0, 'b', 318, 0]);
Recipes.addShaped({id: ItemID.FlintAxe, count: 1, data: 0}, ["bb ","ba "," a "], ['a', 280, 0, 'b', 318, 0]); 
Recipes.addShaped({id: ItemID.FlintShovel, count: 1, data: 0}, [" b "," a "," a "], ['a', 280, 0, 'b', 318, 0]);
Recipes.addShaped({id: ItemID.FlintHoe, count: 1, data: 0}, ["bb "," a "," a "], ['a', 280, 0, 'b', 318, 0]); 
Recipes.addShaped({id: ItemID.FlintPickaxe, count: 1, data: 0}, ["bbb"," a "," a "], ['a', 280, 0, 'b', 318, 0]);


addTool1("Stone", {dur: 31, lvl: 2, eff: 2.5, dmg: 1.5, ench: 14});
ToolAPI.setTool(ItemID.StoneSword, "Stone", ToolType.sword);
ToolAPI.setTool(ItemID.StoneShovel, "Stone", ToolType.shovel);
ToolAPI.setTool(ItemID.StonePickaxe, "Stone", ToolType.pickaxe);
ToolAPI.setTool(ItemID.StoneAxe, "Stone", ToolType.axe);
ToolAPI.setTool(ItemID.StoneHoe, "Stone", ToolType.hoe);
Recipes.addShaped({id: ItemID.StoneSword, count: 1, data: 0}, [" b "," b "," a "], ['a', 280, 0, 'b', 4, 0]);
Recipes.addShaped({id: ItemID.StoneAxe, count: 1, data: 0}, ["bb ","ba "," a "], ['a', 280, 0, 'b', 4, 0]); 
Recipes.addShaped({id: ItemID.StoneShovel, count: 1, data: 0}, [" b "," a "," a "], ['a', 280, 0, 'b', 4, 0]);
Recipes.addShaped({id: ItemID.StoneHoe, count: 1, data: 0}, ["bb "," a "," a "], ['a', 280, 0, 'b', 4, 0]); 
Recipes.addShaped({id: ItemID.StonePickaxe, count: 1, data: 0}, ["bbb"," a "," a "], ['a', 280, 0, 'b', 4, 0]);


addTool1("Iron", {dur: 255, lvl: 3, eff: 4.5, dmg: 2.5, ench: 16});
ToolAPI.setTool(ItemID.IronSword, "Iron", ToolType.sword);
ToolAPI.setTool(ItemID.IronShovel, "Iron", ToolType.shovel);
ToolAPI.setTool(ItemID.IronPickaxe, "Iron", ToolType.pickaxe);
ToolAPI.setTool(ItemID.IronAxe, "Iron", ToolType.axe);
ToolAPI.setTool(ItemID.IronHoe, "Iron", ToolType.hoe);

addTool1("Bronze", {dur: 191, lvl: 3, eff: 4.5, dmg: 2.5, ench: 12});
ToolAPI.setTool(ItemID.BronzeSword, "Bronze", ToolType.sword);
ToolAPI.setTool(ItemID.BronzeShovel, "Bronze", ToolType.shovel);
ToolAPI.setTool(ItemID.BronzePickaxe, "Bronze", ToolType.pickaxe);
ToolAPI.setTool(ItemID.BronzeAxe, "Bronze", ToolType.axe);
ToolAPI.setTool(ItemID.BronzeHoe, "Bronze", ToolType.hoe);

addTool1("Diamond", {dur: 1279, lvl: 4, eff: 5.5, dmg: 3.5, ench: 19});
ToolAPI.setTool(ItemID.DiamondSword, "Diamond", ToolType.sword);
ToolAPI.setTool(ItemID.DiamondShovel, "Diamond", ToolType.shovel);
ToolAPI.setTool(ItemID.DiamondPickaxe, "Diamond", ToolType.pickaxe);
ToolAPI.setTool(ItemID.DiamondAxe, "Diamond", ToolType.axe);
ToolAPI.setTool(ItemID.DiamondHoe, "Diamond", ToolType.hoe);

addTool1("Steel", {dur: 511, lvl: 3, eff: 4.5, dmg: 2.5, ench: 6});
ToolAPI.setTool(ItemID.SteelSword, "Steel", ToolType.sword);
ToolAPI.setTool(ItemID.SteelShovel, "Steel", ToolType.shovel);
ToolAPI.setTool(ItemID.SteelPickaxe, "Steel", ToolType.pickaxe);
ToolAPI.setTool(ItemID.SteelAxe, "Steel", ToolType.axe);
ToolAPI.setTool(ItemID.SteelHoe, "Steel", ToolType.hoe);

addTool1("Emerald", {dur: 255, lvl: 3, eff: 5 , dmg: 2.5, ench: 25});
ToolAPI.setTool(ItemID.EmeraldSword, "Emerald", ToolType.sword);
ToolAPI.setTool(ItemID.EmeraldShovel, "Emerald", ToolType.shovel);
ToolAPI.setTool(ItemID.EmeraldPickaxe, "Emerald", ToolType.pickaxe);
ToolAPI.setTool(ItemID.EmeraldAxe, "Emerald", ToolType.axe);
ToolAPI.setTool(ItemID.EmeraldHoe, "Emerald", ToolType.hoe);