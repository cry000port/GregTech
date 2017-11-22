var explode = ModAPI.requireGlobal("Level.explode"); 
var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");

importLib("ToolType", "*");
importLib("energylib", "*");

var Saws =
[[ItemID.IronSaw, 64],
[ItemID.BronzeSaw, 48],
[ItemID.LeadSaw, 16],
[ItemID.GoldSaw, 32],
[ItemID.SteelSaw, 128],
[ItemID.SilverSaw, 16]]

var Mortars = 
[[ItemID.IronMortar, 64],
[ItemID.BronzeMortar, 48],
[ItemID.DiamondMortar, 320],
[ItemID.SteelMortar, 128],
[ItemID.SilverMortar, 16],
[ItemID.FlintMortar, 16],
[ItemID.LeadMortar, 16],
[ItemID.GoldMortar, 32]];

var Hammers = 
[[ItemID.IronHammer, 64], [ItemID.BronzeHammer, 48], [ItemID.DiamondHammer, 320], [ItemID.EmeraldHammer, 64], [ItemID.QuartzHammer, 16], [ItemID.StarHammer, 1280], [ItemID.SteelHammer, 128], [ItemID.SilverHammer, 16],
[ItemID.GoldHammer, 32],
[ItemID.LeadHammer, 16]];

var Wrenchs = 
[[ItemID.IronWrench, 64], [ItemID.GoldWrench, 32], [ItemID.BronzeWrench, 48], [ItemID.LeadWrench, 16], [ItemID.SteelWrench, 128], [ItemID.SilverWrench, 16]];

var Files =
[[ItemID.BronzeFile, 48], [ItemID.SteelFile, 128], [ItemID.IronFile, 64], [ItemID.GoldFile, 32], [ItemID.SilverFile, 16]];

var Knifes =
[[ItemID.LeadKnife, 16], [ItemID.SilverKnife, 16], [ItemID.BronzeKnife, 48], [ItemID.GoldKnife, 32],
[ItemID.IronKnife, 64],
[ItemID.SteelKnife, 128]];


var TILE_RENDERER_CONNECTION_GROUP = "gt-fuel";
var GUI_BAR_STANDART_SCALE = 3.2;

var ST = EnergyTypeRegistry.assureEnergyType("St", 1);

var SteamMachineRegistry = {
	machineIDs: {},

	isMachine: function(id){
		return this.machineIDs[id];
	},

	register: function(id, prototype){
		// register render
		ICRender.getGroup("gt-fuel").add(id, -1);
		// register ID
		this.machineIDs[id] = true;
		// setup energy value
		if (prototype.defaultValues) {
            prototype.defaultValues.steam = 0;
            
           
              
        } else {
            prototype.defaultValues = {
                 energy: 0               
            };
        }
		// copy functions
		if(!prototype.getEnergyStorage){
			prototype.getEnergyStorage = function(){
				return 0;
			};
		}
		/*
		Prototype.click = function(id, count, data, coords){
			if(id==ItemID.wrench || id==ItemID.electricWrench){
				return true;
			}
		}
		*/
		
		ToolAPI.registerBlockMaterial(id, "stone");
		Block.setDestroyTime(id, 3);
		TileEntity.registerPrototype(id, prototype);
		 			
        EnergyTileRegistry.addEnergyTypeForId(id, ST);
	},

	
	
	basicEnergyReceiveFunc: function(type, src){
		var energyNeed = this.getEnergyStorage() - this.data.steam;
		this.data.steam += src.getAll(energyNeed);
	}
}


function setupWireRender(id, width, groupName, preventSelfAdd) {
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
    ]
   
    var group = ICRender.getGroup(groupName);
    if (!preventSelfAdd) {
        group.add(id, -1);
    }
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});
}

function setupBlockAsWire(id) {
	ST.registerWire(id);
}

function addRecipeWithCraftingTool(result, data, tool){
	data.push({id: tool, data: -1});
	Recipes.addShapeless(result, data, function(api, field, result){
		for (var i in field){
			if (field[i].id == tool){
				field[i].data++;
				if (field[i].data >= Item.getMaxStack(tool)){
					field[i].id = field[i].count = field[i].data = 0;
				}
			}
			else {
				api.decreaseFieldSlot(i);
			}
		}
	});
}

function addMaterial(name, data)
{
	//ingot
	if(data.ingot == 1){
    IDRegistry.genItemID(name + "Ingot");
    Item.createItem(name + "Ingot", name + " Ingot", {name: name + "_ingot"});
	}
	//nugget
	if(data.nugget == 1){
	IDRegistry.genItemID(name + "Nugget");
    Item.createItem(name + "Nugget", name + " Nugget", {name: name + "_nugget"});
	}
	//long rod
	if(data.longrod == 1){
	IDRegistry.genItemID("Long" + name + "Rod");
    Item.createItem("Long" + name + "Rod", "Long " + name + " Rod", {name: name + "_longrod"});
	}
	//plate
	if(data.plate == 1){
	IDRegistry.genItemID(name+"Plate");
    Item.createItem(name+"Plate", name+" Plate", {name: name + "_plate"});
	}
	//dust
	if(data.dust == 1){
	IDRegistry.genItemID(name + "Dust");
    Item.createItem(name + "Dust", name + " Dust", {name: name +"_dust"});
	}
	//small dust
	if(data.smalldust == 1){
	IDRegistry.genItemID("SmallPile" + name + "Dust");
    Item.createItem("SmallPile" + name + "Dust", "Small Pile of " + name + " Dust", {name: name + "_smalldust"});
	}
	//tiny dust
	if(data.tinydust == 1){
	IDRegistry.genItemID("TinyPile" + name + "Dust");
    Item.createItem("TinyPile" + name + "Dust", "Tiny Pile of " + name + " Dust", {name: name + "_tinydust"});
	}
	//rod
	if(data.rod == 1){
	IDRegistry.genItemID(name + "Rod");
    Item.createItem(name + "Rod", name + " Rod", {name: name + "_rod"});
	}
	//bolt
	if(data.bolt == 1){
	IDRegistry.genItemID(name + "Bolt");
    Item.createItem(name + "Bolt", name + " Bolt", {name: name + "_bolt"});  
	}
	//smallGear
	if(data.smallGear == 1){
	IDRegistry.genItemID("Small" + name + "Gear");
    Item.createItem("Small" + name + "Gear", "Small" + name + " Gear", {name: name + "_smallgear"});  
	}
    //Gear
	if(data.Gear == 1){
	IDRegistry.genItemID(name + "Gear");
    Item.createItem(name + "Gear", name + " Gear", {name: name + "_gear"});  
	}
    //foil
	if(data.foil == 1){
	IDRegistry.genItemID(name + "Foil");
    Item.createItem(name + "Foil", name + " Foil", {name: name + "_foil"});  
	}
    //screw
	if(data.screw == 1){
	IDRegistry.genItemID(name + "Screw");
    Item.createItem(name + "Screw", name + " Screw", {name: name + "_screw"});  
	}
    //ring
	if(data.ring == 1){
	IDRegistry.genItemID(name + "Ring");
    Item.createItem(name + "Ring", name + " Ring", {name: name + "_ring"});  
	}
	//crushedOre
	if(data.crushedOre == 1){
	IDRegistry.genItemID("Crushed" + name + "Ore");
    Item.createItem("Crushed" + name + "Ore", "Crushed " + name + " Ore", {name: name + "_crushed"});  
	}
    //purifiedOre
	if(data.purifiedOre == 1){
	IDRegistry.genItemID("Purified" + name + "Ore");
    Item.createItem("Purified" + name + "Ore", "Purified " + name + " Ore", {name: name + "_purified"});  
	}
    //impureDust
	if(data.impureDust == 1){
	IDRegistry.genItemID("Impure" + name + "Dust");
    Item.createItem("Impure" + name + "Dust", "Impure " + name + " Dust", {name: name + "_impure"});  
	}
	//sawBlade
	if(data.sawBlade == 1){
	IDRegistry.genItemID(name + "SawBlade");
    Item.createItem(name + "SawBlade", name + " Saw Blade", {name: name + "_sawblade"});  
	}
}

function addGems(name)
{
	//perfect
    IDRegistry.genItemID("Perfect" + name);
    Item.createItem("Perfect" + name, "Perfect " + name, {name: "Perfect_" + name});
    //flawless
    IDRegistry.genItemID("Flawless" + name);
    Item.createItem("Flawless" + name, "Flawless " + name, {name: "Flawless_" + name});
	//defective
    IDRegistry.genItemID("Defective" + name);
    Item.createItem("Defective" + name, "Defective " + name, {name: "Defective_" + name});
	//split
    IDRegistry.genItemID("Split" + name);
    Item.createItem("Split" + name, "Split " + name, {name: "Split_" + name});
}

function addTool(name, damage, data){
	if(data.hammer == 1){
		IDRegistry.genItemID(name + "Hammer");
        Item.createItem(name + "Hammer", name + " Hammer", {name: name + "_hammer"}, {stack: 1});
        Item.setMaxDamage(name + "Hammer", damage);
	}
	if(data.wrench == 1){
		IDRegistry.genItemID(name + "Wrench");
        Item.createItem(name + "Wrench", name + " Wrench", {name: name + "_wrench"}, {stack: 1});
        Item.setMaxDamage(name + "Wrench", damage);
	}
	if(data.file == 1){
		IDRegistry.genItemID(name + "File");
        Item.createItem(name + "File", name + " File", {name: name + "_file"}, {stack: 1});
        Item.setMaxDamage(name + "File", damage);
	}
	if(data.knife == 1){
		IDRegistry.genItemID(name + "Knife");
        Item.createItem(name + "Knife", name + " Knife", {name: name + "_knife"}, {stack: 1});
        Item.setMaxDamage(name + "Knife", damage);
	}
	if(data.saw == 1){
		IDRegistry.genItemID(name + "Saw");
        Item.createItem(name + "Saw", name + " Saw", {name: name + "_saw"}, {stack: 1});
        Item.setMaxDamage(name + "Saw", damage);
	}
	if(data.mortar == 1){
		IDRegistry.genItemID(name + "Mortar");
	    Item.createItem(name + "Mortar", name + " Mortar", {name: name + "_mortar"},{stack: 1});
	    Item.setMaxDamage(name + "Mortar", damage);
	}
}
function addTool1(name, data){
	ToolAPI.addToolMaterial(name, {durability: data.dur, level: data.lvl, efficiency: data.eff, damage: data.dmg, enchantability: data.ench});
	IDRegistry.genItemID(name + "Sword");	Item.createItem(name + "Sword", name + " Sword", {name: name + "Sword"}, {stack: 1});
	IDRegistry.genItemID(name + "Shovel");	Item.createItem(name + "Shovel", name + " Shovel", {name: name + "Shovel"}, {stack: 1});
	IDRegistry.genItemID(name + "Pickaxe");	Item.createItem(name + "Pickaxe", name + " Pickaxe", {name: name + "Pickaxe"}, {stack: 1});
	IDRegistry.genItemID(name + "Axe");	Item.createItem(name + "Axe", name + " Axe", {name: name + "Axe"}, {stack: 1});
	IDRegistry.genItemID(name + "Hoe");	Item.createItem(name + "Hoe", name + " Hoe", {name: name + "Hoe"}, {stack: 1});
}