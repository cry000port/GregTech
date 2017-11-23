Recipes.addShaped({id: 50, count: 4, data: 0}, ["b ","a "], ['a', 280, 0, 'b', ItemID.latex, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldCylinder, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldAnvil, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldPlate, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldIngot, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldNuggets, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldBlock, 0]);
var recMortar=[[ItemID.mortarGold, 266],[ItemID.mortarBronze, ItemID.ingotBronze],[ItemID.mortarDiamond, 264],[ItemID.mortarFlint, 318],[ItemID.mortarLead, ItemID.ingotLead],[ItemID.mortarSilver, ItemID.ingotSilver],[ItemID.mortarSteel, ItemID.ingotSteel],[ItemID.mortarIron, 265]];
for(var i in recMortar){
Recipes.addShaped({id: recMortar[i][0], count: 1, data: 0}, [" a ","bab","bbb"], ['b', 1, 0, 'a', recMortar[i][1], 0]);
}

var tinydust=[[ItemID.dustTin,ItemID.tinydustTin],[ItemID.dustIron, ItemID.tinydustIron],[ItemID.dustGold, ItemID.tinydustGold],
[ItemID.dustCopper, ItemID.tinydustCopper],[ItemID.dustLead, ItemID.tinydustLead],[ItemID.dustSilver, ItemID.tinydustSilver],[ItemID.dustRubber, ItemID.tinydustRubber],[ItemID.dustBronze, ItemID.tinydustBronze],[ItemID.dustAntimony, ItemID.tinydustAntimony],
[ItemID.dustDiamond, ItemID.tinydustDiamond],[ItemID.dustEmerald, ItemID.tinydustEmerald],[ItemID.dustSteel, ItemID.tinydustSteel],[ItemID.dustAshes, ItemID.tinydustAshes],[ItemID.dustDarkAshes, ItemID.tinydustDarkAshes]];

var smalldust=[[ItemID.dustTin,ItemID.smalldustTin],[ItemID.dustIron, ItemID.smalldustIron],[ItemID.dustGold, ItemID.smalldustGold],
[ItemID.dustCopper, ItemID.smalldustCopper],[ItemID.dustLead, ItemID.smalldustLead],[ItemID.dustSilver, ItemID.smalldustSilver],[ItemID.dustRubber, ItemID.smalldustRubber],[ItemID.dustBronze, ItemID.smalldustBronze],[ItemID.dustAntimony, ItemID.smalldustAntimony],
[ItemID.dustDiamond, ItemID.smalldustDiamond],[ItemID.dustEmerald, ItemID.smalldustEmerald],[ItemID.dustSteel, ItemID.smalldustSteel]];
for(var i in tinydust){
Recipes.addShaped({id: tinydust[i][0], count: 1, data: 0}, ["bbb","bbb","bbb"], ['b', tinydust[i][1], 0]);
Recipes.addShaped({id: tinydust[i][1], count: 9, data: 0}, ["  "," b"], ['b', tinydust[i][0], 0]);
}
for(var i in smalldust){
Recipes.addShaped({id: smalldust[i][0], count: 1, data: 0}, ["bb","bb"], ['b', smalldust[i][1], 0]);
Recipes.addShaped({id: smalldust[i][1], count: 4, data: 0}, ["  "," b"], ['b', smalldust[i][0], 0]);
}
Recipes.addShaped({id: ItemID.dustBronze, count: 3, data: 0}, ["aa","ab"], ['b', ItemID.dustTin, 0, 'a', ItemID.dustCopper, 0]);
