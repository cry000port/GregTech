var BLOCK_TYPE_STONE = Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 3,
	explosionres: 3
}, "stone");


IDRegistry.genBlockID("oreSilverSmall");
Block.createBlock("oreSilverSmall", [
	{name: "Small Silver Ore", texture: [["SILVER_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreSilverSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreSilverSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedSilverOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureSilverDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 2);


IDRegistry.genBlockID("oreLeadSmall");
Block.createBlock("oreLeadSmall", [
	{name: "Small Lead Ore", texture: [["LEAD_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLeadSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreLeadSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedLeadOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureLeadDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
		}
	return [];
}, 1);


IDRegistry.genBlockID("oreTinSmall");
Block.createBlock("oreTinSmall", [
	{name: "Small Tin Ore", texture: [["TIN_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreTinSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreTinSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedTinOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureTinDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
return [];
}, 1);


IDRegistry.genBlockID("oreCopperSmall");
Block.createBlock("oreCopperSmall", [
	{name: "Small Copper Ore", texture: [["COPPER_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCopperSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreCopperSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedCopperOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureCopperDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
		}
	return [];
}, 1);


IDRegistry.genBlockID("oreDiamondSmall");
Block.createBlock("oreDiamondSmall", [
	{name: "Small Diamond Ore", texture: [["DIAMOND_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreDiamondSmall, "stone", 3, true);

Block.registerDropFunctionForID(BlockID.oreDiamondSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 2){
     return [[blockID, 1, 0]]; 
}
return [];
}, 3);


IDRegistry.genBlockID("oreEmeraldSmall");
Block.createBlock("oreEmeraldSmall", [
	{name: "Small Emerald Ore", texture: [["EMERALD_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreEmeraldSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreEmeraldSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
     return [[blockID, 1, 0]]; 
}
return [];
}, 2);


IDRegistry.genBlockID("oreLapisSmall");
Block.createBlock("oreLapisSmall", [
	{name: "Small Lapis-Lazuli Ore", texture: [["LAPIS_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLapisSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreLapisSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<98/100){
			drop.push([351, 1, 4]);
		}
		drop.push([351, 1, 4]);
		if(Math.random()<98/100){
			drop.push([ItemID.CrushedLapisLazuliOre, 1, 0]);
		}
		drop.push([ItemID.CrushedLapisLazuliOre, 1, 0]);
		if(Math.random()<98/100){
			drop.push([ItemID.ImpureLapisLazuliDust, 1, 0]);
		}
		drop.push([ItemID.ImpureLapisLazuliDust, 1, 0]);
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 1);


IDRegistry.genBlockID("oreRedstoneSmall");
Block.createBlock("oreRedstoneSmall", [
	{name: "Small Redstone Ore", texture: [["REDSTONE_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreRedstoneSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreRedstoneSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedRedstoneOre, 1, 0]);
		}
		drop.push([ItemID.CrushedRedstoneOre, 2, 0]);
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureRedstoneDustRedstone, 1, 0]);
		}
		drop.push([ItemID.ImpureRedstoneDust, 2, 0]);
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 2);


IDRegistry.genBlockID("oreGoldSmall");
Block.createBlock("oreGoldSmall", [
	{name: "Small Gold Ore", texture: [["GOLD_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreGoldSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreGoldSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedGoldOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureGoldDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
		}
	return [];
}, 2);


IDRegistry.genBlockID("oreIronSmall");
Block.createBlock("oreIronSmall", [
	{name: "Small Iron Ore", texture: [["IRON_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreIronSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreIronSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedIronOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureIronDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 2);


IDRegistry.genBlockID("oreCoalSmall");
Block.createBlock("oreCoalSmall", [
	{name: "Small Coal Ore", texture: [["COAL_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCoalSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreCoalSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<1/3){
			drop.push([ItemID.CrushedCoalOre, 1, 0]);
		}
		if(Math.random()<1/3){
			drop.push([ItemID.ImpureCoalDust, 1, 0]);
		}
		if(Math.random()<1/3){
			drop.push([263, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 1);



IDRegistry.genBlockID("oreMalachite");
Block.createBlock("oreMalachite", [
	{name: "Malachite Ore", texture: [["MALACHITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreMalachite, "stone", 3, true);
Block.setDestroyLevel("oreMalachite", 3);


IDRegistry.genBlockID("oreBandedIron");
Block.createBlock("oreBandedIron", [
	{name: "Banded Iron Ore", texture: [["BANDED_IRON_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreBandedIron, "stone", 3, true);
Block.setDestroyLevel("oreBandedIron", 3);


IDRegistry.genBlockID("oreYellowLimonite");
Block.createBlock("oreYellowLimonite", [
	{name: "Yellow Limonite Ore", texture: [["YELLOW_LIMONITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreYellowLimonite, "stone", 3, true);
Block.setDestroyLevel("oreYellowLimonite", 3);


IDRegistry.genBlockID("oreBrownLimonite");
Block.createBlock("oreBrownLimonite", [
	{name: "Brown Limonite Ore", texture: [["BROWN_LIMONITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreBrownLimonite, "stone", 2, true);
Block.setDestroyLevel("oreBrownLimonite", 2);


IDRegistry.genBlockID("orePyrite");
Block.createBlock("orePyrite", [
	{name: "Pyrite Ore", texture: [["PYRITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.orePyrite, "stone", 2, true);
Block.setDestroyLevel("orePyrite", 2);


IDRegistry.genBlockID("oreChalcopyrite");
Block.createBlock("oreChalcopyrite", [
	{name: "Chalcopyrite Ore", texture: [["CHALCOPYRITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreChalcopyrite, "stone", 2, true);
Block.setDestroyLevel("oreChalcopyrite", 2);


IDRegistry.genBlockID("oreVanadiumMagnetite");
Block.createBlock("oreVanadiumMagnetite", [
	{name: "Vanadium-Magnetite Ore", texture: [["VANADIUM_MAGNETITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreVanadiumMagnetite, "stone", 3, true);
Block.setDestroyLevel("oreVanadiumMagnetite", 3);


IDRegistry.genBlockID("oreMagnetite");
Block.createBlock("oreMagnetite", [
	{name: "Magnetite Ore", texture: [["MAGNETITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreMagnetite, "stone", 3, true);
Block.setDestroyLevel("oreMagnetite", 3);


IDRegistry.genBlockID("oreIron");
Block.createBlock("oreIron", [
	{name: "Iron Ore", texture: [["IRON_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreIron, "stone", 3, true);
Block.setDestroyLevel("oreIron", 3);


IDRegistry.genBlockID("oreCassiterite");
Block.createBlock("oreCassiterite", [
	{name: "Cassiterite Ore", texture: [["CASSITERITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCassiterite, "stone", 2, true);
Block.setDestroyLevel("oreCassiterite", 2);


IDRegistry.genBlockID("oreAntimonite");
Block.createBlock("oreAntimonite", [
	{name: "Antimonite Ore", texture: [["ANTIMONITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreAntimonite, "stone", 3, true);
Block.setDestroyLevel("oreAntimonite", 3);


IDRegistry.genBlockID("oreTetrahedrite");
Block.createBlock("oreTetrahedrite", [
	{name: "Tetrahedrite Ore", texture: [["TETRAHEDRITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreTetrahedrite, "stone", 3, true);
Block.setDestroyLevel("oreTetrahedrite", 3);


IDRegistry.genBlockID("oreGalena");
Block.createBlock("oreGalena", [
	{name: "Galena Ore", texture: [["GALENA_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreGalena, "stone", 4, true);
Block.setDestroyLevel("oreGalena", 4);


IDRegistry.genBlockID("oreSilver");
Block.createBlock("oreSilver", [
	{name: "Silver Ore", texture: [["SILVER_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreSilver, "stone", 3, true);
Block.setDestroyLevel("oreSilver", 3);


IDRegistry.genBlockID("oreCoal");
Block.createBlock("oreCoal", [
	{name: "Coal Ore", texture: [["COAL_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCoal, "stone", 1, true);
Block.setDestroyLevel("oreCoal", 1);


IDRegistry.genBlockID("oreLigniteCoal");
Block.createBlock("oreLigniteCoal", [
	{name: "Lignite Coal Ore", texture: [["LIGNITE_COAL_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLigniteCoal, "stone", 1, true);
Block.setDestroyLevel("oreLigniteCoal", 1);


IDRegistry.genBlockID("oreLazurite");
Block.createBlock("oreLazurite", [
	{name: "Lazurite Ore", texture: [["LAZURITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLazurite, "stone", 2, true);
Block.setDestroyLevel("oreLazurite", 2);


IDRegistry.genBlockID("oreLapisLazuli");
Block.createBlock("oreLapisLazuli", [
	{name: "Lapis-Lazuli Ore", texture: [["LAPIS-LAZULI_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLapisLazuli, "stone", 2, true);
Block.setDestroyLevel("oreLapisLazuli", 2);


IDRegistry.genBlockID("oreSodalite");
Block.createBlock("oreSodalite", [
	{name: "Sodalite Ore", texture: [["SODALITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreSodalite, "stone", 2, true);
Block.setDestroyLevel("oreSodalite", 2);


IDRegistry.genBlockID("oreCalcite");
Block.createBlock("oreCalcite", [
	{name: "Calcite Ore", texture: [["CALCITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCalcite, "stone", 2, true);
Block.setDestroyLevel("oreCalcite", 2);


IDRegistry.genBlockID("oreRedstone");
Block.createBlock("oreRedstone", [
	{name: "Redstone Ore", texture: [["REDSTONE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreRedstone, "stone", 3, true);
Block.setDestroyLevel("oreRedstone", 3);


IDRegistry.genBlockID("oreCinnabar");
Block.createBlock("oreCinnabar", [
	{name: "Cinnabar Ore", texture: [["CINNABAR_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCinnabar, "stone", 2, true);
Block.setDestroyLevel("oreCinnabar", 2);

IDRegistry.genBlockID("oreRuby");
Block.createBlock("oreRuby", [
	{name: "Ruby Ore", texture: [["RUBY_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreRuby, "stone", 3, true);
Block.setDestroyLevel("oreRuby", 3);


IDRegistry.genBlockID("oreDiamond");
Block.createBlock("oreDiamond", [
	{name: "Diamond Ore", texture: [["DIAMOND_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreDiamond, "stone", 3, true);
Block.setDestroyLevel("oreDiamond", 3);


IDRegistry.genBlockID("oreGraphite");
Block.createBlock("oreGraphite", [
	{name: "Graphite Ore", texture: [["GRAPHITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreGraphite, "stone", 3, true);
Block.setDestroyLevel("oreGraphite", 3);


IDRegistry.genBlockID("oreGold");
Block.createBlock("oreGold", [
	{name: "Gold Ore", texture: [["GOLD_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreGold, "stone", 3, true);
Block.setDestroyLevel("oreGold", 3);
// IC ores
Block.createBlock("oreCopper", [
	{name: "Copper Ore", texture: [["COPPER_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.setDestroyLevel("oreCopper", 2);

Block.createBlock("oreTin", [
	{name: "Tin Ore", texture: [["TIN_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.setDestroyLevel("oreTin", 2);

Block.createBlock("oreLead", [
	{name: "Lead Ore", texture: [["LEAD_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.setDestroyLevel("oreLead", 2);

ICore.Ore.copper_ore = false;
ICore.Ore.tin_ore = false;
ICore.Ore.lead_ore = false;