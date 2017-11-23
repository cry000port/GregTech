Translation.addTranslation("Simple Solar Boiler", {ru: "Простой солнечный бойлер",  zh: "简单的太阳能锅炉"});

IDRegistry.genBlockID("SimpleSolarBoiler");
Block.createBlockWithRotation("SimpleSolarBoiler", [
{name: "Simple Solar Boiler", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE_SOLAR", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0],], inCreative: true}
]);

Block.registerDropFunction("SimpleSolarBoiler", function(){
	return [[BlockID.SimpleSolarBoiler, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SimpleSolarBoiler, count: 1, data: 0}, [
		"ggg",
		"sss",
		"pcp"
	], ['g', 20, 0, 's', ItemID.plateSilver, 0, 'c', BlockID.BrikedBronzeHull, 0, 'p', BlockID.SmallBronzeFluidPipe, 0]);
});

var guiSimpleSolarBoiler = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Simple Solar Boiler"}},
        inventory: {standart: true},
        background: { bitmap: "BronzeBG"}
    },
	params: {

        

               slot: "BronzeSlot",

               invSlot: "BronzeSlot"
     
          

     },

    
    drawing: [
            {type: "bitmap", x: 446, y: 200, bitmap: "FuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "BronzeFuelBG", scale: 3.2},  
 {type: "bitmap", x: 590, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
 {type: "bitmap", x: 650, y: 140, bitmap: "BronzeFuelBG", scale: 3.2}, 
{type: "bitmap", x: 714, y: 200, bitmap: "BronzeFuelScaleBG", scale: 3.2},
{type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
    ],
	
    
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap: "bronzeSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap: "bronzeSlotOUT"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0, bitmap: "BronzeFuelScale", scale: 3.2},
    }
});


SteamMachineRegistry.register(BlockID.SimpleSolarBoiler, {
	defaultValues: {
		water: 0,
		fuel: 0
	},
	
	getGuiScreen: function(){
		return guiSimpleSolarBoiler;
	},
	
	
	tick: function(){
		var luidSlot = this.container.getSlot("slotWater");
		var luidSlotNull = this.container.getSlot("slotNull");
		var energyStorage = this.getEnergyStorage();		
		
		if (luidSlot.id == 325 && luidSlot.data == 8 && this.data.water <= 15000 && luidSlotNull.count < 16)
		{
			this.data.water += 1000;
			luidSlot.id = 0;
			luidSlot.data = 0;
			luidSlotNull.id = 325;
			luidSlotNull.count++;
			this.container.validateAll();
		}
		if (luidSlot.id == ItemID.cellWater && this.data.water <= 15000 && luidSlotNull.count < 64)
		{
			this.data.water += 1000;		
			luidSlot.count--;
			luidSlotNull.id = ItemID.cellEmpty;
			luidSlotNull.count++;
			this.container.validateAll();
		}
		if (this.data.water > 0.32 && this.data.fuel >= 100)
		{
			this.data.steam += 7.5;
			this.data.water -= 0.32;
		}
		if(this.data.fuel == 0){ 
         this.data.fuel=20;
		}
		if(World.getLightLevel(this.x, this.y + 1, this.z) == 15 && this.data.fuel < 1000){
			this.data.fuel += 0.0105;
			this.container.setScale("burningScale", 1);
		}
		if(World.getLightLevel(this.x, this.y + 1, this.z) != 15 && this.data.fuel >= 20.04){
			this.data.fuel -= 0.04;
			this.container.setScale("burningScale", 0.1);
		}
		
			this.container.setScale("steamScale", this.data.steam / energyStorage);
				this.container.setScale("fuelScale", this.data.fuel / 1000);
					this.container.setScale("waterScale", this.data.water / 16000);
					
			if(this.data.steam >= 16000)
			{
				this.data.steam -= 1000;
			}
	},
	
	
	isGenerator: function() {
		return true;
	},
	
	getEnergyStorage: function(){
		return 16000;
	},
	energyTick: function(type, src){
		var output = Math.min(120, this.data.steam);
		this.data.steam += src.add(output) - output;
	}
	
});
