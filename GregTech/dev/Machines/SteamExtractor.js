Translation.addTranslation("Steam Extractor", {ru: "Паровой экстрактор",  zh: "蒸气提取器"});

IDRegistry.genBlockID("SteamExtractor");
Block.createBlockWithRotation("SteamExtractor", [
{name: "Steam Extractor", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORTOP", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTOR", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZE_EXTRACTORRIGHT", 1],], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamExtractor, count: 1, data: 0}, [
		"ppp",
		"dcg",
		"ppp"
	], ['c', BlockID.BronzeHull, 0, 'p', BlockID.SmallBronzeFluidPipe, 0, 'd', 33, 0, 'g', 20, 0]);
});

var guiSteamExtractor = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Steam Extractor"}},
        inventory: {standart: true},
        background: { bitmap: "BronzeBG"}
    },
	params: {

         

               slot: "BronzeSlot",

               invSlot: "BronzeSlot"
     
          

     },

    
    drawing: [
            {type: "bitmap", x: 530, y: 158, bitmap: "BronzeExtractorBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
	
    
    elements: {
        "slotSource": {type: "slot", x: 441, y: 158, bitmap: "bronzeSlotExtractor"},
		"slotResult": {type: "slot", x: 625, y: 158},		
		"progressScale": {type: "scale", x: 530, y: 158, direction: 0, value: 0, bitmap: "BronzeExtractorScale", scale: 3.2},
		
    }
});

Callback.addCallback("PreLoaded", function(){
ICore.Recipe.addRecipeFor("extractor",
ItemID.latex, {id: ItemID.RubberDust, count: 3, data: 0});ICore.Recipe.addRecipeFor("extractor", "38:4", {id: 351, count: 2, data: 1});  
ICore.Recipe.addRecipeFor("extractor", "38:6", {id: 351, count: 2, data: 7}); 
ICore.Recipe.addRecipeFor("extractor", "175:4", {id: 351, count: 3, data: 1});
ICore.Recipe.addRecipeFor("extractor", "38:8", {id: 351, count: 2, data: 7}); 
ICore.Recipe.addRecipeFor("extractor", "175:5", {id: 351, count: 3, data: 9});	
ICore.Recipe.addRecipeFor("extractor", "38:2", {id: 351, count: 2, data: 13});	
ICore.Recipe.addRecipeFor("extractor", 80, {id: 332, count: 4, data: 0});	 
ICore.Recipe.addRecipeFor("extractor", 47, {id: 340, count: 3, data: 0});	 
ICore.Recipe.addRecipeFor("extractor", "38:7", {id: 351, count: 2, data: 9});   
ICore.Recipe.addRecipeFor("extractor", 45, {id: 336, count: 4, data: 0});  
ICore.Recipe.addRecipeFor("extractor", 175, {id: 351, count: 3, data: 11});  
ICore.Recipe.addRecipeFor("extractor", "38:5", {id: 351, count: 2, data: 14});	
ICore.Recipe.addRecipeFor("extractor", 112, {id: 405, count: 4, data: 0});	 
ICore.Recipe.addRecipeFor("extractor", "38:3", {id: 351, count: 2, data: 7});
ICore.Recipe.addRecipeFor("extractor", 38, {id: 351, count: 2, data: 1});
ICore.Recipe.addRecipeFor("extractor", 37, {id: 351, count: 2, data: 11});	
ICore.Recipe.addRecipeFor("extractor", 82, {id: 337, count: 4, data: 0}); 
ICore.Recipe.addRecipeFor("extractor", "175:1", {id: 351, count: 3, data: 13});		 
});

SteamMachineRegistry.register(BlockID.SteamExtractor, {
	defaultValues: {
		energy_consumption: 4,
		work_time: 800,
		progress: 0,
		gazLevel: 0
	},
	
	getGuiScreen: function(){
		return guiSteamExtractor;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = ICore.Recipe.getRecipeResult("extractor", sourceSlot.id, sourceSlot.data);
		if(result){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count <= 64 - result.count || resultSlot.id == 0){
				if(this.data.steam >= this.data.energy_consumption){
					this.data.steam -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;
				}
				if(this.data.progress >= 1){
					sourceSlot.count--;
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
