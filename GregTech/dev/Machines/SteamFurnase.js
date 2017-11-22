Translation.addTranslation("Steam Furnace", {ru: "Паровая печь",  zh: "蒸汽式炉"});

IDRegistry.genBlockID("SteamFurnace");
Block.createBlockWithRotation("SteamFurnace", [
{name: "Steam Furnace", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_STEAM_FURNACE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0],], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamFurnace, count: 1, data: 0}, [
		"bbb",
		"bcb",
		"bfb"
	], ['b', BlockID.SmallBronzeFluidPipe, 0, 'c', BlockID.BrikedBronzeHull, 0, 'f', 61, 0]);
});

var guiSteamFurnace = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Steam Furnace"}},
        inventory: {standart: true},
        background: { bitmap: "BronzeBG"}
    },
	params: {
         
               slot: "BronzeSlot",
               invSlot: "BronzeSlot"
     

     },

    
    drawing: [
            {type: "bitmap", x: 530, y: 153, bitmap: "BronzeProgressBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
	
    
    elements: {
        "slotSource": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "BronzeProgressScale", scale: 3.2},
    }
});


SteamMachineRegistry.register(BlockID.SteamFurnace, {
	defaultValues: {
		energy_consumption: 8,
		work_time: 256,
		progress: 0,
		gazLevel: 0
	},
	
	getGuiScreen: function(){
		return guiSteamFurnace;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var result = Recipes.getFurnaceRecipeResult(sourceSlot.id, "iron");
		if(result){
			var resultSlot = this.container.getSlot("slotResult");
			if(resultSlot.id == result.id && resultSlot.data == result.data && resultSlot.count < 64 || resultSlot.id == 0){
				if(this.data.steam >= this.data.energy_consumption){
					this.data.steam -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;
				}else{
            this.data.progress = 0;
        }
				if(this.data.progress >= 1 && this.data.gazLevel == 0){
					sourceSlot.count--;
					resultSlot.id = result.id;
					resultSlot.data = result.data;
					resultSlot.count++;
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
