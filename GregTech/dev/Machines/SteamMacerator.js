Translation.addTranslation("Steam Macerator", {ru: "Паровой дробитель",  zh: "污水蒸汽"});

IDRegistry.genBlockID("SteamMacerator");
Block.createBlockWithRotation("SteamMacerator", [
{name: "Steam Macerator", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_DROBTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_DROBFRONT", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamMacerator, count: 1, data: 0}, [
		"dpd",
		"pcp",
		"gpg"
	], ['c', BlockID.BronzeHull, 0, 'p', BlockID.SmallBronzeFluidPipe, 0, 'd', 264, 0, 'g', 33, 0]);
});

var guiSteamMacerator = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Steam Macerator"}},
        inventory: {standart: true},
        background: { bitmap: "BronzeBG"}
    },
	params: {       
               slot: "BronzeSlot",
               invSlot: "BronzeSlot"              
     },

    
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeMaceratorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
	
    
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap: "bronzeSlotMacerator"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "BronzeMaceratorScale", scale: 3.2},
    }
});

Callback.addCallback("PreLoaded", function(){

ICore.Recipe.registerRecipesFor("macerator",{
	"BlockID.oreLigniteCoal": {id: ItemID.CrushedLigniteOre, count: 2, data: 0},
	"BlockID.oreCoal": {id: ItemID.CrushedCoalOre, count: 2, data: 0},
	"BlockID.oreGold": {id: ItemID.CrushedGoldOre, count: 2, data: 0},
	"BlockID.oreDiamond": {id: ItemID.CrushedDiamondOre, count: 2, data: 0},
	"BlockID.oreRedstone": {id: ItemID.CrushedRedstoneOre, count: 10, data: 0},
	"BlockID.oreLapisLazuli": {id: ItemID.CrushedLapisLazuliOre, count: 12, data: 0},
	"57": {id: ItemID.DiamondDust, count: 9, data: 0},
	"133": {id: ItemID.EmeraldDust, count: 9, data: 0},
	"173": {id: ItemID.CoalDust, count: 9, data: 0},
	"41": {id: ItemID.GoldDust, count: 9, data: 0},
	"42": {id: ItemID.IronDust, count: 9, data: 0},
	"152": {id: 331, count: 9, data: 0},
	"BlockID.SilverBlock": {id: ItemID.SilverDust, count: 9, data: 0},
	"BlockID.SteelBlock": {id: ItemID.SteelDust, count: 9, data: 0},
	"BlockID.TinBlock": {id: ItemID.TinDust, count: 9, data: 0},
	"BlockID.CopperBlock": {id: ItemID.CopperDust, count: 9, data: 0},
	"BlockID.BronzeBlock": {id: ItemID.BronzeDust, count: 9, data: 0},
	"BlockID.LeadBlock": {id: ItemID.LeadDust, count: 9, data: 0},
	"22": {id: ItemID.LapisLazuliDust, count: 9, data: 4},

	"BlockID.BronzeHull": {id: ItemID.BronzeDust, count: 8, data: 0},
	"BlockID.BrikedBronzeHull": {id: ItemID.BronzeDust, count: 5, data: 0},
	"BlockID.BronzePlatedBricks": {id: ItemID.BronzeDust, count: 6, data: 0},
	"BlockID.BronzePlatedBlastFurnase": {id: ItemID.BronzeDust, count: 4, data: 0},
	"BlockID.SteamMacerator": {id: ItemID.BronzeDust, count: 12, data: 0},
	"BlockID.SteamForgeHammer": {id: ItemID.BronzeDust, count: 14, data: 0},
	"BlockID.SteamExtractor": {id: ItemID.BronzeDust, count: 14, data: 0},
	"BlockID.SteamCompressor": {id: ItemID.BronzeDust, count: 14, data: 0},
	"BlockID.SteamFurnace": {id: ItemID.BronzeDust, count: 12, data: 0},
	"BlockID.SteamAlloySmelter": {id: ItemID.BronzeDust, count: 11, data: 0},
	"BlockID.SmallBoiler": {id: ItemID.BronzeDust, count: 5, data: 0},
	"BlockID.HighPressureCoalBoiler": {id: ItemID.SteelDust, count: 5, data: 0},
	"ItemID.LongSteelRod": {id: ItemID.SteelDust, count: 1, data: 0},
	"ItemID.LongBronzeRod": {id: ItemID.BronzeDust, count: 1, data: 0},
	"ItemID.LongIronRod": {id: ItemID.IronDust, count: 1, data: 0},
	"ItemID.LongGoldRod": {id: ItemID.GoldDust, count: 1, data: 0},
	"ItemID.LongSilverRod": {id: ItemID.SilverDust, count: 1, data: 0},
	"ItemID.LongLeadRod": {id: ItemID.LeadDust, count: 1, data: 0},
	"ItemID.LongTinRod": {id: ItemID.TinDust, count: 1, data: 0},
	"ItemID.LongCopperRod": {id: ItemID.CopperDust, count: 1, data: 0},
	"ItemID.LongAntimonyRod": {id: ItemID.AntimonyDust, count: 1, data: 0},
	"ItemID.SteelBolt": {id: ItemID.SmallPileSteelDust, count: 1, data: 0},
	"ItemID.BronzeBolt": {id: ItemID.SmallPileBronzeDust, count: 1, data: 0},
	"ItemID.IronBolt": {id: ItemID.SmallPileIronDust, count: 1, data: 0},
	"ItemID.GoldBolt": {id: ItemID.SmallPileGoldDust, count: 1, data: 0},
	"ItemID.SilverBolt": {id: ItemID.SmallPileSilverDust, count: 1, data: 0},
	"ItemID.LeadBolt": {id: ItemID.SmallPileLeadDust, count: 1, data: 0},
	"ItemID.TinBolt": {id: ItemID.SmallPileTinDust, count: 1, data: 0},
	"ItemID.CopperBolt": {id: ItemID.SmallPileCopperDust, count: 1, data: 0},
	"ItemID.AntimonyBolt": {id: ItemID.SmallPileAntimonyDust, count: 1, data: 0},
	"ItemID.SteelRod": {id: ItemID.SmallPileSteelDust, count: 2, data: 0},
	"ItemID.BronzeRod": {id: ItemID.SmallPileBronzeDust, count: 2, data: 0},
	"ItemID.IronRod": {id: ItemID.SmallPileIronDust, count: 2, data: 0},
	"ItemID.GoldRod": {id: ItemID.SmallPileGoldDust, count: 2, data: 0},
	"ItemID.SilverRod": {id: ItemID.SmallPileSilverDust, count: 2, data: 0},
	"ItemID.LeadRod": {id: ItemID.SmallPileLeadDust, count: 2, data: 0},
	"ItemID.TinRod": {id: ItemID.SmallPileTinDust, count: 2, data: 0},
	"ItemID.CopperRod": {id: ItemID.SmallPileCopperDust, count: 2, data: 0},
	"ItemID.AntimonyRod": {id: ItemID.SmallPileAntimonyDust, count: 2, data: 0},
	"ItemID.RedstonePlate": {id: 331, count: 1, data: 0},
	"ItemID.EmeraldPlate": {id: ItemID.EmeraldDust, count: 1, data: 0},
	"ItemID.SteelPlate": {id: ItemID.SteelDust, count: 1, data: 0},
	"ItemID.BronzePlate": {id: ItemID.BronzeDust, count: 1, data: 0},
	"ItemID.IronPlate": {id: ItemID.IronDust, count: 1, data: 0},
	"ItemID.GoldPlate": {id: ItemID.GoldDust, count: 1, data: 0},
	"ItemID.SilverPlate": {id: ItemID.SilverDust, count: 1, data: 0},
	"ItemID.LeadPlate": {id: ItemID.LeadDust, count: 1, data: 0},
	"ItemID.TinPlate": {id: ItemID.TinDust, count: 1, data: 0},
	"ItemID.CopperPlate": {id: ItemID.CopperDust, count: 1, data: 0},
	"ItemID.AntimonyPlate": {id: ItemID.AntimonyDust, count: 1, data: 0},
	"ItemID.DiamondPlate": {id: ItemID.DiamondDust, count: 1, data: 0},
	"ItemID.LapisLazuliPlate": {id: ItemID.LapisLazuliDust, count: 1, data: 0},
	"388": {id: ItemID.EmeraldDust, count: 1, data: 0},
	"ItemID.SteelIngot": {id: ItemID.SteelDust, count: 1, data: 0},
	"ItemID.BronzeIngot": {id: ItemID.BronzeDust, count: 1, data: 0},
	"265": {id: ItemID.IronDust, count: 1, data: 0},
	"266": {id: ItemID.GoldDust, count: 1, data: 0},
	"ItemID.SilverIngot": {id: ItemID.SilverDust, count: 1, data: 0},
	"ItemID.LeadIngot": {id: ItemID.LeadDust, count: 1, data: 0},
	"ItemID.TinIngot": {id: ItemID.TinDust, count: 1, data: 0},
	"ItemID.CopperIngot": {id: ItemID.CopperDust, count: 1, data: 0},
	"ItemID.AntimonyIngot": {id: ItemID.AntimonyDust, count: 1, data: 0},
	"BlockID.oreVanadiumMagnetite": {id: ItemID.CrushedVanadiumMagnetiteOre, count: 2, data: 0},
	"BlockID.oreMagnetite": {id: ItemID.CrushedMagnetiteOre, count: 2, data: 0},
	"BlockID.oreGalena": {id: ItemID.CrushedGalenaOre, count: 2, data: 0},
	"BlockID.orePyrite": {id: ItemID.CrushedPyriteOre, count: 2, data: 0},
	"BlockID.oreChalcopyrite": {id: ItemID.CrushedChalcopyriteOre, count: 2, data: 0},
	"BlockID.oreAntimonite": {id: ItemID.CrushedAntimonyOre, count: 2, data: 0},
	"BlockID.oreTetrahedrite": {id: ItemID.CrushedTetrahedriteOre, count: 2, data: 0},
	"BlockID.oreCassiterite": {id: ItemID.CrushedCassiteriteOre, count: 4, data: 0},
	"BlockID.oreMalachite": {id: ItemID.CrushedMalachiteOre, count: 2, data: 0},
	"BlockID.oreBandedIron": {id: ItemID.CrushedBandedIronOre, count: 2, data: 0},
	"BlockID.oreYellowLimonite": {id: ItemID.CrushedYellowLimoniteOre, count: 2, data: 0},
	"BlockID.oreBrownLimonite": {id: ItemID.CrushedBrownLimoniteOre, count: 2, data: 0},
	"BlockID.oreIron": {id: ItemID.CrushedIronOre, count: 2, data: 0},
	"BlockID.oreCopper": {id: ItemID.CrushedCopperOre, count: 2, data: 0},
	"BlockID.oreLead": {id: ItemID.CrushedLeadOre, count: 2, data: 0},
	"BlockID.oreTin": {id: ItemID.CrushedTinOre, count: 2, data: 0},
	"BlockID.oreSilver": {id: ItemID.CrushedSilverOre, count: 2, data: 0},
			
	"ItemID.CrushedLapisLazuliOre": {id: ItemID.ImpureLapisLazuliDust, count: 1, data: 0},
	"ItemID.CrushedRedstoneOre": {id: ItemID.ImpureRedstoneDust, count: 1, data: 0},
	"ItemID.CrushedLigniteOre": {id: ItemID.ImpureLigniteDust, count: 1, data: 0},
	"ItemID.CrushedCoalOre": {id: ItemID.ImpureCoalDust, count: 1, data: 0},
	"ItemID.CrushedEmeraldOre": {id: ItemID.ImpureEmeraldDust, count: 1, data: 0},
	"ItemID.CrushedDiamondOre": {id: ItemID.ImpureDiamondDust, count: 1, data: 0},
	"ItemID.CrushedGoldOre": {id: ItemID.ImpureGoldDust, count: 1, data: 0},
	"ItemID.CrushedVanadiumMagnetiteOre": {id: ItemID.ImpureVanadiumMagnetiteDust, count: 1, data: 0},
	"ItemID.CrushedMagnetiteOre": {id: ItemID.ImpureMagnetiteDust, count: 1, data: 0},
	"ItemID.CrushedGalenaOre": {id: ItemID.ImpureGalenaDust, count: 1, data: 0},
	"ItemID.CrushedPyriteOre": {id: ItemID.ImpurePyriteDust, count: 1, data: 0},
	"ItemID.CrushedChalcopyriteOre": {id: ItemID.ImpureChalcopyriteDust, count: 1, data: 0},
	"ItemID.CrushedAntimonyOre": {id: ItemID.ImpureAntimonyDust, count: 1, data: 0},
	"ItemID.CrushedTetrahedriteOre": {id: ItemID.ImpureTetrahedriteDust, count: 1, data: 0},
	"ItemID.CrushedCassiteriteOre": {id: ItemID.ImpureCassiteriteDust, count: 1, data: 0},
	"ItemID.CrushedMalachiteOre": {id: ItemID.ImpureMalachiteDust, count: 1, data: 0},
	"ItemID.CrushedBandedIronOre": {id: ItemID.ImpureBandedIronDust, count: 1, data: 0},
	"ItemID.CrushedYellowLimoniteOre": {id: ItemID.ImpureYellowLimoniteDust, count: 1, data: 0},
	"ItemID.CrushedBrownLimoniteOre": {id: ItemID.ImpureBrownLimoniteDust, count: 1, data: 0},
	"ItemID.CrushedIronOre": {id: ItemID.ImpureIronDust, count: 1, data: 0},
	"ItemID.CrushedCopperOre": {id: ItemID.ImpureCopperDust, count: 1, data: 0},
	"ItemID.CrushedLeadOre": {id: ItemID.ImpureLeadDust, count: 1, data: 0},
	"ItemID.CrushedTinOre": {id: ItemID.ImpureTinDust, count: 1, data: 0},
	"ItemID.CrushedSilverOre": {id: ItemID.ImpureSilverDust, count: 1, data: 0},
	22: {id: ItemID.LapisLazuliDust, count: 9, data: 0},
	173: {id: ItemID.CoalDust, count: 9, data: 0},
	"263:0": {id: ItemID.CoalDust, count: 1, data: 0},
	264: {id: ItemID.DiamondDust, count: 1, data: 0},
	"351:4": {id: ItemID.LapisLazuliDust, count: 1, data: 0},
	1: {id: 4, count: 1, data: 0},
	4: {id: 12, count: 1, data: 0},
	13: {id: 318, count: 1, data: 0},
	35: {id: 287, count: 2, data: 0},
	89: {id: 348, count: 4, data: 0},
	155: {id: 406, count: 4, data: 0},
	156: {id: 406, count: 6, data: 0},
	352: {id: 351, count: 5, data: 15}, 
	369: {id: 377, count: 5, data: 0}
}, true);


});

SteamMachineRegistry.register(BlockID.SteamMacerator, {
	defaultValues: {
		energy_consumption: 4,
		work_time: 800,
		progress: 0,
		gazLevel: 0
	},
	
	getGuiScreen: function(){
		return guiSteamMacerator;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("macerator", sourceSlot.id, sourceSlot.data);
        if(result && sourceSlot.count >= 1){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.data.steam >= this.data.energy_consumption){
					this.data.steam -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;
				}else{
            this.data.progress = 0;
        }
				if(this.data.progress >= 1 && this.data.gazLevel == 0){
                    sourceSlot.count -= 1;
                    resultSlot.id = result.id;
                    resultSlot.data = result.data;
                    resultSlot.count += result.count;
                    this.container.validateAll();
                    this.data.progress = 0;
					this.data.scaleprogress = 0;
                }
            }
        }
        else {
            this.data.progress = 0;
        }
		this.container.setScale("progressScale", this.data.progress);
	},
					
	getEnergyStorage: function(){
		return 16000;
	},
	energyTick: SteamMachineRegistry.basicEnergyReceiveFunc	
});
