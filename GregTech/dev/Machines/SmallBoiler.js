Translation.addTranslation("Small Coal Boiler", {ru: "Маленький угольный бойлер",  zh: "小型燃煤锅炉"});

IDRegistry.genBlockID("SmallBoiler");
Block.createBlockWithRotation("SmallBoiler", [
{name: "Small Coal Boiler", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_SMALLBOILER_FRONT", 1], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0],], inCreative: true}
]);

Block.registerDropFunction("SmallBoiler", function(){
	return [[BlockID.SmallBoiler, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SmallBoiler, count: 1, data: 0}, [
		"bbb",
		"b b",
		"cfc"
	], ['b', ItemID.BronzePlate, 0, 'c', 45, 0, 'f', 61, 0]);
});

var guiSmallBoiler = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Small Coal Boiler"}},
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
        "slotWater": {type: "slot", x: 441, y: 132, bitmap:"bronzeSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap:"bronzeSlotOUT"},
		"slotFuelD": {type: "slot", x: 711, y: 132, bitmap:"bronzeSlotDust"},
		"slotFuel": {type: "slot", x: 711, y: 262, bitmap:"bronzeSlotFuel"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0, bitmap: "BronzeFuelScale", scale: 3.2},
    }
});


SteamMachineRegistry.register(BlockID.SmallBoiler, {
	defaultValues: {
		burn: 0,
		water: 0,
		fuel: 0
	},
	
	getGuiScreen: function(){
		return guiSmallBoiler;
	},
	
	
	tick: function(){
		var luidSlot = this.container.getSlot("slotWater");
		var luidSlotNull = this.container.getSlot("slotNull");
		var FuelD = this.container.getSlot("slotFuelD");
		var Fuel = this.container.getSlot("slotFuel");
		var energyStorage = this.getEnergyStorage();
if(Fuel.count==0){
Fuel.id=0;
}
if((Fuel.id == 263||Fuel.id == ItemID.CoalDust||Fuel.id == ItemID.CrushedCoalOre)&&this.data.burn==0){
Fuel.count--;
this.data.burn=1920;
}
if((Fuel.id == ItemID.Lignite||Fuel.id == ItemID.LigniteDust||Fuel.id == ItemID.CrushedLigniteOre)&&this.data.burn==0){
Fuel.count--;
this.data.burn=1440;
}
if(Math.random()<1/3&&this.data.burn==1){
FuelD.id=ItemID.TinyPileDarkAshesDust;
FuelD.count++;
}
		
		if (luidSlot.id == 325 && luidSlot.data == 8 && this.data.water <= 15000 && luidSlotNull.count < 16)
		{		if(this.data.fuel>=100&&this.data.water==0){
	         explode(this.x, this.y, this.z, 4);
	         }
			this.data.water += 1000;
			luidSlot.id = 0;
			luidSlot.data = 0;
			luidSlotNull.id = 325;
			luidSlotNull.count++;
			this.container.validateAll();
		}
		if (luidSlot.id == ItemID.cellWater && this.data.water <= 15000 && luidSlotNull.count < 64)
		{	if(this.data.fuel>=100&&this.data.water==0){
	         explode(this.x, this.y, this.z, 4);
	         }
			this.data.water += 1000;		
			luidSlot.count--;
			luidSlotNull.id = ItemID.cellEmpty;
			luidSlotNull.count++;
			this.container.validateAll();
		}
		if (this.data.water >= 0.32 && this.data.fuel >= 100)
		{
			this.data.steam+= 7.5;
			this.data.water-= 0.32;
		}
	    
	    if(this.data.fuel == 0){ 
         this.data.fuel=20;
		}
        
		if(this.data.burn > 0){ 
         this.data.burn--;
			if(this.data.fuel < 1000){
				this.data.fuel+=0.07;
			}
		}
		else {
			if(this.data.fuel >= 20.09)
			this.data.fuel-=0.09;
		}
		this.container.setScale("burningScale", this.data.burn / 1920);
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
