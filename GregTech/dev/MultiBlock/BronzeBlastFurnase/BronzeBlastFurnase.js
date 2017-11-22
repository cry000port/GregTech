Translation.addTranslation("Bronze Blast Furnace", {ru: "Бронзовая доменная печь",  zh: "青铜的炉"});

var Blast = 
[
[265, 1, 263, 4, ItemID.SteelIngot, 1, ItemID.TinyPileDarkAshesDust, 4, 200]
]

IDRegistry.genBlockID("BronzePlatedBlastFurnase");
Block.createBlockWithRotation("BronzePlatedBlastFurnase", [
{name: "Bronze Blast Furnace", texture: [["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_BLASTFURNACE", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0], ["MACHINE_BRONZE_PLATEDBRICK", 0],], inCreative: true}
]);

Block.registerDropFunction("BronzePlatedBlastFurnase", function(){
	return [[BlockID.BronzePlatedBlastFurnase, 1, 0]];
});

var guiBronzePlatedBlastFurnase = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Bronze Blast Furnaсe"}},
        inventory: {standart: true},
        background: { bitmap: "BronzeBG"}
    },
	params: {
         
               slot: "BronzeSlot",
               invSlot: "BronzeSlot"
     

     },

    
    drawing: [
            {type: "bitmap", x: 530, y: 200, bitmap: "BronzeBlastFurnaceBG", scale: 3.2},
            {type: "bitmap", x: 900, y: 400, bitmap: "GTLogoBronze", scale: 4},     
            {type: "bitmap", x: 800, y: 115, bitmap: "BronzeBlastFurnaceInfo", scale: 4},     
    ],
	
    
    elements: {
        "slotSource": {type: "slot", x: 441, y: 155, bitmap: "bronzeSlotIngot"},
		"slotFuel": {type: "slot", x: 441, y: 215, bitmap: "bronzeSlotFuel"},
		"slotResult": {type: "slot", x: 625, y: 185, bitmap: "bronzeSlotIngot"},
        "slotResultDust": {type: "slot", x: 685, y: 185, bitmap: "bronzeSlotDust"},			
		"progressScale": {type: "scale", x: 530, y: 200, direction: 0, value: 0, bitmap: "BronzeBlastFurnaceScale", scale: 3.2},
    }
});


SteamMachineRegistry.register(BlockID.BronzePlatedBlastFurnase, {
	defaultValues: {		
		progress: 0,
		ccc: 0,
		isActive: 0
	},
	
	getGuiScreen: function(){
		return guiBronzePlatedBlastFurnase;
	},
	
	tick: function(){
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var slotFuel = this.container.getSlot("slotFuel");
		var slotResult = this.container.getSlot("slotResult");
		var slotResultDust = this.container.getSlot("slotResultDust");
if(sourceSlot.count==0) sourceSlot.id=0;
if(slotFuel.count==0) slotFuel.id=0;
for (var b in Blast){
		if (this.data.isActive == 1){
			if(sourceSlot.id == Blast[b][0]&&slotFuel.id == Blast[b][2]&& slotFuel.count >= Blast[b][3]&&slotResult.count<64&&slotResultDust.count<61){
			    this.data.progress += 1;	
				if (this.data.ccc == 1){
                 World.setBlock(this.x, this.y, this.z + 1, 10, 0);
               World.setBlock(this.x, this.y + 1, this.z + 1, 10, 0);				 
				}
                if (this.data.ccc == 2){
                 World.setBlock(this.x - 1, this.y, this.z, 10, 0);	
				  World.setBlock(this.x - 1, this.y + 1, this.z, 10, 0);	
				}			
                  if (this.data.ccc == 3){
                 World.setBlock(this.x + 1, this.y, this.z, 10, 0);	
				 World.setBlock(this.x + 1, this.y + 1, this.z, 10, 0);	
				}	
                    if (this.data.ccc == 4){
                 World.setBlock(this.x, this.y, this.z - 1, 10, 0);	
				 World.setBlock(this.x, this.y + 1, this.z - 1, 10, 0);	
				}
				if(this.data.progress >= Blast[b][8]){
              this.data.progress = 0;
              slotFuel.count -= Blast[b][3];
					slotResult.id = Blast[b][4];
					slotResult.data = 0;
					slotResult.count+=Blast[b][5];
       slotResultDust.id = Blast[b][6];
       slotResultDust.count = Blast[b][7];
       	this.container.validateAll();
              sourceSlot.count-=1;
			         if (this.data.ccc == 1){
                 World.setBlock(this.x, this.y, this.z + 1, 0, 0);
               World.setBlock(this.x, this.y + 1, this.z + 1, 0, 0);				 
				}
                if (this.data.ccc == 2){
                 World.setBlock(this.x - 1, this.y, this.z, 0, 0);	
				  World.setBlock(this.x - 1, this.y + 1, this.z, 0, 0);	
				}			
                  if (this.data.ccc == 3){
                 World.setBlock(this.x + 1, this.y, this.z, 0, 0);	
				 World.setBlock(this.x + 1, this.y + 1, this.z, 0, 0);	
				}	
                    if (this.data.ccc == 4){
                 World.setBlock(this.x, this.y, this.z - 1, 0, 0);	
				 World.setBlock(this.x, this.y + 1, this.z - 1, 0, 0);	
				}		
				}
			}
			else
			{
				this.data.progress = 0;
				if (this.data.ccc == 1){
                 World.setBlock(this.x, this.y, this.z + 1, 0, 0);
               World.setBlock(this.x, this.y + 1, this.z + 1, 0, 0);				 
				}
                if (this.data.ccc == 2){
                 World.setBlock(this.x - 1, this.y, this.z, 0, 0);	
				  World.setBlock(this.x - 1, this.y + 1, this.z, 0, 0);	
				}			
                  if (this.data.ccc == 3){
                 World.setBlock(this.x + 1, this.y, this.z, 0, 0);	
				 World.setBlock(this.x + 1, this.y + 1, this.z, 0, 0);	
				}	
                    if (this.data.ccc == 4){
                 World.setBlock(this.x, this.y, this.z - 1, 0, 0);	
				 World.setBlock(this.x, this.y + 1, this.z - 1, 0, 0);	
				}		
			}
		}
this.container.setScale("progressScale", this.data.progress/Blast[b][8]);
}
		
		if (this.data.ccc == 0)
		{
			if(World.getBlockID(this.x, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z + 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y - 1, this.z + 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z + 2) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x + 1, this.y, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y, this.z + 1) == 0 &&
			World.getBlockID(this.x + 1, this.y, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y, this.z + 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y, this.z + 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y, this.z + 2) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x + 1, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z + 1) == 0 &&
			World.getBlockID(this.x - 1, this.y + 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 1, this.z + 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z + 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 1, this.z + 2) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x + 1, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 2, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z + 1) == 0 &&
			World.getBlockID(this.x - 1, this.y + 2, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 2, this.z + 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 2, this.z + 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z + 2) == BlockID.BronzePlatedBricks
			) {this.data.ccc = 1;}
			
			
			
			
			
			if(World.getBlockID(this.x, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x, this.y, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y, this.z) == 0 &&
			World.getBlockID(this.x - 1, this.y, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y, this.z - 1) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 1, this.z) == 0 &&
			World.getBlockID(this.x - 1, this.y + 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y + 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y + 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x, this.y + 2, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 2, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 2, this.z) == 0 &&
			World.getBlockID(this.x - 1, this.y + 2, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y + 2, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 2, this.y + 2, this.z - 1) == BlockID.BronzePlatedBricks
			) {this.data.ccc = 2;}
			
			
			
			
			
			if(World.getBlockID(this.x, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y - 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x, this.y, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y, this.z) == 0 &&
			World.getBlockID(this.x + 1, this.y, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y, this.z - 1) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 1, this.z) == 0 &&
			World.getBlockID(this.x + 1, this.y + 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y + 1, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y + 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x, this.y + 2, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 2, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 2, this.z) == 0 &&
			World.getBlockID(this.x + 1, this.y + 2, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y + 2, this.z + 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 2, this.y + 2, this.z - 1) == BlockID.BronzePlatedBricks
			) {this.data.ccc = 3;}
			
			


			
			
			
			
			if(World.getBlockID(this.x, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y - 1, this.z - 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y - 1, this.z - 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y - 1, this.z - 2) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x + 1, this.y, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y, this.z - 1) == 0 &&
			World.getBlockID(this.x + 1, this.y, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y, this.z - 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y, this.z - 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y, this.z - 2) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x + 1, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 1, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z - 1) == 0 &&
			World.getBlockID(this.x - 1, this.y + 1, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 1, this.z - 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 1, this.z - 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 1, this.z - 2) == BlockID.BronzePlatedBricks &&
			
			World.getBlockID(this.x + 1, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 2, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z - 1) == 0 &&
			World.getBlockID(this.x - 1, this.y + 2, this.z - 1) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x + 1, this.y + 2, this.z - 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x - 1, this.y + 2, this.z - 2) == BlockID.BronzePlatedBricks &&
			World.getBlockID(this.x, this.y + 2, this.z - 2) == BlockID.BronzePlatedBricks
			) {this.data.ccc = 4;}
		}
	if(this.data.ccc == 1||this.data.ccc == 2||this.data.ccc == 3||this.data.ccc == 4){
	this.data.isActive=1;
	    }
	}
});
