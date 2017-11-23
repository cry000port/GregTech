Translation.addTranslation("Steam Compressor", {ru: "Паровой компрессор",  zh: "蒸汽压缩机"});

IDRegistry.genBlockID("SteamCompressor");
Block.createBlockWithRotation("SteamCompressor", [
{name: "Steam Compressor", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSORTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSOR", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_COMPRESSORSIDE", 0]], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamCompressor, count: 1, data: 0}, [
		"ppp",
		"gcg",
		"ppp"
	], ['c', BlockID.BronzeHull, 0, 'p', BlockID.SmallBronzeFluidPipe, 0, 'g', 33, 0]);
});

var guiSteamComressor = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Steam Compressor"}},
        inventory: {standart: true},
        background: { bitmap: "BronzeBG"}
    },
	params: {       
               slot: "BronzeSlot",
               invSlot: "BronzeSlot"              
     },

    
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeCompressorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
	
    
    elements: {
        "slotSource": {type: "slot", x: 441, y: 153, bitmap:"bronzeSlotCompress"},
		"slotResult": {type: "slot", x: 625, y: 153},		
		"progressScale": {type: "scale", x: 530, y: 153, direction: 0, value: 0, bitmap: "BronzeCompressorScale", scale: 3.2},
    }
});

Callback.addCallback("PreLoaded", function(){
ICore.Recipe.addRecipeFor("compressor", ItemID.ingotSilver, {id: BlockID.SilverBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", ItemID.ingotTin, {id: BlockID.TinBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", ItemID.ingotSteel, {id: BlockID.SteelBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", 265, {id: 42, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", ItemID.ingotCopper, {id: BlockID.CopperBlock, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", 377, {id: 369, count: 1, data: 0, ingredientCount: 5});   
ICore.Recipe.addRecipeFor("compressor", ItemID.tinydustCopper, {id: ItemID.dustCopper, count: 1, data: 0, ingredientCount: 9});   
ICore.Recipe.addRecipeFor("compressor", ItemID.tinydustLead, {id: ItemID.dustLead, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", ItemID.tinydustBronze, {id: ItemID.dustBronze, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", 263, {id: 173, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", 406, {id: 155, count: 1, data: 0, ingredientCount: 4});  
ICore.Recipe.addRecipeFor("compressor", ItemID.tinydustSilver, {id: ItemID.dustSilver, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", 264, {id: 57, count: 1, data: 0, ingredientCount: 9}); 
ICore.Recipe.addRecipeFor("compressor", 388, {id: 133, count: 1, data: 0, ingredientCount: 9}); 
ICore.Recipe.addRecipeFor("compressor", ItemID.ingotBronze, {id: BlockID.BronzeBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", 348, {id: 89, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", 12, {id: 24, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", 336, {id: 45, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", 80, {id: 79, count: 1, data: 0, ingredientCount: 1});
ICore.Recipe.addRecipeFor("compressor", 266, {id: 41, count: 1, data: 0, ingredientCount: 9}); 
ICore.Recipe.addRecipeFor("compressor", 331, {id: 152, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", ItemID.ingotLead, {id: BlockID.LeadBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", 337, {id: 82, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", ItemID.tinydustTin, {id: ItemID.dustTin, count: 1, data: 0, ingredientCount: 9}); 
ICore.Recipe.addRecipeFor("compressor", 405, {id: 112, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", 332, {id: 80, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", "351:4", {id: 22, count: 1, data: 0, ingredientCount: 9});
});

SteamMachineRegistry.register(BlockID.SteamCompressor, {
	defaultValues: {
		energy_consumption: 4,
		work_time: 800,
		progress: 0,
		gazLevel: 0
	},
	
	getGuiScreen: function(){
		return guiSteamComressor;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("compressor", sourceSlot.id, sourceSlot.data);
        if(result && (sourceSlot.count >= result.ingredientCount || !result.ingredientCount)){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= Item.getMaxStack(result.id) - result.count || resultSlot.id == 0){
				if(this.data.steam >= this.data.energy_consumption){
					this.data.steam -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;
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
