var ClCraft=0;
var recipe = [
//minecraftrecipe
[306, 1, 1, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, 0, 0, 0],
[307, 1, 1, 0, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate],
[308, 1, 1, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate],
[309, 1, 1, 0, 0, 0, 0, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate],
[314, 1, 1, 0, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, 0, ItemID.GoldPlate, 0, 0, 0],
[315, 1, 1, 0, ItemID.GoldPlate, 0, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate],
[316, 1, 1, 0, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, 0, ItemID.GoldPlate, ItemID.GoldPlate, 0, ItemID.GoldPlate],
[317, 1, 1, 0, 0, 0, 0, ItemID.GoldPlate, 0, ItemID.GoldPlate, ItemID.GoldPlate, 0, ItemID.GoldPlate],
[310, 1, 4, 0, 264, 264, 264, 264, 0, 264, 0, 0, 0],
[311, 1, 4, 0, 264, 0, 264, 264, 264, 264, 264, 264, 264],
[312, 1, 4, 0, 264, 264, 264, 264, 0, 264, 264, 0, 264],
[313, 1, 4, 0, 0, 0, 0, 264, 0, 264, 264, 0, 264],

[328, 1, 1, 0, 0, 0, 0, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate],
[330, 1, 1, 0, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate],
[359, 1, 5, 0, ItemID.IronPlate, 0, 0, 0, ItemID.IronPlate, 0, 0, 0, 0],
[167, 1, 5, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, 0, 0, 0],
[101, 6, 2, 0, 0, 0, 0, ItemID.IronRod, ItemID.IronRod, ItemID.IronRod, ItemID.IronRod, ItemID.IronRod, ItemID.IronRod],
[148, 1, 1, 0, ItemID.IronPlate, ItemID.IronPlate, 0, 0, 0, 0, 0, 0, 0],
[147, 1, 1, 0, ItemID.GoldPlate, ItemID.GoldPlate, 0, 0, 0, 0, 0, 0, 0],
[380, 1, 1, 0, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate],
[325, 1, 1, 0, ItemID.IronPlate, 0, ItemID.IronPlate, 0, ItemID.IronPlate, 0, 0, 0, 0],
//impuredust
[331, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureRedstoneDust, 0, 0, 0, 0],
[ItemID.LigniteDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureLigniteDust, 0, 0, 0, 0],
[ItemID.AntimonyDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureAntimonyDust, 0, 0, 0, 0],
[ItemID.LapisLazuliDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureLapisLazuliDust, 0, 0, 0, 0],
[ItemID.EmeraldDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureEmeraldDust, 0, 0, 0, 0],
[ItemID.DiamondDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureDiamondDust, 0, 0, 0, 0],
[ItemID.CoalDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureCoalDust, 0, 0, 0, 0],
[ItemID.IronDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureIronDust, 0, 0, 0, 0],
[ItemID.TinDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureTinDust, 0, 0, 0, 0],
[ItemID.SilverDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureSilverDust, 0, 0, 0, 0],
[ItemID.GoldDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureGoldDust, 0, 0, 0, 0],
[ItemID.CopperDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureCopperDust, 0, 0, 0, 0],
[ItemID.LeadDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureLeadDust, 0, 0, 0, 0],
//Shapes
[ItemID.MoldPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0],
[ItemID.EmptyShapePlate, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelPlate, 0, ItemID.SteelPlate, ItemID.SteelPlate, 0, 0, 0, 0],
[ItemID.MoldAnvil, 1, 1, 0, 0, 0, 0, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0],
[ItemID.MoldCylinder, 1, 1, 0, 0, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0, 0],
[ItemID.MoldIngot, 1, 1, 0, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0, 0, 0],
[ItemID.MoldNuggets, 1, 1, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.MoldBlock, 1, 1, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0, 0, 0, 0, 0],
//Plates
[ItemID.IronPlate, 1, 1, 0, 0, 0, 0, 0, 265, 0, 0, 265, 0],
[ItemID.GoldPlate, 1, 1, 0, 0, 0, 0, 0, 266, 0, 0, 266, 0],
[ItemID.CopperPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.CopperIngot, 0, 0, ItemID.CopperIngot, 0],
[ItemID.TinPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.TinIngot, 0, 0, ItemID.TinIngot, 0],
[ItemID.LeadPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.LeadIngot, 0, 0, ItemID.LeadIngot, 0],
[ItemID.AntimonyPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.AntimonyIngot, 0, 0, ItemID.AntimonyIngot, 0],
[ItemID.SilverPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.SilverIngot, 0, 0, ItemID.SilverIngot, 0],
[ItemID.BronzePlate, 1, 1, 0, 0, 0, 0, 0, ItemID.BronzeIngot, 0, 0, ItemID.BronzeIngot, 0],

//long rods
[ItemID.LongIronRod, 1, 1, 0, ItemID.IronRod, 0, ItemID.IronRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongGoldRod, 1, 1, 0, ItemID.GoldRod, 0, ItemID.GoldRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongBronzeRod, 1, 1, 0, ItemID.BronzeRod, 0, ItemID.BronzeRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongCopperRod, 1, 1, 0, ItemID.CopperRod, 0, ItemID.CopperRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongTinRod, 1, 1, 0, ItemID.TinRod, 0, ItemID.TinRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongLeadRod, 1, 1, 0, ItemID.LeadRod, 0, ItemID.LeadRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongAntimonyRod, 1, 1, 0, ItemID.AntimonyRod, 0, ItemID.AntimonyRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongSilverRod, 1, 1, 0, ItemID.SilverRod, 0, ItemID.SilverRod, 0, 0, 0, 0, 0, 0],

//wrenchs
[ItemID.IronWrench, 1, 1, 0, 265, 0, 265, 265, 265, 265, 0, 265, 0],
[ItemID.GoldWrench, 1, 1, 0, 266, 0, 266, 266, 266, 266, 0, 266, 0],
[ItemID.BronzeWrench, 1, 1, 0, ItemID.BronzeIngot, 0, ItemID.BronzeIngot, ItemID.BronzeIngot, ItemID.BronzeIngot, ItemID.BronzeIngot, 0, ItemID.BronzeIngot, 0],
[ItemID.LeadWrench, 1, 1, 0, ItemID.LeadIngot, 0, ItemID.LeadIngot, ItemID.LeadIngot, ItemID.LeadIngot, ItemID.LeadIngot, 0, ItemID.LeadIngot, 0],
[ItemID.SteelWrench, 1, 1, 0, ItemID.SteelIngot, 0, ItemID.SteelIngot, ItemID.SteelIngot, ItemID.SteelIngot, ItemID.SteelIngot, 0, ItemID.SteelIngot, 0],
[ItemID.SilverWrench, 1, 1, 0, ItemID.SilverIngot, 0, ItemID.SilverIngot, ItemID.SilverIngot, ItemID.SilverIngot, ItemID.SilverIngot, 0, ItemID.SilverIngot, 0],

//knifes
[ItemID.LeadKnife, 1, 5, 0, 0, ItemID.LeadPlate, 0, 0, ItemID.LeadRod, 0, 0, 0, 0],
[ItemID.SilverKnife, 1, 5, 0, 0, ItemID.SilverPlate, 0, 0, ItemID.SilverRod, 0, 0, 0, 0],
[ItemID.BronzeKnife, 1, 5, 0, 0, ItemID.BronzePlate, 0, 0, ItemID.BronzeRod, 0, 0, 0, 0],
[ItemID.GoldKnife, 1, 5, 0, 0, ItemID.GoldPlate, 0, 0, ItemID.GoldRod, 0, 0, 0, 0],
[ItemID.IronKnife, 1, 5, 0, 0, ItemID.IronPlate, 0, 0, ItemID.IronRod, 0, 0, 0, 0],
[ItemID.SteelKnife, 1, 5, 0, 0, ItemID.SteelPlate, 0, 0, ItemID.SteelPlate, 0, 0, 0, 0],

//rings
[ItemID.RubberRing, 1, 3, 0, 0, 0, 0, 0, ItemID.RubberPlate, 0, 0, 0, 0],
[ItemID.TinRing, 1, 1, 0, 0, 0, 0, 0, ItemID.TinRod, 0, 0, 0, 0],

//impureDusts
[ItemID.ImpureLigniteDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedLigniteOre, 0, 0, 0, 0],
[ItemID.ImpureLapisLazuliDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedLapisLazuliOre, 0, 0, 0, 0],
[ItemID.ImpureRedstoneDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedRedstoneOre, 0, 0, 0, 0],
[ItemID.ImpureEmeraldDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedEmeraldOre, 0, 0, 0, 0],
[ItemID.ImpureDiamondDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedDiamondOre, 0, 0, 0, 0],
[ItemID.ImpureCoalDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedCoalOre, 0, 0, 0, 0],
[ItemID.ImpureIronDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedIronOre, 0, 0, 0, 0],
[ItemID.ImpureTinDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedTinOre, 0, 0, 0, 0],
[ItemID.ImpureSilverDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedSilverOre, 0, 0, 0, 0],
[ItemID.ImpureGoldDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedGoldOre, 0, 0, 0, 0],
[ItemID.ImpureCopperDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedCopperOre, 0, 0, 0, 0],
[ItemID.ImpureLeadDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedLeadOre, 0, 0, 0, 0],
[ItemID.ImpureAntimonyDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedAntimonyOre, 0, 0, 0, 0],

//gems
[ItemID.FlawlessDiamond, 2, 1, 0, 0, 0, 0, 0, ItemID.PerfectDiamond, 0, 0, 0, 0],
[264, 2, 1, 0, 0, 0, 0, 0, ItemID.FlawlessDiamond, 0, 0, 0, 0],
[ItemID.DefectiveDiamond, 2, 1, 0, 0, 0, 0, 0, 264, 0, 0, 0, 0],
[ItemID.SplitDiamond, 2, 1, 0, 0, 0, 0, 0, ItemID.DefectiveDiamond, 0, 0, 0, 0],
[ItemID.FlawlessEmerald, 2, 1, 0, 0, 0, 0, 0, ItemID.PerfectEmerald, 0, 0, 0, 0],
[388, 2, 1, 0, 0, 0, 0, 0, ItemID.FlawlessEmerald, 0, 0, 0, 0],
[ItemID.DefectiveEmerald, 2, 1, 0, 0, 0, 0, 0, 388, 0, 0, 0, 0],
[ItemID.SplitEmerald, 2, 1, 0, 0, 0, 0, 0, ItemID.DefectiveEmerald, 0, 0, 0, 0],

//Swords
[ItemID.IronSword, 1, 5, 0, 0, ItemID.IronPlate, 0, 0, 265, 0, 0, 280, 0],
[ItemID.BronzeSword, 1, 5, 0, 0, ItemID.BronzePlate, 0, 0, ItemID.BronzeIngot, 0, 0, 280, 0],
[ItemID.SteelSword, 1, 5, 0, 0, ItemID.SteelPlate, 0, 0, ItemID.SteelIngot, 0, 0, 280, 0],
[ItemID.DiamondSword, 1, 4, 0, 0, 264, 0, 0, 264, 0, 0, 280, 0],
[ItemID.EmeraldSword, 1, 4, 0, 0, 388, 0, 0, 388, 0, 0, 280, 0],

//Shovels
[ItemID.IronShovel, 1, 5, 0, 0, ItemID.IronPlate, 0, 0, 280, 0, 0, 280, 0],
[ItemID.BronzeShovel, 1, 5, 0, 0, ItemID.BronzePlate, 0, 0, 280, 0, 0, 280, 0],
[ItemID.SteelShovel, 1, 5, 0, 0, ItemID.SteelPlate, 0, 0, 280, 0, 0, 280, 0],
[ItemID.DiamondShovel, 1, 5, 0, 0, 264, 0, 0, 280, 0, 0, 280, 0],
[ItemID.EmeraldShovel, 1, 5, 0, 0, 388, 0, 0, 280, 0, 0, 280, 0],

//Axes
[ItemID.IronAxe, 1, 5, 0, ItemID.IronPlate, 265, 0, ItemID.IronPlate, 280, 0, 0, 280, 0],
[ItemID.BronzeAxe, 1, 5, 0, ItemID.BronzePlate, ItemID.BronzeIngot, 0, ItemID.BronzePlate, 280, 0, 0, 280, 0],
[ItemID.SteelAxe, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelIngot, 0, ItemID.SteelPlate, 280, 0, 0, 280, 0],
[ItemID.DiamondAxe, 1, 5, 0, 264, 264, 0, 264, 280, 0, 0, 280, 0],
[ItemID.EmeraldAxe, 1, 5, 0, 388, 388, 0, 388, 280, 0, 0, 280, 0],

//Pickaxes
[ItemID.IronPickaxe, 1, 5, 0, ItemID.IronPlate, 265, 265, 0, 280, 0, 0, 280, 0],
[ItemID.BronzePickaxe, 1, 5, 0, ItemID.BronzePlate, ItemID.BronzeIngot, ItemID.BronzeIngot, 0, 280, 0, 0, 280, 0],
[ItemID.SteelPickaxe, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelIngot, ItemID.SteelIngot, 0, 280, 0, 0, 280, 0],
[ItemID.DiamondPickaxe, 1, 5, 0, 264, 264, 264, 0, 280, 0, 0, 280, 0],
[ItemID.EmeraldPickaxe, 1, 5, 0, 388, 388, 388, 0, 280, 0, 0, 280, 0],

//hoes
[ItemID.IronHoe, 1, 5, 0, ItemID.IronPlate, 265, 0, 0, 280, 0, 0, 280, 0],
[ItemID.BronzeHoe, 1, 5, 0, ItemID.BronzePlate, ItemID.BronzeIngot, 0, 0, 280, 0, 0, 280, 0],
[ItemID.SteelHoe, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelIngot, 0, 0, 280, 0, 0, 280, 0],
[ItemID.DiamondHoe, 1, 5, 0, 264, 264, 0, 0, 280, 0, 0, 280, 0],
[ItemID.EmeraldHoe, 1, 5, 0, 388, 388, 0, 0, 280, 0, 0, 280, 0],

//sawBlade
[ItemID.BronzeSawBlade, 1, 5, 0, ItemID.BronzePlate, ItemID.BronzePlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.GoldSawBlade, 1, 5, 0, ItemID.GoldPlate, ItemID.GoldPlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.IronSawBlade, 1, 5, 0, ItemID.IronPlate, ItemID.IronPlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.SilverSawBlade, 1, 5, 0, ItemID.SilverPlate, ItemID.SilverPlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.SteelSawBlade, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelPlate, 0, 0, 0, 0, 0, 0, 0],

//rods
[ItemID.IronRod, 1, 4, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0],
[ItemID.BronzeRod, 1, 4, 0, 0, 0, 0, 0, ItemID.BronzeIngot, 0, 0, 0, 0],
[ItemID.SilverRod, 1, 4, 0, 0, 0, 0, 0, ItemID.SilverIngot, 0, 0, 0, 0],
[ItemID.TinRod, 1, 4, 0, 0, 0, 0, 0, ItemID.TinIngot, 0, 0, 0, 0],
[ItemID.CopperRod, 1, 4, 0, 0, 0, 0, 0, ItemID.CopperIngot, 0, 0, 0, 0],
[ItemID.SteelRod, 1, 4, 0, 0, 0, 0, 0, ItemID.SteelIngot, 0, 0, 0, 0],
[ItemID.LeadRod, 1, 4, 0, 0, 0, 0, 0, ItemID.LeadIngot, 0, 0, 0, 0],
[ItemID.AntimonyRod, 1, 4, 0, 0, 0, 0, 0, ItemID.AntimonyIngot, 0, 0, 0, 0],
[ItemID.GoldRod, 1, 4, 0, 0, 0, 0, 0, 266, 0, 0, 0, 0],

//dusts
[ItemID.IronDust, 1, 8, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0],
[ItemID.BronzeDust, 1, 8, 0, 0, 0, 0, 0, ItemID.BronzeIngot, 0, 0, 0, 0],
[ItemID.SilverDust, 1, 8, 0, 0, 0, 0, 0, ItemID.SilverIngot, 0, 0, 0, 0],
[ItemID.TinDust, 1, 8, 0, 0, 0, 0, 0, ItemID.TinIngot, 0, 0, 0, 0],
[ItemID.CopperDust, 1, 8, 0, 0, 0, 0, 0, ItemID.CopperIngot, 0, 0, 0, 0],
[ItemID.SteelDust, 1, 8, 0, 0, 0, 0, 0, ItemID.SteelIngot, 0, 0, 0, 0],
[ItemID.LeadDust, 1, 8, 0, 0, 0, 0, 0, ItemID.LeadIngot, 0, 0, 0, 0],
[ItemID.AntimonyDust, 1, 8, 0, 0, 0, 0, 0, ItemID.AntimonyIngot, 0, 0, 0, 0],
[ItemID.GoldDust, 1, 8, 0, 0, 0, 0, 0, 266, 0, 0, 0, 0],
[ItemID.DiamondDust, 1, 8, 0, 0, 0, 0, 0, 264, 0, 0, 0, 0],
[ItemID.CoalDust, 1, 8, 0, 0, 0, 0, 0, 263, 0, 0, 0, 0],
[ItemID.EmeraldDust, 1, 8, 0, 0, 0, 0, 0, 388, 0, 0, 0, 0],
[ItemID.LapisLazuliDust, 1, 8, 0, 0, 0, 0, 0, 351, 0, 0, 0, 0],

//saw
[5, 4, 7, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0],
[5, 4, 7, 0, 0, 0, 0, 0, 162, 0, 0, 0, 0],
[280, 4, 7, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0],
[ItemID.IronBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.IronRod, 0, 0, 0, 0],
[ItemID.BronzeBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.BronzeRod, 0, 0, 0, 0],
[ItemID.SilverBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.SilverRod, 0, 0, 0, 0],
[ItemID.TinBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.TinRod, 0, 0, 0, 0],
[ItemID.CopperBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.CopperRod, 0, 0, 0, 0],
[ItemID.SteelBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.SteelRod, 0, 0, 0, 0],
[ItemID.LeadBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.LeadRod, 0, 0, 0, 0],
[ItemID.AntimonyBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.AntimonyRod, 0, 0, 0, 0],
[ItemID.GoldBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.GoldRod, 0, 0, 0, 0],

//pipes
[BlockID.SmallBronzeFluidPipe, 6, 6, 0, ItemID.BronzePlate, 0, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate],
[BlockID.BronzeFluidPipe, 2, 6, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, 0, 0, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate],

//blocks
[BlockID.BronzePlatedBlastFurnase, 1, 2, 0, ItemID.BronzePlate, 61, ItemID.BronzePlate, 61, 0, 61, ItemID.BronzePlate, 61, ItemID.BronzePlate],
[BlockID.BronzePlatedBricks, 2, 2, 0, ItemID.BronzePlate, 0, ItemID.BronzePlate, ItemID.BronzePlate, 45, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate],
[BlockID.BronzeHull, 1, 2, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate],
[BlockID.BrikedBronzeHull, 1, 2, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate, 45, 45, 45],
]


Translation.addTranslation("Gregtech workbench", {ru: "Верстак(GregTech)",  zh: "格雷工作台"});

IDRegistry.genBlockID("gregCraft");
Block.createBlockWithRotation("gregCraft", [
{name: "Gregtech workbench", texture: [["GGCB", 0], ["GGCT", 0], ["GGCS", 0], ["GGCS", 0], ["GGCS", 0], ["GGCS", 0],], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.gregCraft, count: 1, data: 0}, [
		"ww ",
		"ww ",
		"   "
	], ['w', 4, 0]);
});

var guiCraftGreg = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Craft"}},
        inventory: {standart: true},
        background: {standart: true}
    },

    
    drawing: [
           
    ],
	
    
    elements: {
        "slot1": {type: "slot", x: 460, y: 150},
	    "slot2": {type: "slot", x: 520, y: 150},
		"slot3": {type: "slot", x: 580, y: 150},
		"slot4": {type: "slot", x: 460, y: 210},
		"slot5": {type: "slot", x: 520, y: 210},
		"slot6": {type: "slot", x: 580, y: 210},
		"slot7": {type: "slot", x: 460, y: 270},
		"slot8": {type: "slot", x: 520, y: 270},
		"slot9": {type: "slot", x: 580, y: 270},
		"slotResult": {type: "slot", x: 680, y: 210},
		"craft_button": {type: "button",  x: 600, y: 350, bitmap: "CraftButton", bitmap2: "CraftButtonDown", scale: 3.2, clicker: {onClick: function(){if(ClCraft == 0){ClCraft = 1;}}}},
		"slotT1": {type: "slot", x: 800, y: 120},
		"slotT2": {type: "slot", x: 800, y: 180},
		"slotT3": {type: "slot", x: 800, y: 240},
		"slotT4": {type: "slot", x: 800, y: 300},
	}
});

SteamMachineRegistry.register(BlockID.gregCraft, {
	defaultValues: {
		set: 0,
		ham: 0,
		ham2: 0,
		water: 0
	},
	
	getGuiScreen: function(){
		return guiCraftGreg;
	},
	
	tick: function(){
		var slot1 = this.container.getSlot("slot1");
		var slot2 = this.container.getSlot("slot2");
		var slot3 = this.container.getSlot("slot3");
		var slot4 = this.container.getSlot("slot4");
		var slot5 = this.container.getSlot("slot5");
		var slot6 = this.container.getSlot("slot6");
		var slot7 = this.container.getSlot("slot7");
		var slot8 = this.container.getSlot("slot8");
		var slot9 = this.container.getSlot("slot9");
		var slot10 = this.container.getSlot("slotResult");
		var slot11 = this.container.getSlot("slotT1");
		var slot12 = this.container.getSlot("slotT2");
		var slot13 = this.container.getSlot("slotT3");
		var slot14 = this.container.getSlot("slotT4");
		var slot = [slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9, slot10, slot11, slot12, slot13, slot14];
		if (slot1.count == 0)
	   {
		   slot1.id = 0;
	   }
	    if (slot2.count == 0)
	   {
		   slot2.id = 0;
	   }
	    if (slot3.count == 0)
	   {
		   slot3.id = 0;
	   }
	    if (slot4.count == 0)
	   {
		   slot4.id = 0;
	   }
	    if (slot5.count == 0)
	   {
		   slot5.id = 0;
	   }
	    if (slot6.count == 0)
	   {
		   slot6.id = 0;
	   }
	    if (slot7.count == 0)
	   {
		   slot7.id = 0;
	   }
	    if (slot8.count == 0)
	   {
		   slot8.id = 0;
	   }
	    if (slot9.count == 0)
	   {
		   slot9.id = 0;
	   }
	    if (slot11.count == 0)
	   {
		   slot11.id = 0;
	   }
	    if (slot12.count == 0)
	   {
		   slot12.id = 0;
	   }
	   if (slot13.count == 0)
	   {
		   slot13.id = 0;
	   }
	   if (slot14.count == 0)
	   {
		   slot14.id = 0;
	   }
for(var craft in slot){
	if(slot[craft].count<0){
		slot[craft].count=0;
	}
}
if(slot[10].id==0){
		this.data.ham=0;	
	}
if(this.data.ham2>0&&(slot[11].id==0||slot[10].id==0)){
		this.data.ham2=0;	
	}
for(var b in Hammers){
		if(slot[10].id==Hammers[b][0]){
			this.data.ham=1;
		}
		if(slot[10].id==Hammers[b][0]&&slot[10].data>=Hammers[b][1]){
			slot[10].count=0;
		}
	}
for(var w in Wrenchs){
		if(slot[10].id==Wrenchs[w][0]){
			this.data.ham=2;
		}
		if(slot[10].id==Wrenchs[w][0]&&slot[10].data>=Wrenchs[w][1]){
			slot[10].count=0;
		}
	}
for(var k in Knifes){
		if(slot[10].id==Knifes[k][0]){
			this.data.ham=3;
		}
		if(slot[10].id==Knifes[k][0]&&slot[10].data>=Knifes[k][1]){
			slot[10].count=0;
		}
	}
for(var f in Files){
		if(slot[10].id==Files[f][0]){
			this.data.ham=4;
		}
		if(slot[10].id==Files[f][0]&&slot[10].data>=Files[f][1]){
			slot[10].count=0;
		}
	}
for(var m in Mortars){
        if(slot[10].id==Mortars[m][0]){
            this.data.ham=8;
        }
        if(slot[10].id==Mortars[m][0]&&slot[10].data>=Mortars[m][1]){
            slot[10].count=0;
        }
    }
for(var s in Saws){
        if(slot[10].id==Saws[s][0]){
            this.data.ham=7;
        }
        if(slot[10].id==Saws[s][0]&&slot[10].data>=Saws[s][1]){
            slot[10].count=0;
        }
    }
for(var hf in Files){
for(var fh in Hammers){
		if((slot[11].id==Files[hf][0]||slot[10].id==Files[hf][0])&&(slot[10].id==Hammers[fh][0]||slot[11].id==Hammers[fh][0])){
			this.data.ham2=5;
		}
		if(slot[10].id==Files[hf][0]&&slot[10].data>=Files[hf][1]||slot[10].id==Hammers[fh][0]&&slot[10].data>=Hammers[fh][1]){
			slot[10].count=0;
		}
        if(slot[11].id==Files[hf][0]&&slot[11].data>=Files[hf][1]||slot[11].id==Hammers[fh][0]&&slot[11].data>=Hammers[fh][1]){
			slot[11].count=0;
		}
	}
}
 if((slot[10].id==325&&slot[10].data==8)||slot[10].id==ItemID.cellWater){
            this.data.ham=9;
        }

for(var hw in Wrenchs){
for(var wh in Hammers){
		if((slot[11].id==Wrenchs[hw][0]||slot[10].id==Wrenchs[hw][0])&&(slot[10].id==Hammers[wh][0]||slot[11].id==Hammers[wh][0])){
			this.data.ham2=6;
		}
		if(slot[10].id==Wrenchs[hw][0]&&slot[10].data>=Wrenchs[hw][1]||slot[10].id==Hammers[wh][0]&&slot[10].data>=Hammers[wh][1]){
			slot[10].count=0;
		}
        if(slot[11].id==Wrenchs[hw][0]&&slot[11].data>=Wrenchs[hw][1]||slot[11].id==Hammers[wh][0]&&slot[11].data>=Hammers[wh][1]){
			slot[11].count=0;
		}
	}
}
	
	if(ClCraft==1){
for(var k in recipe){
if(slot[0].id==recipe[k][4]&& slot[1].id==recipe[k][5]&&slot[2].id==recipe[k][6]&&slot[3].id==recipe[k][7]&&slot[4].id==recipe[k][8]&&slot[5].id==recipe[k][9]&&slot[6].id==recipe[k][10]&&slot[7].id==recipe[k][11]&&slot[8].id==recipe[k][12]&&(recipe[k][2]==this.data.ham||recipe[k][2]==this.data.ham2)){
this.data.set++;
if(this.data.set==9&&(slot[9].id==recipe[k][0]||slot[9].id==0)&&slot[9].count<=64-recipe[k][1]){
slot[9].id=recipe[k][0];
slot[9].count+=recipe[k][1];					slot[9].data=recipe[k][3];
if(this.data.ham!=9){
slot[10].data+=1;
}
if(slot[11].id>0){
slot[11].data++;
}slot[0].count--;
slot[1].count--; 
slot[2].count--;slot[3].count--;
slot[4].count--;
slot[5].count--;
slot[6].count--;
slot[7].count--;
slot[8].count--;
ClCraft=0;
this.data.set=0;
if(this.data.ham==9){
this.data.water++;
}
if(this.data.water==8){
if(slot[10].id==325){
slot[10].data=0;
this.data.ham=0;
this.data.water=0;
}
if(slot[10].id==ItemID.cellWater){
slot[10].id=ItemID.cellEmpty;
this.data.ham=0;
this.data.water=0;
}
}
          }						
        }
      }
    }
  }
});