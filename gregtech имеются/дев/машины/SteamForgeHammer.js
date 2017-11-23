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
       "BlockID.oreCoal": {id: ItemID.crushedoreCoal, count: 1, data: 0},
       "BlockID.oreGold": {id: ItemID.crushedoreGold, count: 1, data: 0},
       "BlockID.oreDiamond": {id: ItemID.crushedoreDiamond, count: 1, data: 0},
       "BlockID.oreRedstone": {id: ItemID.crushedoreRedstone, count: 5, data: 0},
       "BlockID.oreLapisLazuli": {id: 351, count: 6, data: 4},
        "ItemID.crushedoreLapisLazuli": {id: ItemID.impuredustLapisLazuli, count: 1, data: 0},
	    "ItemID.crushedoreRedstone": {id: ItemID.impuredustRedstone, count: 1, data: 0},
	    "ItemID.crushedoreLignite": {id: ItemID.impuredustLignite, count: 1, data: 0},
	    "ItemID.crushedoreCoal": {id: ItemID.impuredustCoal, count: 1, data: 0},
	    "ItemID.crushedoreEmerald": {id: ItemID.impuredustEmerald, count: 1, data: 0},
	    "ItemID.crushedoreDiamond": {id: ItemID.impuredustDiamond, count: 1, data: 0},
	    "ItemID.crushedoreGold": {id: ItemID.impuredustGold, count: 1, data: 0}, "ItemID.CrushedVanadiumMagnetiteOre": {id: ItemID.impuredustVanadiumMagnetite, count: 1, data: 0},
	    "ItemID.crushedoreMagnetite": {id: ItemID.impuredustMagnetite, count: 1, data: 0},
	    "ItemID.crushedoreGalena": {id: ItemID.impuredustGalena, count: 1, data: 0},
	    "ItemID.crushedorePyrite": {id: ItemID.impuredustPyrite, count: 1, data: 0},
	    "ItemID.crushedoreChalcopyrite": {id: ItemID.impuredustChalcopyrite, count: 1, data: 0},
	    "ItemID.crushedoreAntimony": {id: ItemID.impuredustAntimony, count: 1, data: 0},
	    "ItemID.crushedoreTetrahedrite": {id: ItemID.impuredustTetrahedrite, count: 1, data: 0},
	    "ItemID.crushedoreCassiterite": {id: ItemID.impuredustCassiterite, count: 1, data: 0},
	    "ItemID.crushedoreMalachite": {id: ItemID.impuredustMalachite, count: 1, data: 0},
        "ItemID.crushedoreBandedIron": {id: ItemID.impuredustBandedIron, count: 1, data: 0},
	    "ItemID.crushedoreYellowLimonite": {id: ItemID.impuredustYellowLimonite, count: 1, data: 0},
	    "ItemID.crushedoreBrownLimonite": {id: ItemID.impuredustBrownLimonite, count: 1, data: 0},
	    "ItemID.crushedoreIron": {id: ItemID.impuredustIron, count: 1, data: 0},
	    "ItemID.crushedoreCopper": {id: ItemID.impuredustCopper, count: 1, data: 0},
	    "ItemID.crushedoreLead": {id: ItemID.impuredustLead, count: 1, data: 0},
	    "ItemID.crushedoreTin": {id: ItemID.impuredustTin, count: 1, data: 0},
	    "ItemID.crushedoreSilver": {id: ItemID.impuredustSilver, count: 1, data: 0},
	    "ItemID.perfectDiamond": {id: ItemID.flawlessDiamond, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.flawlessDiamond": {id: 264, count: 2, data: 0, ingredientCount: 1},
	    "264": {id: ItemID.defectiveDiamond, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.defectiveDiamond": {id: ItemID.splitDiamond, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.perfectEmerald": {id: ItemID.flawlessEmerald, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.flawlessEmerald": {id: 388, count: 2, data: 0, ingredientCount: 1},
	    "388": {id: ItemID.defectiveEmerald, count: 2, data: 0, ingredientCount: 1},
	    "ItemID.defectiveEmerald": {id: ItemID.splitEmerald, count: 2, data: 0, ingredientCount: 1},
	    "BlockID.oreVanadiumMagnetite": {id: ItemID.crushedoreVanadiumMagnetite, count: 1, data: 0},
	    "BlockID.oreMagnetite": {id: ItemID.crushedoreMagnetite, count: 1, data: 0},
	    "BlockID.oreGalena": {id: ItemID.crushedoreGalena, count: 1, data: 0},
	    "BlockID.orePyrite": {id: ItemID.crushedorePyrite, count: 1, data: 0},
	    "BlockID.oreChalcopyrite": {id: ItemID.crushedoreChalcopyrite, count: 1, data: 0},
	    "BlockID.oreAntimonite": {id: ItemID.crushedoreAntimony, count: 1, data: 0},
	    "BlockID.oreTetrahedrite": {id: ItemID.crushedoreTetrahedrite, count: 1, data: 0},
	    "BlockID.oreCassiterite": {id: ItemID.crushedoreCassiterite, count: 2, data: 0},
	    "BlockID.oreMalachite": {id: ItemID.crushedoreMalachite, count: 1, data: 0},
	    "BlockID.oreBandedIron": {id: ItemID.crushedoreBandedIron, count: 1, data: 0},
	    "BlockID.oreYellowLimonite": {id: ItemID.crushedoreYellowLimonite, count: 1, data: 0},
	    "BlockID.oreBrownLimonite": {id: ItemID.crushedoreBrownLimonite, count: 1, data: 0},
	    "BlockID.oreIron": {id: ItemID.crushedoreIron, count: 1, data: 0},
	    "BlockID.oreCopper": {id: ItemID.crushedoreCopper, count: 1, data: 0},
	    "BlockID.oreLead": {id: ItemID.crushedoreLead, count: 1, data: 0},
	    "BlockID.oreTin": {id: ItemID.crushedoreTin, count: 1, data: 0},
		"BlockID.oreSilver": {id: ItemID.crushedoreSilver, count: 1, data: 0},	
		"ItemID.ingotAntimony": {id: ItemID.plateAntimony, count: 2, data: 0, ingredientCount: 3},
		"ItemID.ingotBronze": {id: ItemID.plateBronze, count: 2, data: 0, ingredientCount: 3},
		"266": {id: ItemID.plateGold, count: 2, data: 0, ingredientCount: 3},
		"265": {id: ItemID.plateIron, count: 2, data: 0, ingredientCount: 3},
		"ItemID.ingotCopper": {id: ItemID.plateCopper, count: 2, data: 0, ingredientCount: 3},
		"ItemID.ingotTin": {id: ItemID.plateTin, count: 2, data: 0, ingredientCount: 3},
		"ItemID.ingotBronze": {id: ItemID.plateBronze, count: 2, data: 0, ingredientCount: 3},
		"ItemID.ingotSteel": {id: ItemID.plateSteel, count: 2, data: 0, ingredientCount: 3},
		"ItemID.ingotLead": {id: ItemID.plateLead, count: 2, data: 0, ingredientCount: 3},
		"ItemID.ingotSilver": {id: ItemID.plateSilver, count: 2, data: 0, ingredientCount: 3}
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
