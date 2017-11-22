Translation.addTranslation("Steam Forge Hammer", {ru: "Паровой Кузнечный Молот",  zh: "蒸汽锻锤"});

IDRegistry.genBlockID("SteamForgeHammer");
Block.createBlockWithRotation("SteamForgeHammer", [
{name: "Steam Forge Hammer", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_HAMMER", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0],], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamForgeHammer, count: 1, data: 0}, [
		"pdp",
		"pcp",
		"pnp"
	], ['c', BlockID.BronzeHull, 0, 'p', BlockID.SmallBronzeFluidPipe, 0, 'd', 33, 0, 'n', 145, 0]);
});

var guiSteamForgeHammer = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Steam Forge Hammer"}},
        inventory: {standart: true},
        background: { bitmap: "BronzeBG"}
    },
	params: {

        

               slot: "BronzeSlot",

               invSlot: "BronzeSlot",
     
          
     },

    
    drawing: [
            {type: "bitmap", x: 530, y: 150, bitmap: "BronzeHammerBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
	
    
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotHammer"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 3, value: 0, bitmap: "BronzeHammerScale", scale: 3.2},
    }
});

Callback.addCallback("PreLoaded", function(){
	ICore.Recipe.registerRecipesFor("forgehammer",{
	   "BlockID.oreLigniteCoal": {id: ItemID.Lignite, count: 1, data: 0},
       "BlockID.oreCoal": {id: ItemID.CrushedCoalOre, count: 1, data: 0},
       "BlockID.oreGold": {id: ItemID.CrushedGoldOre, count: 1, data: 0},
       "BlockID.oreDiamond": {id: ItemID.CrushedDiamondOre, count: 1, data: 0},
       "BlockID.oreRedstone": {id: ItemID.CrushedRedstoneOre, count: 5, data: 0},
       "BlockID.oreLapisLazuli": {id: 351, count: 6, data: 4},
        "ItemID.CrushedLapisLazuliOre": {id: ItemID.ImpureLapisLazuliDust, count: 1, data: 0},
	    "ItemID.CrushedRedstoneOre": {id: ItemID.ImpureRedstoneDust, count: 1, data: 0},
	    "ItemID.CrushedLigniteOre": {id: ItemID.ImpureLigniteDust, count: 1, data: 0},
	    "ItemID.CrushedCoalOre": {id: ItemID.ImpureCoalDust, count: 1, data: 0},
	    "ItemID.CrushedEmeraldOre": {id: ItemID.ImpureEmeraldDust, count: 1, data: 0},
	    "ItemID.CrushedDiamondOre": {id: ItemID.ImpureDiamondDust, count: 1, data: 0},
	    "ItemID.CrushedGoldOre": {id: ItemID.ImpureGoldDust, count: 1, data: 0}, "ItemID.CrushedVanadiumMagnetiteOre": {id: ItemID.ImpureVanadiumMagnetiteDust, count: 1, data: 0},
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
	    "ItemID.PerfectDiamond": {id: ItemID.FlawlessDiamond, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.FlawlessDiamond": {id: 264, count: 2, data: 0, ingredientCount: 1},
	    "264": {id: ItemID.DefectiveDiamond, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.DefectiveDiamond": {id: ItemID.SplitDiamond, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.PerfectEmerald": {id: ItemID.FlawlessEmerald, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.FlawlessEmerald": {id: 388, count: 2, data: 0, ingredientCount: 1},
	    "388": {id: ItemID.DefectiveEmerald, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.DefectiveEmerald": {id: ItemID.SplitEmerald, count: 2, data: 0, ingredientCount: 1},
	    "BlockID.oreVanadiumMagnetite": {id: ItemID.CrushedVanadiumMagnetiteOre, count: 1, data: 0},
	    "BlockID.oreMagnetite": {id: ItemID.CrushedMagnetiteOre, count: 1, data: 0},
	    "BlockID.oreGalena": {id: ItemID.CrushedGalenaOre, count: 1, data: 0},
	    "BlockID.orePyrite": {id: ItemID.CrushedPyriteOre, count: 1, data: 0},
	    "BlockID.oreChalcopyrite": {id: ItemID.CrushedChalcopyriteOre, count: 1, data: 0},
	    "BlockID.oreAntimonite": {id: ItemID.CrushedAntimonyOre, count: 1, data: 0},
	    "BlockID.oreTetrahedrite": {id: ItemID.CrushedTetrahedriteOre, count: 1, data: 0},
	    "BlockID.oreCassiterite": {id: ItemID.CrushedCassiteriteOre, count: 2, data: 0},
	    "BlockID.oreMalachite": {id: ItemID.CrushedMalachiteOre, count: 1, data: 0},
	    "BlockID.oreBandedIron": {id: ItemID.CrushedBandedIronOre, count: 1, data: 0},
	    "BlockID.oreYellowLimonite": {id: ItemID.CrushedYellowLimoniteOre, count: 1, data: 0},
	    "BlockID.oreBrownLimonite": {id: ItemID.CrushedBrownLimoniteOre, count: 1, data: 0},
	    "BlockID.oreIron": {id: ItemID.CrushedIronOre, count: 1, data: 0},
	    "BlockID.oreCopper": {id: ItemID.CrushedCopperOre, count: 1, data: 0},
	    "BlockID.oreLead": {id: ItemID.CrushedLeadOre, count: 1, data: 0},
	    "BlockID.oreTin": {id: ItemID.CrushedTinOre, count: 1, data: 0},
		"BlockID.oreSilver": {id: ItemID.CrushedSilverOre, count: 1, data: 0},	
		"ItemID.AntimonyIngot": {id: ItemID.AntimonyPlate, count: 2, data: 0, ingredientCount: 3},
		"ItemID.BronzeIngot": {id: ItemID.BronzePlate, count: 2, data: 0, ingredientCount: 3},
		"266": {id: ItemID.GoldPlate, count: 2, data: 0, ingredientCount: 3},
		"265": {id: ItemID.IronPlate, count: 2, data: 0, ingredientCount: 3},
		"ItemID.CopperIngot": {id: ItemID.CopperPlate, count: 2, data: 0, ingredientCount: 3},
		"ItemID.TinIngot": {id: ItemID.TinPlate, count: 2, data: 0, ingredientCount: 3},
		"ItemID.BronzeIngot": {id: ItemID.BronzePlate, count: 2, data: 0, ingredientCount: 3},
		"ItemID.SteelIngot": {id: ItemID.SteelPlate, count: 2, data: 0, ingredientCount: 3},
		"ItemID.LeadIngot": {id: ItemID.LeadPlate, count: 2, data: 0, ingredientCount: 3},
		"ItemID.SilverIngot": {id: ItemID.SilverPlate, count: 2, data: 0, ingredientCount: 3}
	}, true);
	
	
});

SteamMachineRegistry.register(BlockID.SteamForgeHammer, {
	defaultValues: {
		energy_consumption: 32,
		work_time: 60,
		progress: 0,
		gazLevel: 0,
		scaleprogress: 0
	},
	
	getGuiScreen: function(){
		return guiSteamForgeHammer;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("forgehammer", sourceSlot.id);
        if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount)){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.data.steam >= this.data.energy_consumption){
					this.data.steam -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;

this.data.scaleprogress += 1/this.data.work_time;
					if (this.data.scaleprogress >= 1)
					{
						this.data.scaleprogress = 0;
					}
				}else{
            this.data.progress = 0;
        }
				if(this.data.progress >= 1 && this.data.gazLevel == 0){
                    sourceSlot.count -= result.ingredientCount || 1;
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
		    this.data.scaleprogress = 0;
        }
		this.container.setScale("progressScale", this.data.scaleprogress);
	},
					
	getEnergyStorage: function(){
		return 16000;
	},
	energyTick: SteamMachineRegistry.basicEnergyReceiveFunc	
});
