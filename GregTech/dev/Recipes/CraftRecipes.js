Recipes.addShaped({id: 50, count: 4, data: 0}, ["b ","a "], ['a', 280, 0, 'b', ItemID.latex, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldCylinder, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldAnvil, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldPlate, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldIngot, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldNuggets, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldBlock, 0]);
var recMortar=[[ItemID.GoldMortar, 266],[ItemID.BronzeMortar, ItemID.BronzeIngot],[ItemID.DiamondMortar, 264],[ItemID.FlintMortar, 318],[ItemID.LeadMortar, ItemID.LeadIngot],[ItemID.SilverMortar, ItemID.SilverIngot],[ItemID.SteelMortar, ItemID.SteelIngot],[ItemID.IronMortar, 265]];
for(var i in recMortar){
Recipes.addShaped({id: recMortar[i][0], count: 1, data: 0}, [" a ","bab","bbb"], ['b', 1, 0, 'a', recMortar[i][1], 0]);
}

var tinydust=[[ItemID.TinDust,ItemID.TinyPileTinDust],[ItemID.IronDust, ItemID.TinyPileIronDust],[ItemID.GoldDust, ItemID.TinyPileGoldDust],
[ItemID.CopperDust, ItemID.TinyPileCopperDust],[ItemID.LeadDust, ItemID.TinyPileLeadDust],[ItemID.SilverDust, ItemID.TinyPileSilverDust],[ItemID.RubberDust, ItemID.TinyPileRubberDust],[ItemID.BronzeDust, ItemID.TinyPileBronzeDust],[ItemID.AntimonyDust, ItemID.TinyPileAntimonyDust],
[ItemID.DiamondDust, ItemID.TinyPileDiamondDust],[ItemID.EmeraldDust, ItemID.TinyPileEmeraldDust],[ItemID.SteelDust, ItemID.TinyPileSteelDust],[ItemID.AshesDust, ItemID.TinyPileAshesDust],[ItemID.DarkAshesDust, ItemID.TinyPileDarkAshesDust]];

var smalldust=[[ItemID.TinDust,ItemID.SmallPileTinDust],[ItemID.IronDust, ItemID.SmallPileIronDust],[ItemID.GoldDust, ItemID.SmallPileGoldDust],
[ItemID.CopperDust, ItemID.SmallPileCopperDust],[ItemID.LeadDust, ItemID.SmallPileLeadDust],[ItemID.SilverDust, ItemID.SmallPileSilverDust],[ItemID.RubberDust, ItemID.SmallPileRubberDust],[ItemID.BronzeDust, ItemID.SmallPileBronzeDust],[ItemID.AntimonyDust, ItemID.SmallPileAntimonyDust],
[ItemID.DiamondDust, ItemID.SmallPileDiamondDust],[ItemID.EmeraldDust, ItemID.SmallPileEmeraldDust],[ItemID.SteelDust, ItemID.SmallPileSteelDust]];
for(var i in tinydust){
Recipes.addShaped({id: tinydust[i][0], count: 1, data: 0}, ["bbb","bbb","bbb"], ['b', tinydust[i][1], 0]);
Recipes.addShaped({id: tinydust[i][1], count: 9, data: 0}, ["  "," b"], ['b', tinydust[i][0], 0]);
}
for(var i in smalldust){
Recipes.addShaped({id: smalldust[i][0], count: 1, data: 0}, ["bb","bb"], ['b', smalldust[i][1], 0]);
Recipes.addShaped({id: smalldust[i][1], count: 4, data: 0}, ["  "," b"], ['b', smalldust[i][0], 0]);
}
Recipes.addShaped({id: ItemID.BronzeDust, count: 3, data: 0}, ["aa","ab"], ['b', ItemID.TinDust, 0, 'a', ItemID.CopperDust, 0]);