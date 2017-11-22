/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 25
*/



// file: Core.js

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
	IDRegistry.genItemID(name + "Sword");
	Item.createItem(name + "Sword", name + " Sword", {name: name + "Sword"}, {stack: 1});
	IDRegistry.genItemID(name + "Shovel");
	Item.createItem(name + "Shovel", name + " Shovel", {name: name + "Shovel"}, {stack: 1});
	IDRegistry.genItemID(name + "Pickaxe");
	Item.createItem(name + "Pickaxe", name + " Pickaxe", {name: name + "Pickaxe"}, {stack: 1});
	IDRegistry.genItemID(name + "Axe");
	Item.createItem(name + "Axe", name + " Axe", {name: name + "Axe"}, {stack: 1});
	IDRegistry.genItemID(name + "Hoe");
	Item.createItem(name + "Hoe", name + " Hoe", {name: name + "Hoe"}, {stack: 1});
}




// file: Main/Items.js

addMaterial("Steel", {ingot: 1, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 0, purifiedOre: 0, impureDust: 0, sawBlade: 1});
addMaterial("Rubber", {ingot: 1, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 1, crushedOre: 0, purifiedOre: 0, impureDust: 0, sawBlade: 0});
addMaterial("Copper", {ingot: 1, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addMaterial("Iron", {ingot: 0, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 1});
addMaterial("Lead", {ingot: 1, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addMaterial("Gold", {ingot: 0, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 1});
addMaterial("Tin", {ingot: 1, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 1, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addMaterial("Silver", {ingot: 1, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 1});
addMaterial("Bronze", {ingot: 1, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 0, purifiedOre: 0, impureDust: 0, sawBlade: 1});
addMaterial("Antimony", {ingot: 1, nugget: 1, longrod: 1, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 1, bolt: 1, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("LapisLazuli", {ingot: 0, nugget: 0, longrod: 0, plate: 1, dust: 1, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addMaterial("Redstone", {ingot: 0, nugget: 0, longrod: 0, plate: 1, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addMaterial("Diamond", {ingot: 0, nugget: 0, longrod: 0, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addGems("Diamond");
addMaterial("Emerald", {ingot: 0, nugget: 0, longrod: 0, plate: 1, dust: 1, smalldust: 1, tinydust: 1, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addGems("Emerald");
IDRegistry.genItemID("Lignite");
Item.createItem("Lignite", "Lignite", {name: "Lignite"});
addMaterial("Lignite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 1, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addMaterial("Coal", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 1, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 1, impureDust: 1, sawBlade: 0});
addMaterial("Cassiterite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("BrownLimonite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("YellowLimonite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("BandedIron", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("Malachite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("Magnetite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("VanadiumMagnetite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("Chalcopyrite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("Pyrite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("Tetrahedrite", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("Galena", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 0, smalldust: 0, tinydust: 0, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 1, purifiedOre: 0, impureDust: 1, sawBlade: 0});
addMaterial("Ashes", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 1, smalldust: 0, tinydust: 1, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 0, purifiedOre: 0, impureDust: 0, sawBlade: 0});
addMaterial("DarkAshes", {ingot: 0, nugget: 0, longrod: 0, plate: 0, dust: 1, smalldust: 0, tinydust: 1, rod: 0, bolt: 0, screw: 0, smallGear: 0, Gear: 0, foil: 0, ring: 0, crushedOre: 0, purifiedOre: 0, impureDust: 0, sawBlade: 0});

IDRegistry.genItemID("dustStone");
Item.createItem("dustStone", "Stone Dust", {name: "STONE_DUST"});

IDRegistry.genItemID("impureDustStone");
Item.createItem("impureDustStone", "Impure Stone Dust", {name: "IMPURE_STONE_DUST"});




// file: Main/Blocks.js

Translation.addTranslation("Bricked Bronze Hull", {ru: "Кирпичный бронзовый корпус",  zh: "砖砌的青铜船体"});
IDRegistry.genBlockID("BrikedBronzeHull");
Block.createBlock("BrikedBronzeHull", [
	{name: "Bricked Bronze Hull", texture: [["MACHINE_BRONZE", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0]], inCreative: true}
]);

Translation.addTranslation("Bronze Hull", {ru: "Бронзовый корпус",  zh: "青铜船体"});
IDRegistry.genBlockID("BronzeHull");
Block.createBlock("BronzeHull", [
	{name: "Bronze Hull", texture: [["MACHINE_BRONZE", 0]], inCreative: true}
]);

Translation.addTranslation("Bronze Plated Bricks", {ru: "Кирпичи с бронзовым покрытием",  zh: "砖块铜牌完成"});
IDRegistry.genBlockID("BronzePlatedBricks");
Block.createBlock("BronzePlatedBricks", [
	{name: "Bronze Plated Bricks", texture: [["MACHINE_BRONZE_PLATEDBRICK", 0]], inCreative: true}
]);

Translation.addTranslation("Silver Block", {ru: "Серебрянный блок",  zh: "银色的包"});
IDRegistry.genBlockID("SilverBlock");
Block.createBlock("SilverBlock", [
	{name: "Silver Block", texture: [["BLOCK_SILVER", 0]], inCreative: true}
]);

IDRegistry.genBlockID("SteelBlock");
Block.createBlock("SteelBlock", [
	{name: "Steel Block", texture: [["BLOCK_STEEL", 0]], inCreative: true}
]);

IDRegistry.genBlockID("CopperBlock");
Block.createBlock("CopperBlock", [
	{name: "Copper Block", texture: [["BLOCK_COPPER", 0]], inCreative: true}
]);

IDRegistry.genBlockID("LeadBlock");
Block.createBlock("LeadBlock", [
	{name: "Lead Block", texture: [["BLOCK_LEAD", 0]], inCreative: true}
]);

IDRegistry.genBlockID("TinBlock");
Block.createBlock("TinBlock", [
	{name: "Tin Block", texture: [["BLOCK_TIN", 0]], inCreative: true}
]);

IDRegistry.genBlockID("BronzeBlock");
Block.createBlock("BronzeBlock", [
	{name: "Bronze Block", texture: [["BLOCK_BRONZE", 0]], inCreative: true}
]);




// file: Main/Shapes.js

Translation.addTranslation("Empty Shape Plate", {ru: "Пустая пластина формы",  zh: "空盘形式"});
IDRegistry.genItemID("EmptyShapePlate");
Item.createItem("EmptyShapePlate", "Empty Shape Plate", {name: "EMPTY"});

Translation.addTranslation("Mold (Cylinder)", {ru: "Прессформа (Цилиндр)",  zh: "模(气缸)"});
IDRegistry.genItemID("MoldCylinder");
Item.createItem("MoldCylinder", "Mold (Cylinder)", {name: "CYLINDER"});

Translation.addTranslation("Mold (Anvil)", {ru: "Прессформа (Наковальня)",  zh: "模(砧)"});
IDRegistry.genItemID("MoldAnvil");
Item.createItem("MoldAnvil", "Mold (Anvil)", {name: "ANVIL"});

Translation.addTranslation("Mold (Plate)", {ru: "Прессформа (Пластина)",  zh: "模(板)"});
IDRegistry.genItemID("MoldPlate");
Item.createItem("MoldPlate", "Mold (Plate)", {name: "MPLATE"});


Translation.addTranslation("Mold (Ingot)", {ru: "Прессформа (Слиток)",  zh: "模(锭)"});
IDRegistry.genItemID("MoldIngot");
Item.createItem("MoldIngot", "Mold (Ingot)", {name: "MINGOT"});

Translation.addTranslation("Mold (Nuggets)", {ru: "Прессформа (Самородок)",  zh: "模(金块)"});
IDRegistry.genItemID("MoldNuggets");
Item.createItem("MoldNuggets", "Mold (Nuggets)", {name: "MNUGGET"});

Translation.addTranslation("Mold (Block)", {ru: "Прессформа (Блок)",  zh: "模(单元)"});
IDRegistry.genItemID("MoldBlock");
Item.createItem("MoldBlock", "Mold (Block)", {name: "MBLOCK"});




Translation.addTranslation("Extruder Shape (Casing)", {ru: "Форма экструдера (Корпус)",  zh: "挤压形的(情况下)"});
IDRegistry.genItemID("ExtruderShapeCasing");
Item.createItem("ExtruderShapeCasing", "Extruder Shape (Casing)", {name: "ECASING"});

Translation.addTranslation("Extruder Shape (Bottle)", {ru: "Форма экструдера (Бутыль)",  zh: "挤压形的(瓶)"});
IDRegistry.genItemID("ExtruderShapeBottle");
Item.createItem("ExtruderShapeBottle", "Extruder Shape (Bottle)", {name: "EBOTTLE"});

Translation.addTranslation("Extruder Shape (Ingot)", {ru: "Форма экструдера (Слиток)",  zh: "挤压形的(锭)"});
IDRegistry.genItemID("ExtruderShapeIngot");
Item.createItem("ExtruderShapeIngot", "Extruder Shape (Ingot)", {name: "EINGOT"});

Translation.addTranslation("Extruder Shape (Cell)", {ru: "Форма экструдера (Капсула)",  zh: "挤压形的(胶囊)"});
IDRegistry.genItemID("ExtruderShapeCell");
Item.createItem("ExtruderShapeCell", "Extruder Shape (Cell)", {name: "ECELL"});

Translation.addTranslation("Extruder Shape (Ring)", {ru: "Форма экструдера (Кольцо)",  zh: "挤压形的(环)"});
IDRegistry.genItemID("ExtruderShapeRing");
Item.createItem("ExtruderShapeRing", "Extruder Shape (Ring)", {name: "ERING"});

Translation.addTranslation("Extruder Shape (Block)", {ru: "Форма экструдера (Блок)",  zh: "挤压形的(单元)"});
IDRegistry.genItemID("ExtruderShapeBlock");
Item.createItem("ExtruderShapeBlock", "Extruder Shape (Block)", {name: "EBLOCK"});

Translation.addTranslation("Extruder Shape (Plate)", {ru: "Форма экструдера (Пластина)",  zh: "挤压形的(板)"});
IDRegistry.genItemID("ExtruderShapePlate");
Item.createItem("ExtruderShapePlate", "Extruder Shape (Plate)", {name: "EPLATE"});

Translation.addTranslation("Extruder Shape (Rod)", {ru: "Форма экструдера (Стрежень)",  zh: "挤压形的(棒)"});
IDRegistry.genItemID("ExtruderShapeRod");
Item.createItem("ExtruderShapeRod", "Extruder Shape (Rod)", {name: "EROD"});

Translation.addTranslation("Extruder Shape (Bolt)", {ru: "Форма экструдера (Болт)",  zh: "挤压形的(螺栓)"});
IDRegistry.genItemID("ExtruderShapeBolt");
Item.createItem("ExtruderShapeBolt", "Extruder Shape (Bolt)", {name: "EBOLT"});

Translation.addTranslation("Extruder Shape (Wire)", {ru: "Форма экструдера (Провод)",  zh: "挤压形的(丝)"});
IDRegistry.genItemID("ExtruderShapeWire");
Item.createItem("ExtruderShapeWire", "Extruder Shape (Wire)", {name: "EWIRE"});

Translation.addTranslation("Extruder Shape (Tiny Pipe)", {ru: "Форма экструдера (Крошечная труба)",  zh: "挤压形的(小管)"});
IDRegistry.genItemID("ExtruderShapeTinyPipe");
Item.createItem("ExtruderShapeTinyPipe", "Extruder Shape (Tiny Pipe)", {name: "ETP"});

Translation.addTranslation("Extruder Shape (Small Pipe)", {ru: "Форма экструдера (Маленькая труба)",  zh: "挤压形的(小管道)"});
IDRegistry.genItemID("ExtruderShapeSmallPipe");
Item.createItem("ExtruderShapeSmallPipe", "Extruder Shape (Small Pipe)", {name: "ESP"});

Translation.addTranslation("Extruder Shape (Normal Pipe)", {ru: "Форма экструдера (Обычная труба)",  zh: "挤压形的(传统管)"});
IDRegistry.genItemID("ExtruderShapeNormalPipe");
Item.createItem("ExtruderShapeNormalPipe", "Extruder Shape (Normal Pipe)", {name: "ENP"});

Translation.addTranslation("Extruder Shape (Large Pipe)", {ru: "Форма экструдера (Большая труба)",  zh: "挤压形的(大管子)"});
IDRegistry.genItemID("ExtruderShapeLargePipe");
Item.createItem("ExtruderShapeLargePipe", "Extruder Shape (Large Pipe)", {name: "ELP"});

Translation.addTranslation("Extruder Shape (Huge Pipe)", {ru: "Форма экструдера (Огромная труба)",  zh: "挤压形的(一个巨大的水管)"});
IDRegistry.genItemID("ExtruderShapeHugePipe");
Item.createItem("ExtruderShapeHugePipe", "Extruder Shape (Huge Pipe)", {name: "EHP"});




// file: Main/Ore_Generator.js

var XX;
var ZZ;
var genOreTick;

function random(min, max){
return Math.floor(Math.random()*(max-min+1))+min;
}
 

function setOre(x, y, z, id, data, id2){
if(World.getBlockID(x, y, z) == 1 || World.getBlockID(x, y, z) == 3 || World.getBlockID(x, y, z) == 13){
	World.setBlock(x, y, z, id, data);
  }}
function setOre1(x, y, z, id1, data, id2){
if(World.getBlockID(x, y, z) == 1 || World.getBlockID(x, y, z) == 3 || World.getBlockID(x, y, z) == 13){
	World.setBlock(x, y, z, id1, data);
  }}
function setOre2(x, y, z, id3, data, id2){
if(World.getBlockID(x, y, z) == 1 || World.getBlockID(x, y, z) == 3 || World.getBlockID(x, y, z) == 13){
	World.setBlock(x, y, z, id3, data);
  }}
function setOre3(x, y, z, id4, data, id2){
if(World.getBlockID(x, y, z) == 1 || World.getBlockID(x, y, z) == 3 || World.getBlockID(x, y, z) == 13){
	World.setBlock(x, y, z, id4, data);
  }}

Callback.addCallback("PreLoaded", function(){
	genOreTick = -1;
});
Callback.addCallback("tick", function(){
   generateOre();
});

function generateOre(){
		genOreTick++;
		if(genOreTick==20)
		{
			genOreTick=0;
		}
		if(genOreTick==10)
		{
			XX = Math.floor(Player.getPosition().x/16)*16;
            ZZ = Math.floor(Player.getPosition().z/16)*16;
		}
		if(Player.getPosition().y<128){
			x = XX+16*(genOreTick%5-2);
			z = ZZ+16*(Math.floor(genOreTick/5)%5-2);
if(World.getBlockData(x+2, 0, z)!=1){
			World.setBlock(x+ 2, 0, z, 7, 1);
if(Math.random()<1/24){
genOreNormal(BlockID.oreRedstone, 0, BlockID.oreRuby, 0, BlockID.oreCinnabar, 0, 1, 50, 130, x,z);
}
if(Math.random()<1/18){
genOreNormal(BlockID.oreCoal, 0, BlockID.oreCoal, 0, BlockID.oreLigniteCoal, 0, 1, 50, 80, x,z);
}
if(Math.random()<1/18){
genOreNormal(BlockID.oreLigniteCoal, 0, BlockID.oreLigniteCoal, 0, BlockID.oreCoal, 0, 1, 50, 130, x,z);
}
if(Math.random()<1/30){
genOreNormal(BlockID.oreGraphite, 0, BlockID.oreDiamond, 0, BlockID.oreCoal, 0, 1, 5, 20, x,z);
}
if(Math.random()<1/20){
genOreNormal(BlockID.oreMagnetite, 0, BlockID.oreGold, 0, BlockID.oreVanadiumMagnetite, 0, 1, 60, 80, x,z);
}
if(Math.random()<1/24){
genOreNormal1(BlockID.oreLazurite, 0, BlockID.oreLapisLazuli, 0, BlockID.oreCalcite, 0, BlockID.oreSodalite, 0, 1, 20, 50, x,z);
}
if(Math.random()<1/24){
genOreNormal(BlockID.oreGalena, 0, BlockID.oreSilver, 0, BlockID.oreLead, 0, 1, 30, 60, x,z);
}
if(Math.random()<1/18){
genOreNormal(BlockID.oreTetrahedrite, 0, BlockID.oreCopper, 0, BlockID.oreAntimonite, 0, 1, 60, 110, x,z);
}
if(Math.random()<1/19){
genOreNormal(BlockID.oreTin, 0, BlockID.oreCassiterite, 0, BlockID.oreTin, 0, 1, 40, 110, x,z);
}
if(Math.random()<1/20){
genOreNormal(BlockID.oreMagnetite, 0, BlockID.oreIron, 0, BlockID.oreVanadiumMagnetite, 0, 1, 50, 110, x,z);
}
if(Math.random()<1/24){
genOreNormal1(BlockID.oreChalcopyrite, 0, BlockID.oreIron, 0, BlockID.oreCopper, 0, BlockID.orePyrite, 0, 1, 10, 30, x,z);
}
if(Math.random()<1/24){
genOreNormal1(BlockID.oreBrownLimonite, 0, BlockID.oreBandedIron, 0, BlockID.oreMalachite, 0, BlockID.oreYellowLimonite, 0, 1, 10, 30, x,z);
}
for (var i=0; i<=0; i++){
genOreTiny(BlockID.oreSilverSmall, 0, 1, 20, 40, x,z);
}
for (var i=0; i<=1; i++){
genOreTiny(BlockID.oreCoalSmall, 0, 1, 60, 100, x,z);
}
for (var i=0; i<=0; i++){
genOreTiny(BlockID.oreGoldSmall, 0, 1, 20, 40, x,z);
}
for (var i=0; i<=1; i++){
genOreTiny(BlockID.oreIronSmall, 0, 1, 40, 80, x,z);
}
for (var i=0; i<=0; i++){
genOreTiny(BlockID.oreLapisSmall, 0, 1, 20, 40, x,z);
}
for (var i=0; i<=0; i++){
genOreTiny(BlockID.oreRedstoneSmall, 0, 1, 5, 20, x,z);
}
for (var i=0; i<=0; i++){
genOreTiny(BlockID.oreEmeraldSmall, 0, 1, 5, 100, x,z);
}
if(Math.random()<1/3){
genOreTiny(BlockID.oreDiamondSmall, 0, 1, 5, 10, x,z);
}
for (var i=0; i<=1; i++){
genOreTiny(BlockID.oreCopperSmall, 0, 1, 60, 120, x,z);
}
for (var i=0; i<=1; i++){
genOreTiny(BlockID.oreTinSmall, 0, 1, 60, 120, x,z);
}
for (var i=0; i<=0; i++){
genOreTiny(BlockID.oreLeadSmall, 0, 1, 40, 80, x,z);
}
}}}

function genOreTiny(id, data, id2, minY, maxY, x,z){
 x = Math.floor(Math.random()*16)+x
 z = Math.floor(Math.random()*16)+z
 var y = random(minY,maxY)
 setOre(x,y,z,id,data);
}
function genOreNormal(id, data, id1, data, id3, data,  id2, minY, maxY, x,z){
x = Math.floor(Math.random()*16)+x
z = Math.floor(Math.random()*16)+z
var y = random(minY,maxY)
//0
setOre1(x+3,y,z,id1,data,id2);
setOre2(x+5,y,z,id3,data,id2);
setOre(x+6,y,z,id,data,id2);
setOre1(x+9,y,z,id1,data,id2);
setOre(x+11,y,z,id,data,id2);
setOre1(x+13,y,z,id1,data,id2);
setOre2(x+14,y,z,id3,data,id2);
setOre(x,y,z+1,id,data,id2);
setOre1(x+2,y,z+1,id1,data,id2);
setOre1(x+4,y,z+1,id1,data,id2);
setOre(x+8,y,z+1,id,data,id2);
setOre1(x+12,y,z+1,id1,data,id2);
setOre(x+16,y,z+1,id,data,id2);
setOre2(x+4,y,z+2,id3,data,id2);
setOre(x+7,y,z+2,id,data,id2);
setOre1(x+9,y,z+2,id1,data,id2);
setOre1(x+11,y,z+2,id1,data,id2);
setOre(x+12,y,z+2,id,data,id2);
setOre1(x+15,y,z+2,id1,data,id2);
setOre2(x+17,y,z+2,id3,data,id2);
setOre1(x+4,y,z+3,id1,data,id2);
setOre(x+9,y,z+3,id,data,id2);
setOre1(x+10,y,z+3,id1,data,id2);
setOre2(x+13,y,z+3,id3,data,id2);
setOre1(x+16,y,z+3,id1,data,id2);
setOre1(x+1,y,z+4,id1,data,id2);
setOre2(x+5,y,z+4,id3,data,id2);
setOre1(x+7,y,z+4,id1,data,id2);
setOre(x+13,y,z+4,id,data,id2);
setOre1(x+15,y,z+4,id1,data,id2);
setOre1(x+16,y,z+4,id1,data,id2);
setOre2(x,y,z+5,id3,data,id2);
setOre1(x+2,y,z+5,id1,data,id2);
setOre1(x+4,y,z+5,id1,data,id2);
setOre(x+5,y,z+5,id,data,id2);
setOre1(x+6,y,z+5,id1,data,id2);
setOre2(x+11,y,z+5,id3,data,id2);
setOre(x+16,y,z+5,id,data,id2);
setOre1(x+1,y,z+6,id1,data,id2);
setOre(x+9,y,z+6,id,data,id2);
setOre1(x+10,y,z+6,id1,data,id2);
setOre2(x+14,y,z+6,id3,data,id2);
setOre(x+15,y,z+6,id,data,id2);
setOre1(x,y,z+7,id1,data,id2);
setOre(x+2,y,z+7,id,data,id2);
setOre1(x+3,y,z+7,id1,data,id2);
setOre1(x+6,y,z+7,id1,data,id2);
setOre2(x+8,y,z+7,id3,data,id2);
setOre1(x+12,y,z+7,id1,data,id2);
setOre1(x+16,y,z+7,id1,data,id2);
setOre(x+3,y,z+8,id,data,id2);
setOre1(x+9,y,z+8,id1,data,id2);
setOre1(x+11,y,z+8,id1,data,id2);
setOre2(x+12,y,z+8,id3,data,id2);
setOre1(x+13,y,z+8,id1,data,id2);
setOre1(x+17,y,z+8,id1,data,id2);
setOre(x+2,y,z+9,id,data,id2);
setOre1(x+4,y,z+9,id1,data,id2);
setOre(x+6,y,z+9,id,data,id2);
setOre1(x+7,y,z+9,id1,data,id2);
setOre2(x+8,y,z+9,id3,data,id2);
setOre1(x+10,y,z+9,id1,data,id2);
setOre(x+14,y,z+9,id,data,id2);
setOre1(x+16,y,z+9,id1,data,id2);
setOre(x,y,z+10,id1,data,id2);
setOre1(x+2,y,z+10,id1,data,id2);
setOre(x+5,y,z+10,id1,data,id2);
setOre(x+6,y,z+10,id1,data,id2);
setOre(x+9,y,z+10,id1,data,id2);
setOre1(x+12,y,z+10,id1,data,id2);
setOre(x+15,y,z+10,id1,data,id2);
setOre2(x+16,y,z+10,id1,data,id2);
setOre(x+1,y,z+11,id1,data,id2);
setOre1(x+3,y,z+11,id1,data,id2);
setOre(x+4,y,z+11,id1,data,id2);
setOre1(x+5,y,z+11,id1,data,id2);
setOre(x+7,y,z+11,id1,data,id2);
setOre(x+10,y,z+11,id1,data,id2);
setOre1(x+11,y,z+11,id1,data,id2);
setOre(x+15,y,z+11,id1,data,id2);
setOre1(x,y,z+12,id1,data,id2);
setOre2(x+4,y,z+12,id1,data,id2);
setOre(x+6,y,z+12,id1,data,id2);
setOre(x+7,y,z+12,id1,data,id2);
setOre1(x+10,y,z+12,id1,data,id2);
setOre(x+12,y,z+12,id1,data,id2);
setOre(x+13,y,z+12,id1,data,id2);
setOre1(x+14,y,z+12,id1,data,id2);
setOre(x+2,y,z+13,id1,data,id2);
setOre1(x+3,y,z+13,id1,data,id2);
setOre2(x+6,y,z+13,id1,data,id2);
setOre1(x+8,y,z+13,id1,data,id2);
setOre(x+9,y,z+13,id1,data,id2);
setOre(x+10,y,z+13,id1,data,id2);
setOre1(x+14,y,z+13,id1,data,id2);
setOre(x+15,y,z+13,id1,data,id2);
setOre2(x+4,y,z+14,id1,data,id2);
setOre(x+5,y,z+14,id1,data,id2)
setOre1(x+7,y,z+14,id1,data,id2);
setOre(x+8,y,z+14,id1,data,id2);
setOre1(x+13,y,z+14,id1,data,id2);
setOre(x+14,y,z+14,id1,data,id2);
setOre1(x+16,y,z+14,id1,data,id2);
setOre(x+1,y,z+15,id1,data,id2);
setOre1(x+3,y,z+15,id1,data,id2);
setOre2(x+6,y,z+15,id1,data,id2);
setOre(x+8,y,z+15,id1,data,id2);
setOre(x+10,y,z+15,id1,data,id2);
setOre1(x+11,y,z+15,id1,data,id2);
setOre(x+12,y,z+15,id1,data,id2);
setOre1(x+15,y,z+15,id1,data,id2);
//-1
setOre2(x+1,y-1,z,id3,data,id2);
setOre(x+3,y-1,z,id,data,id2);
setOre1(x+7,y-1,z,id1,data,id2);
setOre(x+12,y-1,z,id,data,id2);
setOre(x+15,y-1,z,id,data,id2);
setOre(x,y-1,z+1,id,data,id2);
setOre2(x+3,y-1,z+1,id3,data,id2);
setOre1(x+4,y-1,z+1,id1,data,id2);
setOre(x+7,y-1,z+1,id,data,id2);
setOre1(x+14,y-1,z+1,id1,data,id2);
setOre(x+2,y-1,z+2,id,data,id2);
setOre2(x+7,y-1,z+2,id3,data,id2);
setOre(x+12,y-1,z+2,id,data,id2);
setOre1(x+13,y-1,z+2,id1,data,id2);
setOre(x+14,y-1,z+2,id,data,id2);
setOre(x+17,y-1,z+2,id,data,id2);
setOre1(x+6,y-1,z+3,id1,data,id2);
setOre2(x+8,y-1,z+3,id3,data,id2);
setOre(x+12,y-1,z+3,id,data,id2);
setOre(x+16,y-1,z+3,id,data,id2);
setOre1(x+1,y-1,z+4,id1,data,id2);
setOre(x+6,y-1,z+4,id,data,id2);
setOre2(x+8,y-1,z+4,id3,data,id2);
setOre(x+14,y-1,z+4,id,data,id2);
setOre(x+15,y-1,z+4,id,data,id2);
setOre1(x,y-1,z+5,id1,data,id2);
setOre(x+3,y-1,z+5,id,data,id2);
setOre2(x+6,y-1,z+5,id3,data,id2);
setOre(x+8,y-1,z+5,id,data,id2);
setOre1(x+10,y-1,z+5,id1,data,id2);
setOre(x+12,y-1,z+5,id,data,id2);
setOre(x+3,y-1,z+6,id,data,id2);
setOre2(x+5,y-1,z+6,id3,data,id2);
setOre(x+12,y-1,z+6,id,data,id2);
setOre(x+13,y-1,z+6,id,data,id2);
setOre1(x+2,y-1,z+7,id1,data,id2);
setOre(x+6,y-1,z+7,id,data,id2);
setOre2(x+8,y-1,z+7,id3,data,id2);
setOre(x+9,y-1,z+7,id,data,id2);
setOre1(x+13,y-1,z+7,id1,data,id2);
setOre(x+15,y-1,z+7,id,data,id2);
setOre1(x+5,y-1,z+8,id1,data,id2);
setOre(x+8,y-1,z+8,id,data,id2);
setOre2(x+10,y-1,z+8,id3,data,id2);
setOre(x+12,y-1,z+8,id,data,id2);
setOre(x+14,y-1,z+8,id,data,id2);
setOre1(x+3,y-1,z+9,id1,data,id2);
setOre(x+4,y-1,z+9,id,data,id2);
setOre(x+7,y-1,z+9,id,data,id2);
setOre1(x+9,y-1,z+9,id1,data,id2);
setOre2(x+11,y-1,z+9,id3,data,id2);
setOre1(x+12,y-1,z+9,id1,data,id2);
setOre(x+14,y-1,z+9,id,data,id2);
setOre1(x+15,y-1,z+9,id1,data,id2);
//-2
setOre(x,y-2,z,id,data,id2);
setOre2(x+5,y-2,z,id3,data,id2);
setOre(x+10,y-2,z,id,data,id2);
setOre(x+14,y-2,z,id,data,id2);
setOre(x,y-2,z+1,id,data,id2);
setOre(x+4,y-2,z+1,id,data,id2);
setOre2(x+6,y-2,z+1,id3,data,id2);
setOre(x+12,y-2,z+1,id,data,id2);
setOre(x+4,y-2,z+2,id,data,id2);
setOre(x+7,y-2,z+2,id,data,id2);
setOre(x+11,y-2,z+2,id,data,id2);
setOre2(x+13,y-2,z+2,id3,data,id2);
setOre(x+15,y-2,z+2,id,data,id2);
setOre(x+3,y-2,z+3,id,data,id2);
setOre(x+8,y-2,z+3,id,data,id2);
setOre(x+12,y-2,z+3,id,data,id2);
setOre2(x+4,y-2,z+4,id3,data,id2);
setOre(x+8,y-2,z+4,id,data,id2);
setOre(x+10,y-2,z+4,id,data,id2);
setOre(x+11,y-2,z+4,id,data,id2);
setOre(x,y-2,z+5,id,data,id2);
setOre(x+4,y-2,z+5,id,data,id2);
setOre(x+6,y-2,z+5,id,data,id2);
setOre2(x+11,y-2,z+5,id3,data,id2);
setOre(x+13,y-2,z+5,id,data,id2);
setOre(x+1,y-2,z+6,id,data,id2);
setOre(x+5,y-2,z+6,id,data,id2);
setOre(x+10,y-2,z+6,id,data,id2);
setOre(x+1,y-2,z+7,id,data,id2);
setOre2(x+5,y-2,z+7,id3,data,id2);
setOre(x+9,y-2,z+7,id,data,id2);
setOre(x+11,y-2,z+7,id,data,id2);
setOre(x+13,y-2,z+7,id,data,id2);
setOre(x+2,y-2,z+8,id,data,id2);
setOre(x+7,y-2,z+8,id,data,id2);
setOre2(x+10,y-2,z+8,id3,data,id2);
setOre(x+12,y-2,z+8,id,data,id2);
setOre(x+1,y-2,z+9,id,data,id2);
setOre(x+4,y-2,z+9,id,data,id2);
setOre(x+7,y-2,z+9,id,data,id2);
setOre(x+10,y-2,z+9,id,data,id2);
setOre2(x+11,y-2,z+9,id3,data,id2);
setOre(x+12,y-2,z+9,id,data,id2);
setOre(x+13,y-2,z+9,id,data,id2);
//-3
setOre2(x,y-3,z,id3,data,id2);
setOre(x+6,y-3,z,id,data,id2);
setOre(x+9,y-3,z,id,data,id2);
setOre(x+1,y-3,z+1,id,data,id2);
setOre(x+3,y-3,z+1,id,data,id2);
setOre(x+6,y-3,z+1,id,data,id2);
setOre(x+11,y-3,z+1,id,data,id2);
setOre2(x+2,y-3,z+2,id3,data,id2);
setOre(x+5,y-3,z+2,id,data,id2);
setOre(x+10,y-3,z+2,id,data,id2);
setOre(x+12,y-3,z+2,id,data,id2);
setOre(x+3,y-3,z+3,id,data,id2);
setOre(x+4,y-3,z+3,id,data,id2);
setOre2(x+7,y-3,z+3,id3,data,id2);
setOre(x+1,y-3,z+4,id,data,id2);
setOre(x+6,y-3,z+4,id,data,id2);
setOre(x+9,y-3,z+4,id,data,id2);
setOre(x,y-3,z+5,id,data,id2);
setOre2(x+5,y-3,z+5,id3,data,id2);
setOre(x+8,y-3,z+5,id,data,id2);
setOre(x+11,y-3,z+5,id,data,id2);
setOre(x+4,y-3,z+6,id,data,id2);
setOre(x+7,y-3,z+6,id,data,id2);
setOre(x+11,y-3,z+6,id,data,id2);
setOre2(x+1,y-3,z+7,id3,data,id2);
setOre(x+6,y-3,z+7,id,data,id2);
setOre(x+9,y-3,z+7,id,data,id2);
setOre(x+3,y-3,z+8,id,data,id2);
setOre(x+7,y-3,z+8,id,data,id2);
setOre(x+10,y-3,z+8,id,data,id2);
setOre2(x+2,y-3,z+9,id3,data,id2);
setOre(x+5,y-3,z+9,id,data,id2);
setOre(x+8,y-3,z+9,id,data,id2);
setOre(x+12,y-3,z+9,id,data,id2);
//+1
setOre1(x+2,y+1,z,id1,data,id2);
setOre(x+4,y+1,z,id,data,id2);
setOre(x+6,y+1,z,id,data,id2);
setOre2(x+12,y+1,z,id3,data,id2);
setOre1(x+13,y+1,z,id1,data,id2);
setOre(x+1,y+1,z+1,id,data,id2);
setOre1(x+2,y+1,z+1,id1,data,id2);
setOre(x+5,y+1,z+1,id,data,id2);
setOre1(x+9,y+1,z+1,id1,data,id2);
setOre2(x+10,y+1,z+1,id3,data,id2);
setOre(x,y+1,z+2,id,data,id2);
setOre1(x+4,y+1,z+2,id1,data,id2);
setOre(x+8,y+1,z+2,id,data,id2);
setOre(x+11,y+1,z+2,id,data,id2);
setOre(x+12,y+1,z+2,id,data,id2);
setOre1(x+14,y+1,z+2,id1,data,id2);
setOre2(x+3,y+1,z+3,id3,data,id2);
setOre1(x+5,y+1,z+3,id1,data,id2);
setOre(x+7,y+1,z+3,id,data,id2);
setOre(x+12,y+1,z+3,id,data,id2);
setOre1(x+1,y+1,z+4,id1,data,id2);
setOre2(x+3,y+1,z+4,id3,data,id2);
setOre(x+6,y+1,z+4,id,data,id2);
setOre(x+10,y+1,z+4,id,data,id2);
setOre1(x+11,y+1,z+4,id1,data,id2);
setOre(x,y+1,z+5,id,data,id2);
setOre(x+2,y+1,z+5,id,data,id2);
setOre2(x+4,y+1,z+5,id3,data,id2);
setOre1(x+6,y+1,z+5,id1,data,id2);
setOre(x+12,y+1,z+5,id,data,id2);
setOre(x+13,y+1,z+5,id,data,id2);
setOre1(x,y+1,z+6,id1,data,id2);
setOre(x+2,y+1,z+6,id,data,id2);
setOre2(x+3,y+1,z+6,id3,data,id2);
setOre(x+5,y+1,z+6,id,data,id2);
setOre1(x+1,y+1,z+7,id1,data,id2);
setOre(x+4,y+1,z+7,id,data,id2);
setOre(x+8,y+1,z+7,id,data,id2);
setOre1(x+10,y+1,z+7,id1,data,id2);
setOre2(x+11,y+1,z+7,id3,data,id2);
setOre(x+13,y+1,z+7,id,data,id2);
setOre1(x,y+1,z+8,id1,data,id2);
setOre(x+3,y+1,z+8,id,data,id2);
setOre1(x+7,y+1,z+8,id1,data,id2);
setOre(x+9,y+1,z+8,id,data,id2);
setOre2(x+12,y+1,z+8,id3,data,id2);
setOre(x+2,y+1,z+9,id,data,id2);
setOre1(x+4,y+1,z+9,id1,data,id2);
setOre(x+5,y+1,z+9,id,data,id2);
setOre(x+8,y+1,z+9,id,data,id2);
setOre1(x+10,y+1,z+9,id1,data,id2);
setOre2(x+11,y+1,z+9,id3,data,id2);
setOre1(x+13,y+1,z+9,id1,data,id2);
setOre1(x+14,y+1,z+9,id1,data,id2);
//+2
setOre(x,y+2,z,id,data,id2);
setOre2(x+5,y+2,z,id3,data,id2);
setOre(x+10,y+2,z,id,data,id2);
setOre(x+14,y+2,z,id,data,id2);
setOre(x,y+2,z+1,id,data,id2);
setOre(x+4,y+2,z+1,id,data,id2);
setOre2(x+6,y+2,z+1,id3,data,id2);
setOre(x+12,y+2,z+1,id,data,id2);
setOre(x+4,y+2,z+2,id,data,id2);
setOre(x+7,y+2,z+2,id,data,id2);
setOre(x+11,y+2,z+2,id,data,id2);
setOre(x+13,y+2,z+2,id,data,id2);
setOre(x+15,y+2,z+2,id,data,id2);
setOre2(x+3,y+2,z+3,id3,data,id2);
setOre(x+8,y+2,z+3,id,data,id2);
setOre(x+12,y+2,z+3,id,data,id2);
setOre(x+4,y+2,z+4,id,data,id2);
setOre(x+8,y+2,z+4,id,data,id2);
setOre(x+10,y+2,z+4,id,data,id2);
setOre2(x+11,y+2,z+4,id3,data,id2);
setOre(x,y+2,z+5,id,data,id2);
setOre(x+4,y+2,z+5,id,data,id2);
setOre(x+6,y+2,z+5,id,data,id2);
setOre(x+11,y+2,z+5,id,data,id2);
setOre(x+13,y+2,z+5,id,data,id2);
setOre2(x+1,y+2,z+6,id3,data,id2);
setOre(x+5,y+2,z+6,id,data,id2);
setOre(x+10,y+2,z+6,id,data,id2);
setOre(x+1,y+2,z+7,id,data,id2);
setOre(x+5,y+2,z+7,id,data,id2);
setOre(x+9,y+2,z+7,id,data,id2);
setOre2(x+11,y+2,z+7,id3,data,id2);
setOre(x+13,y+2,z+7,id,data,id2);
setOre(x+2,y+2,z+8,id,data,id2);
setOre(x+7,y+2,z+8,id,data,id2);
setOre(x+10,y+2,z+8,id,data,id2);
setOre(x+12,y+2,z+8,id,data,id2);
setOre2(x+1,y+2,z+9,id3,data,id2);
setOre(x+4,y+2,z+9,id,data,id2);
setOre(x+7,y+2,z+9,id,data,id2);
setOre(x+10,y+2,z+9,id,data,id2);
setOre(x+11,y+2,z+9,id,data,id2);
setOre(x+12,y+2,z+9,id,data,id2);
setOre2(x+13,y+2,z+9,id3,data,id2);
//+3
setOre(x,y+3,z,id,data,id2);
setOre(x+6,y+3,z,id,data,id2);
setOre2(x+9,y+3,z,id3,data,id2);
setOre(x+1,y+3,z+1,id,data,id2);
setOre(x+3,y+3,z+1,id,data,id2);
setOre(x+6,y+3,z+1,id,data,id2);
setOre(x+11,y+3,z+1,id,data,id2);
setOre(x+2,y+3,z+2,id,data,id2);
setOre2(x+5,y+3,z+2,id3,data,id2);
setOre(x+10,y+3,z+2,id,data,id2);
setOre(x+12,y+3,z+2,id,data,id2);
setOre(x+3,y+3,z+3,id,data,id2);
setOre(x+4,y+3,z+3,id,data,id2);
setOre2(x+7,y+3,z+3,id3,data,id2);
setOre(x+1,y+3,z+4,id,data,id2);
setOre(x+6,y+3,z+4,id,data,id2);
setOre(x+9,y+3,z+4,id,data,id2);
setOre(x,y+3,z+5,id,data,id2);
setOre(x+5,y+3,z+5,id,data,id2);
setOre2(x+8,y+3,z+5,id3,data,id2);
setOre(x+11,y+3,z+5,id,data,id2);
setOre(x+4,y+3,z+6,id,data,id2);
setOre(x+7,y+3,z+6,id,data,id2);
setOre(x+11,y+3,z+6,id,data,id2);
setOre(x+1,y+3,z+7,id,data,id2);
setOre(x+6,y+3,z+7,id,data,id2);
setOre2(x+9,y+3,z+7,id3,data,id2);
setOre(x+3,y+3,z+8,id,data,id2);
setOre(x+7,y+3,z+8,id,data,id2);
setOre(x+10,y+3,z+8,id,data,id2);
setOre(x+2,y+3,z+9,id,data,id2);
setOre(x+5,y+3,z+9,id,data,id2);
setOre2(x+8,y+3,z+9,id3,data,id2);
setOre(x+12,y+3,z+9,id,data,id2);
}
function genOreNormal1(id, data, id1, data, id3, data,  id4, data, id2, minY, maxY, x,z){
x = Math.floor(Math.random()*16)+x
z = Math.floor(Math.random()*16)+z
var y = random(minY,maxY)
//0
setOre1(x+3,y,z,id1,data,id2);
setOre2(x+5,y,z,id3,data,id2);
setOre(x+6,y,z,id,data,id2);
setOre1(x+9,y,z,id1,data,id2);
setOre(x+11,y,z,id,data,id2);
setOre1(x+13,y,z,id1,data,id2);
setOre2(x+14,y,z,id3,data,id2);
setOre(x,y,z+1,id,data,id2);
setOre1(x+2,y,z+1,id1,data,id2);
setOre1(x+4,y,z+1,id1,data,id2);
setOre(x+8,y,z+1,id,data,id2);
setOre1(x+12,y,z+1,id1,data,id2);
setOre(x+16,y,z+1,id,data,id2);
setOre2(x+4,y,z+2,id3,data,id2);
setOre(x+7,y,z+2,id,data,id2);
setOre1(x+9,y,z+2,id1,data,id2);
setOre1(x+11,y,z+2,id1,data,id2);
setOre(x+12,y,z+2,id,data,id2);
setOre1(x+15,y,z+2,id1,data,id2);
setOre2(x+17,y,z+2,id3,data,id2);
setOre1(x+4,y,z+3,id1,data,id2);
setOre(x+9,y,z+3,id,data,id2);
setOre1(x+10,y,z+3,id1,data,id2);
setOre2(x+13,y,z+3,id3,data,id2);
setOre1(x+16,y,z+3,id1,data,id2);
setOre1(x+1,y,z+4,id1,data,id2);
setOre2(x+5,y,z+4,id3,data,id2);
setOre1(x+7,y,z+4,id1,data,id2);
setOre(x+13,y,z+4,id,data,id2);
setOre1(x+15,y,z+4,id1,data,id2);
setOre1(x+16,y,z+4,id1,data,id2);
setOre2(x,y,z+5,id3,data,id2);
setOre1(x+2,y,z+5,id1,data,id2);
setOre1(x+4,y,z+5,id1,data,id2);
setOre(x+5,y,z+5,id,data,id2);
setOre1(x+6,y,z+5,id1,data,id2);
setOre2(x+11,y,z+5,id3,data,id2);
setOre(x+16,y,z+5,id,data,id2);
setOre1(x+1,y,z+6,id1,data,id2);
setOre(x+9,y,z+6,id,data,id2);
setOre1(x+10,y,z+6,id1,data,id2);
setOre2(x+14,y,z+6,id3,data,id2);
setOre(x+15,y,z+6,id,data,id2);
setOre1(x,y,z+7,id1,data,id2);
setOre(x+2,y,z+7,id,data,id2);
setOre1(x+3,y,z+7,id1,data,id2);
setOre1(x+6,y,z+7,id1,data,id2);
setOre2(x+8,y,z+7,id3,data,id2);
setOre1(x+12,y,z+7,id1,data,id2);
setOre1(x+16,y,z+7,id1,data,id2);
setOre(x+3,y,z+8,id,data,id2);
setOre1(x+9,y,z+8,id1,data,id2);
setOre1(x+11,y,z+8,id1,data,id2);
setOre2(x+12,y,z+8,id3,data,id2);
setOre1(x+13,y,z+8,id1,data,id2);
setOre1(x+17,y,z+8,id1,data,id2);
setOre(x+2,y,z+9,id,data,id2);
setOre1(x+4,y,z+9,id1,data,id2);
setOre(x+6,y,z+9,id,data,id2);
setOre1(x+7,y,z+9,id1,data,id2);
setOre2(x+8,y,z+9,id3,data,id2);
setOre1(x+10,y,z+9,id1,data,id2);
setOre(x+14,y,z+9,id,data,id2);
setOre1(x+16,y,z+9,id1,data,id2);
//-1
setOre2(x+1,y-1,z,id3,data,id2);
setOre(x+3,y-1,z,id,data,id2);
setOre1(x+7,y-1,z,id1,data,id2);
setOre(x+12,y-1,z,id,data,id2);
setOre(x+15,y-1,z,id,data,id2);
setOre(x,y-1,z+1,id,data,id2);
setOre2(x+3,y-1,z+1,id3,data,id2);
setOre1(x+4,y-1,z+1,id1,data,id2);
setOre(x+7,y-1,z+1,id,data,id2);
setOre1(x+14,y-1,z+1,id1,data,id2);
setOre(x+2,y-1,z+2,id,data,id2);
setOre2(x+7,y-1,z+2,id3,data,id2);
setOre(x+12,y-1,z+2,id,data,id2);
setOre1(x+13,y-1,z+2,id1,data,id2);
setOre(x+14,y-1,z+2,id,data,id2);
setOre(x+17,y-1,z+2,id,data,id2);
setOre1(x+6,y-1,z+3,id1,data,id2);
setOre2(x+8,y-1,z+3,id3,data,id2);
setOre(x+12,y-1,z+3,id,data,id2);
setOre(x+16,y-1,z+3,id,data,id2);
setOre1(x+1,y-1,z+4,id1,data,id2);
setOre(x+6,y-1,z+4,id,data,id2);
setOre2(x+8,y-1,z+4,id3,data,id2);
setOre(x+14,y-1,z+4,id,data,id2);
setOre(x+15,y-1,z+4,id,data,id2);
setOre1(x,y-1,z+5,id1,data,id2);
setOre(x+3,y-1,z+5,id,data,id2);
setOre2(x+6,y-1,z+5,id3,data,id2);
setOre(x+8,y-1,z+5,id,data,id2);
setOre1(x+10,y-1,z+5,id1,data,id2);
setOre(x+12,y-1,z+5,id,data,id2);
setOre(x+3,y-1,z+6,id,data,id2);
setOre2(x+5,y-1,z+6,id3,data,id2);
setOre(x+12,y-1,z+6,id,data,id2);
setOre(x+13,y-1,z+6,id,data,id2);
setOre1(x+2,y-1,z+7,id1,data,id2);
setOre(x+6,y-1,z+7,id,data,id2);
setOre2(x+8,y-1,z+7,id3,data,id2);
setOre(x+9,y-1,z+7,id,data,id2);
setOre1(x+13,y-1,z+7,id1,data,id2);
setOre(x+15,y-1,z+7,id,data,id2);
setOre1(x+5,y-1,z+8,id1,data,id2);
setOre(x+8,y-1,z+8,id,data,id2);
setOre2(x+10,y-1,z+8,id3,data,id2);
setOre(x+12,y-1,z+8,id,data,id2);
setOre(x+14,y-1,z+8,id,data,id2);
setOre1(x+3,y-1,z+9,id1,data,id2);
setOre(x+4,y-1,z+9,id,data,id2);
setOre(x+7,y-1,z+9,id,data,id2);
setOre1(x+9,y-1,z+9,id1,data,id2);
setOre2(x+11,y-1,z+9,id3,data,id2);
setOre1(x+12,y-1,z+9,id1,data,id2);
setOre(x+14,y-1,z+9,id,data,id2);
setOre1(x+15,y-1,z+9,id1,data,id2);
//-2
setOre3(x,y-2,z,id4,data,id2);
setOre2(x+5,y-2,z,id3,data,id2);
setOre3(x+10,y-2,z,id4,data,id2);
setOre(x+14,y-2,z,id,data,id2);
setOre3(x,y-2,z+1,id4,data,id2);
setOre3(x+4,y-2,z+1,id4,data,id2);
setOre2(x+6,y-2,z+1,id3,data,id2);
setOre3(x+12,y-2,z+1,id4,data,id2);
setOre(x+4,y-2,z+2,id,data,id2);
setOre3(x+7,y-2,z+2,id4,data,id2);
setOre3(x+11,y-2,z+2,id4,data,id2);
setOre2(x+13,y-2,z+2,id3,data,id2);
setOre(x+15,y-2,z+2,id,data,id2);
setOre3(x+3,y-2,z+3,id4,data,id2);
setOre3(x+8,y-2,z+3,id4,data,id2);
setOre(x+12,y-2,z+3,id,data,id2);
setOre2(x+4,y-2,z+4,id3,data,id2);
setOre3(x+8,y-2,z+4,id4,data,id2);
setOre3(x+10,y-2,z+4,id4,data,id2);
setOre(x+11,y-2,z+4,id,data,id2);
setOre3(x,y-2,z+5,id4,data,id2);
setOre(x+4,y-2,z+5,id,data,id2);
setOre3(x+6,y-2,z+5,id4,data,id2);
setOre2(x+11,y-2,z+5,id3,data,id2);
setOre3(x+13,y-2,z+5,id4,data,id2);
setOre(x+1,y-2,z+6,id,data,id2);
setOre3(x+5,y-2,z+6,id4,data,id2);
setOre3(x+10,y-2,z+6,id4,data,id2);
setOre3(x+1,y-2,z+7,id4,data,id2);
setOre2(x+5,y-2,z+7,id3,data,id2);
setOre3(x+9,y-2,z+7,id4,data,id2);
setOre(x+11,y-2,z+7,id,data,id2);
setOre3(x+13,y-2,z+7,id4,data,id2);
setOre3(x+2,y-2,z+8,id4,data,id2);
setOre3(x+7,y-2,z+8,id4,data,id2);
setOre2(x+10,y-2,z+8,id3,data,id2);
setOre(x+12,y-2,z+8,id,data,id2);
setOre3(x+1,y-2,z+9,id4,data,id2);
setOre(x+4,y-2,z+9,id,data,id2);
setOre3(x+7,y-2,z+9,id4,data,id2);
setOre(x+10,y-2,z+9,id,data,id2);
setOre2(x+11,y-2,z+9,id3,data,id2);
setOre3(x+12,y-2,z+9,id4,data,id2);
setOre3(x+13,y-2,z+9,id4,data,id2);
//-3
setOre2(x,y-3,z,id3,data,id2);
setOre3(x+6,y-3,z,id4,data,id2);
setOre(x+9,y-3,z,id,data,id2);
setOre3(x+1,y-3,z+1,id4,data,id2);
setOre3(x+3,y-3,z+1,id4,data,id2);
setOre3(x+6,y-3,z+1,id4,data,id2);
setOre(x+11,y-3,z+1,id,data,id2);
setOre2(x+2,y-3,z+2,id3,data,id2);
setOre3(x+5,y-3,z+2,id4,data,id2);
setOre(x+10,y-3,z+2,id,data,id2);
setOre3(x+12,y-3,z+2,id4,data,id2);
setOre(x+3,y-3,z+3,id,data,id2);
setOre3(x+4,y-3,z+3,id4,data,id2);
setOre2(x+7,y-3,z+3,id3,data,id2);
setOre3(x+1,y-3,z+4,id4,data,id2);
setOre3(x+6,y-3,z+4,id4,data,id2);
setOre(x+9,y-3,z+4,id,data,id2);
setOre3(x,y-3,z+5,id4,data,id2);
setOre2(x+5,y-3,z+5,id3,data,id2);
setOre3(x+8,y-3,z+5,id4,data,id2);
setOre3(x+11,y-3,z+5,id4,data,id2);
setOre(x+4,y-3,z+6,id,data,id2);
setOre3(x+7,y-3,z+6,id4,data,id2);
setOre3(x+11,y-3,z+6,id4,data,id2);
setOre2(x+1,y-3,z+7,id3,data,id2);
setOre3(x+6,y-3,z+7,id4,data,id2);
setOre(x+9,y-3,z+7,id,data,id2);
setOre3(x+3,y-3,z+8,id4,data,id2);
setOre3(x+7,y-3,z+8,id4,data,id2);
setOre(x+10,y-3,z+8,id,data,id2);
setOre2(x+2,y-3,z+9,id3,data,id2);
setOre(x+5,y-3,z+9,id,data,id2);
setOre3(x+8,y-3,z+9,id4,data,id2);
setOre3(x+12,y-3,z+9,id4,data,id2);
//+1
setOre1(x+2,y+1,z,id1,data,id2);
setOre(x+4,y+1,z,id,data,id2);
setOre(x+6,y+1,z,id,data,id2);
setOre2(x+12,y+1,z,id3,data,id2);
setOre1(x+13,y+1,z,id1,data,id2);
setOre(x+1,y+1,z+1,id,data,id2);
setOre1(x+2,y+1,z+1,id1,data,id2);
setOre(x+5,y+1,z+1,id,data,id2);
setOre1(x+9,y+1,z+1,id1,data,id2);
setOre2(x+10,y+1,z+1,id3,data,id2);
setOre(x,y+1,z+2,id,data,id2);
setOre1(x+4,y+1,z+2,id1,data,id2);
setOre(x+8,y+1,z+2,id,data,id2);
setOre(x+11,y+1,z+2,id,data,id2);
setOre(x+12,y+1,z+2,id,data,id2);
setOre1(x+14,y+1,z+2,id1,data,id2);
setOre2(x+3,y+1,z+3,id3,data,id2);
setOre1(x+5,y+1,z+3,id1,data,id2);
setOre(x+7,y+1,z+3,id,data,id2);
setOre(x+12,y+1,z+3,id,data,id2);
setOre1(x+1,y+1,z+4,id1,data,id2);
setOre2(x+3,y+1,z+4,id3,data,id2);
setOre(x+6,y+1,z+4,id,data,id2);
setOre(x+10,y+1,z+4,id,data,id2);
setOre1(x+11,y+1,z+4,id1,data,id2);
setOre(x,y+1,z+5,id,data,id2);
setOre(x+2,y+1,z+5,id,data,id2);
setOre2(x+4,y+1,z+5,id3,data,id2);
setOre1(x+6,y+1,z+5,id1,data,id2);
setOre(x+12,y+1,z+5,id,data,id2);
setOre(x+13,y+1,z+5,id,data,id2);
setOre1(x,y+1,z+6,id1,data,id2);
setOre(x+2,y+1,z+6,id,data,id2);
setOre2(x+3,y+1,z+6,id3,data,id2);
setOre(x+5,y+1,z+6,id,data,id2);
setOre1(x+1,y+1,z+7,id1,data,id2);
setOre(x+4,y+1,z+7,id,data,id2);
setOre(x+8,y+1,z+7,id,data,id2);
setOre1(x+10,y+1,z+7,id1,data,id2);
setOre2(x+11,y+1,z+7,id3,data,id2);
setOre(x+13,y+1,z+7,id,data,id2);
setOre1(x,y+1,z+8,id1,data,id2);
setOre(x+3,y+1,z+8,id,data,id2);
setOre1(x+7,y+1,z+8,id1,data,id2);
setOre(x+9,y+1,z+8,id,data,id2);
setOre2(x+12,y+1,z+8,id3,data,id2);
setOre(x+2,y+1,z+9,id,data,id2);
setOre1(x+4,y+1,z+9,id1,data,id2);
setOre(x+5,y+1,z+9,id,data,id2);
setOre(x+8,y+1,z+9,id,data,id2);
setOre1(x+10,y+1,z+9,id1,data,id2);
setOre2(x+11,y+1,z+9,id3,data,id2);
setOre1(x+13,y+1,z+9,id1,data,id2);
setOre1(x+14,y+1,z+9,id1,data,id2);
//+2
setOre(x,y+2,z,id,data,id2);
setOre2(x+5,y+2,z,id3,data,id2);
setOre(x+10,y+2,z,id,data,id2);
setOre(x+14,y+2,z,id,data,id2);
setOre(x,y+2,z+1,id,data,id2);
setOre(x+4,y+2,z+1,id,data,id2);
setOre2(x+6,y+2,z+1,id3,data,id2);
setOre(x+12,y+2,z+1,id,data,id2);
setOre(x+4,y+2,z+2,id,data,id2);
setOre(x+7,y+2,z+2,id,data,id2);
setOre(x+11,y+2,z+2,id,data,id2);
setOre(x+13,y+2,z+2,id,data,id2);
setOre(x+15,y+2,z+2,id,data,id2);
setOre2(x+3,y+2,z+3,id3,data,id2);
setOre(x+8,y+2,z+3,id,data,id2);
setOre(x+12,y+2,z+3,id,data,id2);
setOre(x+4,y+2,z+4,id,data,id2);
setOre(x+8,y+2,z+4,id,data,id2);
setOre(x+10,y+2,z+4,id,data,id2);
setOre2(x+11,y+2,z+4,id3,data,id2);
setOre(x,y+2,z+5,id,data,id2);
setOre(x+4,y+2,z+5,id,data,id2);
setOre(x+6,y+2,z+5,id,data,id2);
setOre(x+11,y+2,z+5,id,data,id2);
setOre(x+13,y+2,z+5,id,data,id2);
setOre2(x+1,y+2,z+6,id3,data,id2);
setOre(x+5,y+2,z+6,id,data,id2);
setOre(x+10,y+2,z+6,id,data,id2);
setOre(x+1,y+2,z+7,id,data,id2);
setOre(x+5,y+2,z+7,id,data,id2);
setOre(x+9,y+2,z+7,id,data,id2);
setOre2(x+11,y+2,z+7,id3,data,id2);
setOre(x+13,y+2,z+7,id,data,id2);
setOre(x+2,y+2,z+8,id,data,id2);
setOre(x+7,y+2,z+8,id,data,id2);
setOre(x+10,y+2,z+8,id,data,id2);
setOre(x+12,y+2,z+8,id,data,id2);
setOre2(x+1,y+2,z+9,id3,data,id2);
setOre(x+4,y+2,z+9,id,data,id2);
setOre(x+7,y+2,z+9,id,data,id2);
setOre(x+10,y+2,z+9,id,data,id2);
setOre(x+11,y+2,z+9,id,data,id2);
setOre(x+12,y+2,z+9,id,data,id2);
setOre2(x+13,y+2,z+9,id3,data,id2);
//+3
setOre(x,y+3,z,id,data,id2);
setOre(x+6,y+3,z,id,data,id2);
setOre2(x+9,y+3,z,id3,data,id2);
setOre(x+1,y+3,z+1,id,data,id2);
setOre(x+3,y+3,z+1,id,data,id2);
setOre(x+6,y+3,z+1,id,data,id2);
setOre(x+11,y+3,z+1,id,data,id2);
setOre(x+2,y+3,z+2,id,data,id2);
setOre2(x+5,y+3,z+2,id3,data,id2);
setOre(x+10,y+3,z+2,id,data,id2);
setOre(x+12,y+3,z+2,id,data,id2);
setOre(x+3,y+3,z+3,id,data,id2);
setOre(x+4,y+3,z+3,id,data,id2);
setOre2(x+7,y+3,z+3,id3,data,id2);
setOre(x+1,y+3,z+4,id,data,id2);
setOre(x+6,y+3,z+4,id,data,id2);
setOre(x+9,y+3,z+4,id,data,id2);
setOre(x,y+3,z+5,id,data,id2);
setOre(x+5,y+3,z+5,id,data,id2);
setOre2(x+8,y+3,z+5,id3,data,id2);
setOre(x+11,y+3,z+5,id,data,id2);
setOre(x+4,y+3,z+6,id,data,id2);
setOre(x+7,y+3,z+6,id,data,id2);
setOre(x+11,y+3,z+6,id,data,id2);
setOre(x+1,y+3,z+7,id,data,id2);
setOre(x+6,y+3,z+7,id,data,id2);
setOre2(x+9,y+3,z+7,id3,data,id2);
setOre(x+3,y+3,z+8,id,data,id2);
setOre(x+7,y+3,z+8,id,data,id2);
setOre(x+10,y+3,z+8,id,data,id2);
setOre(x+2,y+3,z+9,id,data,id2);
setOre(x+5,y+3,z+9,id,data,id2);
setOre2(x+8,y+3,z+9,id3,data,id2);
setOre(x+12,y+3,z+9,id,data,id2);
}









// file: Main/Ores.js

var BLOCK_TYPE_STONE = Block.createSpecialType({
	base: 1,
	solid: true,
	destroytime: 3,
	explosionres: 3
}, "stone");


IDRegistry.genBlockID("oreSilverSmall");
Block.createBlock("oreSilverSmall", [
	{name: "Small Silver Ore", texture: [["SILVER_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreSilverSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreSilverSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedSilverOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureSilverDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 2);


IDRegistry.genBlockID("oreLeadSmall");
Block.createBlock("oreLeadSmall", [
	{name: "Small Lead Ore", texture: [["LEAD_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLeadSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreLeadSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedLeadOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureLeadDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
		}
	return [];
}, 1);


IDRegistry.genBlockID("oreTinSmall");
Block.createBlock("oreTinSmall", [
	{name: "Small Tin Ore", texture: [["TIN_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreTinSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreTinSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedTinOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureTinDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
return [];
}, 1);


IDRegistry.genBlockID("oreCopperSmall");
Block.createBlock("oreCopperSmall", [
	{name: "Small Copper Ore", texture: [["COPPER_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCopperSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreCopperSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedCopperOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureCopperDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
		}
	return [];
}, 1);


IDRegistry.genBlockID("oreDiamondSmall");
Block.createBlock("oreDiamondSmall", [
	{name: "Small Diamond Ore", texture: [["DIAMOND_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreDiamondSmall, "stone", 3, true);

Block.registerDropFunctionForID(BlockID.oreDiamondSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 2){
     return [[blockID, 1, 0]]; 
}
return [];
}, 3);


IDRegistry.genBlockID("oreEmeraldSmall");
Block.createBlock("oreEmeraldSmall", [
	{name: "Small Emerald Ore", texture: [["EMERALD_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreEmeraldSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreEmeraldSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
     return [[blockID, 1, 0]]; 
}
return [];
}, 2);


IDRegistry.genBlockID("oreLapisSmall");
Block.createBlock("oreLapisSmall", [
	{name: "Small Lapis-Lazuli Ore", texture: [["LAPIS_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLapisSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreLapisSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<98/100){
			drop.push([351, 1, 4]);
		}
		drop.push([351, 1, 4]);
		if(Math.random()<98/100){
			drop.push([ItemID.CrushedLapisLazuliOre, 1, 0]);
		}
		drop.push([ItemID.CrushedLapisLazuliOre, 1, 0]);
		if(Math.random()<98/100){
			drop.push([ItemID.ImpureLapisLazuliDust, 1, 0]);
		}
		drop.push([ItemID.ImpureLapisLazuliDust, 1, 0]);
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 1);


IDRegistry.genBlockID("oreRedstoneSmall");
Block.createBlock("oreRedstoneSmall", [
	{name: "Small Redstone Ore", texture: [["REDSTONE_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreRedstoneSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreRedstoneSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedRedstoneOre, 1, 0]);
		}
		drop.push([ItemID.CrushedRedstoneOre, 2, 0]);
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureRedstoneDustRedstone, 1, 0]);
		}
		drop.push([ItemID.ImpureRedstoneDust, 2, 0]);
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 2);


IDRegistry.genBlockID("oreGoldSmall");
Block.createBlock("oreGoldSmall", [
	{name: "Small Gold Ore", texture: [["GOLD_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreGoldSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreGoldSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedGoldOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureGoldDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
		}
	return [];
}, 2);


IDRegistry.genBlockID("oreIronSmall");
Block.createBlock("oreIronSmall", [
	{name: "Small Iron Ore", texture: [["IRON_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreIronSmall, "stone", 2, true);

Block.registerDropFunctionForID(BlockID.oreIronSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 1){
		var drop = [ ];
		if(Math.random()<1/2){
			drop.push([ItemID.CrushedIronOre, 1, 0]);
		}
		if(Math.random()<1/2){
			drop.push([ItemID.ImpureIronDust, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 2);


IDRegistry.genBlockID("oreCoalSmall");
Block.createBlock("oreCoalSmall", [
	{name: "Small Coal Ore", texture: [["COAL_ORE_SMALL", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCoalSmall, "stone", 1, true);

Block.registerDropFunctionForID(BlockID.oreCoalSmall, function(coords, blockID, blockData, level, enchant){
	if(level > 0){
		var drop = [ ];
		if(Math.random()<1/3){
			drop.push([ItemID.CrushedCoalOre, 1, 0]);
		}
		if(Math.random()<1/3){
			drop.push([ItemID.ImpureCoalDust, 1, 0]);
		}
		if(Math.random()<1/3){
			drop.push([263, 1, 0]);
		}
		if(Math.random()<1/9){
			drop.push([ItemID.dustStone, 1, 0]);
		}
		if(Math.random()<2/9){
			drop.push([ItemID.impureDustStone, 1, 0]);
		}
		return drop;
	}
	return [];
}, 1);



IDRegistry.genBlockID("oreMalachite");
Block.createBlock("oreMalachite", [
	{name: "Malachite Ore", texture: [["MALACHITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreMalachite, "stone", 3, true);
Block.setDestroyLevel("oreMalachite", 3);


IDRegistry.genBlockID("oreBandedIron");
Block.createBlock("oreBandedIron", [
	{name: "Banded Iron Ore", texture: [["BANDED_IRON_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreBandedIron, "stone", 3, true);
Block.setDestroyLevel("oreBandedIron", 3);


IDRegistry.genBlockID("oreYellowLimonite");
Block.createBlock("oreYellowLimonite", [
	{name: "Yellow Limonite Ore", texture: [["YELLOW_LIMONITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreYellowLimonite, "stone", 3, true);
Block.setDestroyLevel("oreYellowLimonite", 3);


IDRegistry.genBlockID("oreBrownLimonite");
Block.createBlock("oreBrownLimonite", [
	{name: "Brown Limonite Ore", texture: [["BROWN_LIMONITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreBrownLimonite, "stone", 2, true);
Block.setDestroyLevel("oreBrownLimonite", 2);


IDRegistry.genBlockID("orePyrite");
Block.createBlock("orePyrite", [
	{name: "Pyrite Ore", texture: [["PYRITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.orePyrite, "stone", 2, true);
Block.setDestroyLevel("orePyrite", 2);


IDRegistry.genBlockID("oreChalcopyrite");
Block.createBlock("oreChalcopyrite", [
	{name: "Chalcopyrite Ore", texture: [["CHALCOPYRITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreChalcopyrite, "stone", 2, true);
Block.setDestroyLevel("oreChalcopyrite", 2);


IDRegistry.genBlockID("oreVanadiumMagnetite");
Block.createBlock("oreVanadiumMagnetite", [
	{name: "Vanadium-Magnetite Ore", texture: [["VANADIUM_MAGNETITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreVanadiumMagnetite, "stone", 3, true);
Block.setDestroyLevel("oreVanadiumMagnetite", 3);


IDRegistry.genBlockID("oreMagnetite");
Block.createBlock("oreMagnetite", [
	{name: "Magnetite Ore", texture: [["MAGNETITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreMagnetite, "stone", 3, true);
Block.setDestroyLevel("oreMagnetite", 3);


IDRegistry.genBlockID("oreIron");
Block.createBlock("oreIron", [
	{name: "Iron Ore", texture: [["IRON_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreIron, "stone", 3, true);
Block.setDestroyLevel("oreIron", 3);


IDRegistry.genBlockID("oreCassiterite");
Block.createBlock("oreCassiterite", [
	{name: "Cassiterite Ore", texture: [["CASSITERITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCassiterite, "stone", 2, true);
Block.setDestroyLevel("oreCassiterite", 2);


IDRegistry.genBlockID("oreAntimonite");
Block.createBlock("oreAntimonite", [
	{name: "Antimonite Ore", texture: [["ANTIMONITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreAntimonite, "stone", 3, true);
Block.setDestroyLevel("oreAntimonite", 3);


IDRegistry.genBlockID("oreTetrahedrite");
Block.createBlock("oreTetrahedrite", [
	{name: "Tetrahedrite Ore", texture: [["TETRAHEDRITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreTetrahedrite, "stone", 3, true);
Block.setDestroyLevel("oreTetrahedrite", 3);


IDRegistry.genBlockID("oreGalena");
Block.createBlock("oreGalena", [
	{name: "Galena Ore", texture: [["GALENA_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreGalena, "stone", 4, true);
Block.setDestroyLevel("oreGalena", 4);


IDRegistry.genBlockID("oreSilver");
Block.createBlock("oreSilver", [
	{name: "Silver Ore", texture: [["SILVER_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreSilver, "stone", 3, true);
Block.setDestroyLevel("oreSilver", 3);


IDRegistry.genBlockID("oreCoal");
Block.createBlock("oreCoal", [
	{name: "Coal Ore", texture: [["COAL_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCoal, "stone", 1, true);
Block.setDestroyLevel("oreCoal", 1);


IDRegistry.genBlockID("oreLigniteCoal");
Block.createBlock("oreLigniteCoal", [
	{name: "Lignite Coal Ore", texture: [["LIGNITE_COAL_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLigniteCoal, "stone", 1, true);
Block.setDestroyLevel("oreLigniteCoal", 1);


IDRegistry.genBlockID("oreLazurite");
Block.createBlock("oreLazurite", [
	{name: "Lazurite Ore", texture: [["LAZURITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLazurite, "stone", 2, true);
Block.setDestroyLevel("oreLazurite", 2);


IDRegistry.genBlockID("oreLapisLazuli");
Block.createBlock("oreLapisLazuli", [
	{name: "Lapis-Lazuli Ore", texture: [["LAPIS-LAZULI_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreLapisLazuli, "stone", 2, true);
Block.setDestroyLevel("oreLapisLazuli", 2);


IDRegistry.genBlockID("oreSodalite");
Block.createBlock("oreSodalite", [
	{name: "Sodalite Ore", texture: [["SODALITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreSodalite, "stone", 2, true);
Block.setDestroyLevel("oreSodalite", 2);


IDRegistry.genBlockID("oreCalcite");
Block.createBlock("oreCalcite", [
	{name: "Calcite Ore", texture: [["CALCITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCalcite, "stone", 2, true);
Block.setDestroyLevel("oreCalcite", 2);


IDRegistry.genBlockID("oreRedstone");
Block.createBlock("oreRedstone", [
	{name: "Redstone Ore", texture: [["REDSTONE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreRedstone, "stone", 3, true);
Block.setDestroyLevel("oreRedstone", 3);


IDRegistry.genBlockID("oreCinnabar");
Block.createBlock("oreCinnabar", [
	{name: "Cinnabar Ore", texture: [["CINNABAR_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreCinnabar, "stone", 2, true);
Block.setDestroyLevel("oreCinnabar", 2);


IDRegistry.genBlockID("oreRuby");
Block.createBlock("oreRuby", [
	{name: "Ruby Ore", texture: [["RUBY_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreRuby, "stone", 3, true);
Block.setDestroyLevel("oreRuby", 3);


IDRegistry.genBlockID("oreDiamond");
Block.createBlock("oreDiamond", [
	{name: "Diamond Ore", texture: [["DIAMOND_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreDiamond, "stone", 3, true);
Block.setDestroyLevel("oreDiamond", 3);


IDRegistry.genBlockID("oreGraphite");
Block.createBlock("oreGraphite", [
	{name: "Graphite Ore", texture: [["GRAPHITE_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreGraphite, "stone", 3, true);
Block.setDestroyLevel("oreGraphite", 3);


IDRegistry.genBlockID("oreGold");
Block.createBlock("oreGold", [
	{name: "Gold Ore", texture: [["GOLD_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.oreGold, "stone", 3, true);
Block.setDestroyLevel("oreGold", 3);

// IC ores
Block.createBlock("oreCopper", [
	{name: "Copper Ore", texture: [["COPPER_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.setDestroyLevel("oreCopper", 2);

Block.createBlock("oreTin", [
	{name: "Tin Ore", texture: [["TIN_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.setDestroyLevel("oreTin", 2);

Block.createBlock("oreLead", [
	{name: "Lead Ore", texture: [["LEAD_ORE", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.setDestroyLevel("oreLead", 2);

ICore.Ore.copper_ore = false;
ICore.Ore.tin_ore = false;
ICore.Ore.lead_ore = false;




// file: Main/Translation.js

// Small Ore
Translation.addTranslation("Small Silver Ore", {ru: "Малая серебрянная руда",  zh: "小银矿"});
Translation.addTranslation("Small Lead Ore", {ru: "Малая свинцовая руда",  zh: "小鉛礦石"});
Translation.addTranslation("Small Tin Ore", {ru: "Малая оловянная руда",  zh: "小錫礦"});
Translation.addTranslation("Small Copper Ore", {ru: "Малая медная руда",  zh: "小銅礦石"});
Translation.addTranslation("Small Diamond Ore", {ru: "Малая алмазная руда",  zh: "小鑽石礦石"});
Translation.addTranslation("Small Emerald Ore", {ru: "Малая изумрудная руда",  zh: "小祖母綠礦石"});
Translation.addTranslation("Small Redstone Ore", {ru: "Малая красная руда",  zh: "小紅石礦石"});
Translation.addTranslation("Small Gold Ore", {ru: "Малая золотая руда",  zh: "小金礦"});
Translation.addTranslation("Small Iron Ore", {ru: "Малая железная руда",  zh: "小鐵礦石"});
Translation.addTranslation("Small Lapis-Lazuli Ore", {ru: "Малая руда ляпис-лазури",  zh: "小青金石礦石"});
Translation.addTranslation("Small Coal Ore", {ru: "Малая угольная руда",  zh: "小煤礦"});

// Ore
Translation.addTranslation("Malachite Ore", {ru: "Малахитовая руда",  zh: "孔雀石礦石"});
Translation.addTranslation("Banded Iron Ore", {ru: "Руда полосчатого железа",  zh: "帶狀鐵礦石"});
Translation.addTranslation("Yellow Limonite Ore", {ru: "Руда жёлтого лимонита",  zh: "黃褐鐵礦礦石"});
Translation.addTranslation("Brown Limonite Ore", {ru: "Руда коричневого лимонита",  zh: "棕色褐鐵礦礦石"});
Translation.addTranslation("Pyrite Ore", {ru: "Пиритовая руда",  zh: "硫鐵礦"});
Translation.addTranslation("Chalcopyrite Ore", {ru: "Халькопиритовая руда",  zh: "黃銅礦"});
Translation.addTranslation("Vanadium-Magnetite Ore", {ru: "Ванадий-Магнетитовая руда",  zh: "釩磁鐵礦"});
Translation.addTranslation("Magnetite Ore", {ru: "Магнетитовая руда",  zh: "磁鐵礦"});
Translation.addTranslation("Iron Ore", {ru: "Железная руда",  zh: "鐵礦"});
Translation.addTranslation("Cassiterite Ore", {ru: "Касситеритная руда",  zh: "錫石礦石"});
Translation.addTranslation("Antimonite Ore", {ru: "Антимонитовая руда",  zh: "銻礦"});
Translation.addTranslation("Tetrahedrite Ore", {ru: "Тетраэдритная руда",  zh: "四鐵礦礦石"});
Translation.addTranslation("Galena Ore", {ru: "Галенитовая руда",  zh: "方鉛礦礦石"});
Translation.addTranslation("Silver Ore", {ru: "Серебрянная руда",  zh: "银矿"});
Translation.addTranslation("Coal Ore", {ru: "Угольная руда",  zh: "煤礦"});
Translation.addTranslation("Lignite Coal Ore", {ru: "Руда бурого угля",  zh: "褐煤煤礦"});
Translation.addTranslation("Lazurite Ore", {ru: "Лазуритовая руда",  zh: "Lazurite礦石"});
Translation.addTranslation("Lapis-Lazuli Ore", {ru: "Руда ляпис-лазури",  zh: "Lapis-Lazuli礦石"});
Translation.addTranslation("Sodalite Ore", {ru: "Содалитовая руда",  zh: "方鈉石礦石"});
Translation.addTranslation("Calcite Ore", {ru: "Кальцитовая руда",  zh: "方解石礦石"});
Translation.addTranslation("Redstone Ore", {ru: "Руда красного камня",  zh: "紅石礦石"});
Translation.addTranslation("Cinnabar Ore", {ru: "Киноварная руда",  zh: "硃砂礦石"});
Translation.addTranslation("Ruby Ore", {ru: "Рубиновая руда",  zh: "紅寶石礦石"});
Translation.addTranslation("Diamond Ore", {ru: "Алмазная руда",  zh: "鑽石礦石"});
Translation.addTranslation("Graphite Ore", {ru: "Графитовая руда",  zh: "石墨礦"});
Translation.addTranslation("Gold Ore", {ru: "Золотая руда",  zh: "金礦"});

//Axe
Translation.addTranslation("Wood Axe", {ru: "Деревянный топор",  zh: "木斧头"});

Translation.addTranslation("Stone Axe", {ru: "Каменный топор",  zh: "石斧"});

Translation.addTranslation("Iron Axe", {ru: "Железный топор",  zh: "铁斧头"});

Translation.addTranslation("Steel Axe", {ru: "Стальной топор",  zh: "钢斧头"});

Translation.addTranslation("Emerald Axe", {ru: "Изумрудный топор",  zh: "绿宝石斧头"});

Translation.addTranslation("Flint Axe", {ru: "Кремневый топор",  zh: "弗林特斧头"});

Translation.addTranslation("Diamond Axe", {ru: "Алмазный топор",  zh: "钻石斧头"});

Translation.addTranslation("Bronze Axe", {ru: "Бронзовый топор",  zh: "青铜斧"});

//Shovel
Translation.addTranslation("Wood Shovel", {ru: "Деревянная лопата",  zh: "木铲"});

Translation.addTranslation("Stone Shovel", {ru: "Каменная лопата",  zh: "石铲"});

Translation.addTranslation("Iron Shovel", {ru: "Железная лопата",  zh: "铁铲"});

Translation.addTranslation("Steel Shovel", {ru: "Стальная лопата",  zh: "钢铁铲"});

Translation.addTranslation("Emerald Shovel", {ru: "Изумрудная лопата",  zh: "铲子翡翠"});

Translation.addTranslation("Flint Shovel", {ru: "Кремневая лопата",  zh: "弗林特铲"});

Translation.addTranslation("Diamond Shovel", {ru: "Алмазная лопата",  zh: "钻石铲"});

Translation.addTranslation("Bronze Shovel", {ru: "Бронзовая лопата",  zh: "青铜铲"});

//Hoe
Translation.addTranslation("Wood Hoe", {ru: "Деревянная мотыга",  zh: "木锄头"});

Translation.addTranslation("Stone Hoe", {ru: "Каменная мотыга",  zh: "石锄头"});

Translation.addTranslation("Iron Hoe", {ru: "Железная мотыга",  zh: "铁锄头"});

Translation.addTranslation("Steel Hoe", {ru: "Стальная мотыга",  zh: "钢铁锄头"});

Translation.addTranslation("Emerald Hoe", {ru: "Изумрудная мотыга",  zh: "翡翠锄头"});

Translation.addTranslation("Flint Hoe", {ru: "Кремневая мотыга",  zh: "弗林特锄头"});

Translation.addTranslation("Diamond Hoe", {ru: "Алмазная мотыга",  zh: "钻石锄头"});

Translation.addTranslation("Bronze Hoe", {ru: "Бронзовая мотыга",  zh: "青铜硬骨头"});

//Pickaxe
Translation.addTranslation("Wood Pickaxe", {ru: "Деревянная кирка",  zh: "木镐"});

Translation.addTranslation("Stone Pickaxe", {ru: "Каменная кирка",  zh: "石镐"});

Translation.addTranslation("Iron Pickaxe", {ru: "Железная кирка",  zh: "铁镐头"});

Translation.addTranslation("Steel Pickaxe", {ru: "Стальная кирка",  zh: "钢铁镐头"});

Translation.addTranslation("Emerald Pickaxe", {ru: "Изумрудная кирка",  zh: "翡翠镐头"});

Translation.addTranslation("Flint Pickaxe", {ru: "Кремневая кирка",  zh: "弗林特镐头"});

Translation.addTranslation("Diamond Pickaxe", {ru: "Алмазная кирка",  zh: "钻石镐头"});

Translation.addTranslation("Bronze Pickaxe", {ru: "Бронзовая кирка",  zh: "青铜镐头"});

//Sword
Translation.addTranslation("Wood Sword", {ru: "Деревянный меч",  zh: "木剑"});

Translation.addTranslation("Stone Sword", {ru: "Каменный меч",  zh: "石剑"});

Translation.addTranslation("Iron Sword", {ru: "Железный меч",  zh: "铁剑"});

Translation.addTranslation("Steel Sword", {ru: "Стальной меч",  zh: "钢刀"});

Translation.addTranslation("Emerald Sword", {ru: "Изумрудный меч",  zh: "绿宝剑"});

Translation.addTranslation("Flint Sword", {ru: "Кремневый меч",  zh: "弗林特剑"});

Translation.addTranslation("Diamond Sword", {ru: "Алмазный меч",  zh: "钻石的剑"});

Translation.addTranslation("Bronze Sword", {ru: "Бронзовый меч",  zh: "青铜剑"});

//INGOTS
Translation.addTranslation("Lignite", {ru: "Бурый уголь",  zh: "褐煤"});
Translation.addTranslation("Rubber Ingot", {ru: "Резиновый брусок",  zh: "橡胶酒吧"});
Translation.addTranslation("Copper Ingot", {ru: "Медный слиток",  zh: "铜铸锭"});
Translation.addTranslation("Silver Ingot", {ru: "Серебрянный слиток",  zh: "铁粉碎"});
Translation.addTranslation("Bronze Ingot", {ru: "Бронзовый слиток",  zh: "一个铜铸锭"});
Translation.addTranslation("Lead Ingot", {ru: "Свинцовый слиток",  zh: "导致锭"});
Translation.addTranslation("Antimony Ingot", {ru: "Слиток сурьмы",  zh: "锑锭"});
Translation.addTranslation("Tin Ingot", {ru: "Оловянный слиток",  zh: "锡锭"});


//NUGGETS
Translation.addTranslation("Steel Nugget", {ru: "Стальной самородок",  zh: "鋼塊"});
Translation.addTranslation("Gold Nugget", {ru: "Золотой самородок",  zh: "金塊"});
Translation.addTranslation("Rubber Nugget", {ru: "Резиновый обломок",  zh: "橡胶片"});
Translation.addTranslation("Copper Nugget", {ru: "Медный самородок",  zh: "铜金块"});
Translation.addTranslation("Bronze Nugget", {ru: "Бронзовый самородок",  zh: "铜金块"});
Translation.addTranslation("Silver Nugget", {ru: "Серебряный самородок",  zh: "银块"});
Translation.addTranslation("Iron Nugget", {ru: "Железный самородок",  zh: "铁块"});
Translation.addTranslation("Lead Nugget", {ru: "Свинцовый самородок",  zh: "铅块"});
Translation.addTranslation("Antimony Nugget", {ru: "Самородок из сурьмы",  zh: "金块的锑"});
Translation.addTranslation("Tin Nugget", {ru: "Оловянный самородок",  zh: "锡金块"});



//LONG ROD
Translation.addTranslation("Long Steel Rod", {ru: "Длинный стальной Стержень",  zh: "長鋼棒"});
Translation.addTranslation("Long Rubber Rod", {ru: "Длинный Резиновый Стержень",  zh: "长橡胶棒"});
Translation.addTranslation("Long Copper Rod", {ru: "Длинный Медный Стержень",  zh: "长长铜杆"});
Translation.addTranslation("Long Bronze Rod", {ru: "Длинный Бронзовый Стержень",  zh: "长长铜杆"});
Translation.addTranslation("Long Silver Rod", {ru: "Длинный Серебряный Стержень",  zh: "只要银杆"});

Translation.addTranslation("Long Gold Rod", {ru: "Длинный Золотой Стержень",  zh: "金色的长杆"});
Translation.addTranslation("Long Iron Rod", {ru: "Длинный Железный Стержень",  zh: "长的铁杆"});
Translation.addTranslation("Long Lead Rod", {ru: "Длинный Свинцовый Стержень",  zh: "长导杆"});
Translation.addTranslation("Long Antimony Rod", {ru: "Длинный Стержень из Сурьмы",  zh: "一个漫长的杆的锑"});

Translation.addTranslation("Long Tin Rod", {ru: "Длинный Оловянный Стержень",  zh: "只要锡杆"});

//PLATES

Translation.addTranslation("LapisLazuli Plate", {ru: "Лазуритная Пластина",  zh: "青金石板"});

Translation.addTranslation("Redstone Plate", {ru: "Пластина из красного камня",  zh: "紅石板"});

Translation.addTranslation("Emerald Plate", {ru: "Изумрудная Пластина",  zh: "綠寶石板"});

Translation.addTranslation("Diamond Plate", {ru: "Алмазная Пластина",  zh: "鑽石板"});

Translation.addTranslation("Rubber Plate", {ru: "Резиновый лист",  zh: "橡胶板"});
Translation.addTranslation("Silver Plate", {ru: "Серебрянная пластина",  zh: "银板"});
Translation.addTranslation("Copper Plate", {ru: "Медная пластина",  zh: "铜板"});
Translation.addTranslation("Bronze Plate", {ru: "Бронзовая пластина",  zh: "铜板"});


Translation.addTranslation("Gold Plate", {ru: "Золотая пластина",  zh: "金板"});
Translation.addTranslation("Iron Plate", {ru: "Железная пластина",  zh: "铁板"});
Translation.addTranslation("Lead Plate", {ru: "Свинцовая пластина",  zh: "铅板"});
Translation.addTranslation("Antimony Plate", {ru: "Пластина из сурьмы",  zh: "板锑"});

Translation.addTranslation("Tin Plate", {ru: "Оловянная пластина",  zh: "锡板"});

//DUSTS

Translation.addTranslation("Lignite Dust", {ru: "Пыль бурого угля",  zh: "褐煤灰"});

Translation.addTranslation("Ashes Dust", {ru: "Пепел",  zh: "灰燼"});

Translation.addTranslation("DarkAshes Dust", {ru: "Зола",  zh: "黑暗的灰燼"});

Translation.addTranslation("LapisLazuli Dust", {ru: "Лазуритная пыль",  zh: "青金石灰塵"});

Translation.addTranslation("Coal Dust", {ru: "Угольная пыль",  zh: "煤炭粉末"});

Translation.addTranslation("Emerald Dust", {ru: "Изумрудная пыль",  zh: "祖母綠的塵埃"});

Translation.addTranslation("Diamond Dust", {ru: "Алмазная пыль",  zh: "鑽石粉塵"});


Translation.addTranslation("Stone Dust", {ru: "Каменная пыль",  zh: "石塵"});
Translation.addTranslation("Steel Dust", {ru: "Стальная пыль",  zh: "鋼塵"});
Translation.addTranslation("Rubber Dust", {ru: "Резиновая масса",  zh: "橡胶纸浆"});

Translation.addTranslation("Silver Dust", {ru: "Серебрянная пыль",  zh: "银灰尘"});
Translation.addTranslation("Copper Dust", {ru: "Медная пыль",  zh: "铜灰尘"});
Translation.addTranslation("Bronze Dust", {ru: "Бронзовая пыль",  zh: "青铜灰尘"});


Translation.addTranslation("Gold Dust", {ru: "Золотая пыль",  zh: "金粉"});

Translation.addTranslation("Iron Dust", {ru: "Железная пыль",  zh: "铁粉"});

Translation.addTranslation("Lead Dust", {ru: "Свинцовая пыль",  zh: "铅粉尘"});
Translation.addTranslation("Antimony Dust", {ru: "Пыль сурьмы",  zh: "灰尘的锑"});

Translation.addTranslation("Tin Dust", {ru: "Оловянная пыль",  zh: "锡灰尘"});

//SMALL DS

Translation.addTranslation("Small Pile of Emerald Dust", {ru: "Малая кучка изумрудной пыли",  zh: "小堆翠綠的塵土"});

Translation.addTranslation("Small Pile of Diamond Dust", {ru: "Малая кучка алмазной пыли",  zh: "小堆金剛石粉塵"});


Translation.addTranslation("Small Pile of Steel Dust", {ru: "Малая кучка стальной пыли",  zh: "一小堆鋼塵"});

Translation.addTranslation("Small Pile of Rubber Dust", {ru: "Малая кучка резиновой массы",  zh: "一小堆的橡胶纸浆"});

Translation.addTranslation("Small Pile of Copper Dust", {ru: "Малая кучка медной пыли",  zh: "一小堆铜灰尘"});
Translation.addTranslation("Small Pile of Bronze Dust", {ru: "Малая кучка бронзовой пыли",  zh: "一小堆铜灰尘"});
Translation.addTranslation("Small Pile of Silver Dust", {ru: "Малая кучка серебряной пыли",  zh: "一小堆银灰尘"});

Translation.addTranslation("Small Pile of Gold Dust", {ru: "Малая кучка золотой пыли",  zh: "一小堆黄尘"});

Translation.addTranslation("Small Pile of Iron Dust", {ru: "Малая кучка железной пыли",  zh: "小堆的铁粉"});
Translation.addTranslation("Small Pile of Lead Dust", {ru: "Малая кучка свинцовой пыли",  zh: "一小堆铅粉尘"});
Translation.addTranslation("Small Pile of Antimony Dust", {ru: "Малая кучка пыли из сурьмы",  zh: "一小堆的粉尘从锑"});

Translation.addTranslation("Small Pile of Tin Dust", {ru: "Малая кучка оловянной пыли",  zh: "一小堆的锡灰尘"});

//TINY DS

Translation.addTranslation("Tiny Pile of Ashes Dust", {ru: "Крошечная кучка пепла",  zh: "一小堆灰燼"});

Translation.addTranslation("Tiny Pile of DarkAshes Dust", {ru: "Крошечная кучка золы",  zh: "一小堆黑灰"});

Translation.addTranslation("Tiny Pile of Emerald Dust", {ru: "Крошечная кучка изумрудной пыли",  zh: "一小堆翠綠的灰塵"});

Translation.addTranslation("Tiny Pile of Diamond Dust", {ru: "Крошечная кучка алмазной пыли",  zh: "一小堆金剛石粉塵尘"});

Translation.addTranslation("Tiny Pile of Steel Dust", {ru: "Крошечная кучка стальной пыли",  zh: "一小堆鋼塵"});

Translation.addTranslation("Tiny Pile of Rubber Dust", {ru: "Крошечная кучка резиновой массы",  zh: "小堆的橡胶纸浆"});

Translation.addTranslation("Tiny Pile of Copper Dust", {ru: "Крошечная кучка медной пыли",  zh: "小堆铜灰尘"});
Translation.addTranslation("Tiny Pile of Bronze Dust", {ru: "Крошечная кучка бронзовой пыли",  zh: "小堆铜灰尘"});
Translation.addTranslation("Tiny Pile of Silver Dust", {ru: "Крошечная кучка серебряной пыли",  zh: "小堆银灰尘"});

Translation.addTranslation("Tiny Pile of Gold Dust", {ru: "Крошечная кучка золотой пыли",  zh: "小堆黄尘"});

Translation.addTranslation("Tiny Pile of Iron Dust", {ru: "Крошечная кучка железной пыли",  zh: "微小的鐵塵埃堆"});

Translation.addTranslation("Tiny Pile of Lead Dust", {ru: "Крошечная кучка свинцовой пыли",  zh: "小堆铅粉尘"});

Translation.addTranslation("Tiny Pile of Antimony Dust", {ru: "Крошечная кучка пыли из сурьмы",  zh: "小堆的粉尘从锑"});
Translation.addTranslation("Tiny Pile of Tin Dust", {ru: "Крошечная кучка оловянной пыли",  zh: "小堆的锡灰尘"});



//RODS
Translation.addTranslation("Steel Rod", {ru: "Стальной стержень",  zh: "鋼棒"});
Translation.addTranslation("Rubber Rod", {ru: "Резиновый стержень",  zh: "橡胶棒"});
Translation.addTranslation("Copper Rod", {ru: "Медный стержень",  zh: "铜终端"});
Translation.addTranslation("Bronze Rod", {ru: "Бронзовый стержень",  zh: "铜板"});
Translation.addTranslation("Silver Rod", {ru: "Серебряный стержень",  zh: "银杆"});

Translation.addTranslation("Gold Rod", {ru: "Золотой стержень",  zh: "金棒"});

Translation.addTranslation("Iron Rod", {ru: "Железный стержень",  zh: "铁杆"});
Translation.addTranslation("Lead Rod", {ru: "Свинцовый стержень",  zh: "导致网"});

Translation.addTranslation("Antimony Rod", {ru: "Стержень из сурьмы",  zh: "棒的锑"});

Translation.addTranslation("Tin Rod", {ru: "Оловянный стержень",  zh: "锡杆"});

//Form
Translation.addTranslation("Rubber Ring", {ru: "Резиновое кольцо",  zh: "橡皮圈"});

Translation.addTranslation("Tin Ring", {ru: "Оловянное кольцо",  zh: "环锡"});

//BOLTS
Translation.addTranslation("Steel Bolt", {ru: "Стальной болт",  zh: "鋼螺栓"});
Translation.addTranslation("Rubber Bolt", {ru: "Резиновый болт",  zh: "橡胶螺栓"});
Translation.addTranslation("Copper Bolt", {ru: "Медный болт",  zh: "铜的螺栓"});
Translation.addTranslation("Bronze Bolt", {ru: "Бронзовый болт",  zh: "铜牌螺栓"});
Translation.addTranslation("Silver Bolt", {ru: "Серебряный болт",  zh: "银螺栓"});

Translation.addTranslation("Gold Bolt", {ru: "Золотой болт",  zh: "金螺栓"})

Translation.addTranslation("Iron Bolt", {ru: "Железный болт",  zh: "一个铁的螺栓"});

Translation.addTranslation("Lead Bolt", {ru: "Свинцовый болт",  zh: "导致螺栓"});

Translation.addTranslation("Antimony Bolt", {ru: "Болт из сурьмы",  zh: "螺栓从锑"});

Translation.addTranslation("Tin Bolt", {ru: "Оловянный болт",  zh: "锡螺栓"});

//IMPURE DS

Translation.addTranslation("Impure Stone Dust", {ru: "Загрязнённая каменная пыль",  zh: "不純的石頭塵土"});

//CRUSHED
Translation.addTranslation("Crushed Lignite Ore", {ru: "Измельчённая Руда Бурого Угля",  zh: "粉碎的褐煤礦"});

Translation.addTranslation("Crushed Malachite Ore", {ru: "Измельчённая Малахитовая Руда",  zh: "粉碎石矿"});

Translation.addTranslation("Crushed BandedIron Ore", {ru: "Измельчённая Железо-полосчатая Руда",  zh: "粉碎铁矿石镶边"});

Translation.addTranslation("Crushed YellowLimonite Ore", {ru: "Измельчённая руда жёлтого лимонита",  zh: "粉碎矿石的黄褐铁矿"});

Translation.addTranslation("Crushed BrownLimonite Ore", {ru: "Измельчённая руда коричневого лимонита",  zh: "粉碎矿石棕褐铁矿"});

Translation.addTranslation("Crushed Pyrite Ore", {ru: "Измельчённая Пиритовая Руда",  zh: "碎黄铁矿石"});

Translation.addTranslation("Crushed Chalcopyrite Ore", {ru: "Измельчённая Халькопиритовая Руда",  zh: "粉碎黄铜矿石"});

Translation.addTranslation("Crushed VanadiumMagnetite Ore", {ru: "Измельчённая Ванадий-Магнетитовая Руда",  zh: "碎钒-磁铁矿"});

Translation.addTranslation("Crushed Magnetite Ore", {ru: "Измельчённая Магнетитовая Руда",  zh: "粉碎的磁铁矿"});

Translation.addTranslation("Crushed Cassiterite Ore", {ru: "Измельчённая Касситеритная Руда",  zh: "粉碎矿石，锡石"});

Translation.addTranslation("Crushed Antimony Ore", {ru: "Измельчённая Антимонитовая Руда",  zh: "粉碎矿石Antimonova"});

Translation.addTranslation("Crushed Tetrahedrite Ore", {ru: "Измельчённая Тетраэдритная Руда",  zh: "粉碎矿石Tetraedrica"});

Translation.addTranslation("Crushed Galena Ore", {ru: "Измельчённая Галенитовая Руда",  zh: "碾碎的方铅矿矿石"});

Translation.addTranslation("Crushed LapisLazuli Ore", {ru: "Измельчённая Лазуритная Руда",  zh: "粉碎的青金石礦石"});

Translation.addTranslation("Crushed Redstone Ore", {ru: "Измельчённая Красная Руда",  zh: "碾碎的紅石礦石"});

Translation.addTranslation("Crushed Emerald Ore", {ru: "Измельчённая Изумрудная Руда",  zh: "祖母綠碾碎的礦石"});

Translation.addTranslation("Crushed Diamond Ore", {ru: "Измельчённая Алмазная Руда",  zh: "粉碎的鑽石礦石"});

Translation.addTranslation("Crushed Coal Ore", {ru: "Измельчённая Угольная Руда",  zh: "碎煤礦"});

Translation.addTranslation("Crushed Iron Ore", {ru: "Измельчённая Железная Руда",  zh: "粉碎的鐵礦石"});

Translation.addTranslation("Crushed Tin Ore", {ru: "Измельчённая Оловянная Руда",  zh: "被擊碎的錫礦石"});

Translation.addTranslation("Crushed Silver Ore", {ru: "Измельчённая Серебряная Руда",  zh: "粉碎銀礦"});

Translation.addTranslation("Crushed Gold Ore", {ru: "Измельчённая золотая руда",  zh: "粉碎的金礦石"});

Translation.addTranslation("Crushed Copper Ore", {ru: "Измельчённая медная руда",  zh: "銅礦粉碎"});

Translation.addTranslation("Crushed Lead Ore", {ru: "Измельчённая свинцовая руда",  zh: "鉛礦石粉碎"});

Translation.addTranslation("Purified LapisLazuli Ore", {ru: "Очищенная лазуритная руда",  zh: "純淨的青金石礦石"});

Translation.addTranslation("Purified Redstone Ore", {ru: "Очищенная красная руда",  zh: "純化的紅石礦石"});

Translation.addTranslation("Purified Emerald Ore", {ru: "Очищенная изумрудная руда",  zh: "純淨的祖母綠礦石"});

Translation.addTranslation("Purified Diamond Ore", {ru: "Очищенная алмазная руда",  zh: "純淨的鑽石礦石"});

Translation.addTranslation("Purified Coal Ore", {ru: "Очищенная угольная руда",  zh: "淨化煤礦"});

Translation.addTranslation("Purified Iron Ore", {ru: "Очищенная железная руда",  zh: "純化的鐵礦石"});

Translation.addTranslation("Purified Tin Ore", {ru: "Очищенная оловянная руда",  zh: "純錫礦石"});

Translation.addTranslation("Purified Silver Ore", {ru: "Очищенная серебряная руда",  zh: "純銀礦石"});

Translation.addTranslation("Purified Gold Ore", {ru: "Очищенная золотая руда",  zh: "純化的金礦石"});

Translation.addTranslation("Purified Copper Ore", {ru: "Очищенная медная руда",  zh: "純化的銅礦"});

Translation.addTranslation("Purified Lead Ore", {ru: "Очищенная свинцовая руда",  zh: "純化鉛礦石"});

Translation.addTranslation("Purified Lignite Ore", {ru: "Очищенная руда бурого угля",  zh: "純化的褐煤礦石"});

//IMPUREDUST
Translation.addTranslation("Impure Lignite Dust", {ru: "Загрязнённая пыль бурого угля",  zh: "不純的褐煤粉塵"});

Translation.addTranslation("Impure Malachite Dust", {ru: "Загрязнённая Малахитовая пыль",  zh: "被污染的石灰尘"});

Translation.addTranslation("Impure BandedIron Dust", {ru: "Загрязнённая Железо-полосчатая пыль",  zh: "受污染的铁-带状灰尘"});

Translation.addTranslation("Impure YellowLimonite Dust", {ru: "Загрязнённая пыль жёлтого лимонита",  zh: "被污染的粉尘黄褐铁矿"});

Translation.addTranslation("Impure BrownLimonite Dust", {ru: "Загрязнённая пыль коричневого лимонита",  zh: "被污染的粉尘棕褐铁矿"});

Translation.addTranslation("Impure Pyrite Dust", {ru: "Загрязнённая Пиритовая пыль",  zh: "受污染的黄铁矿灰尘"});

Translation.addTranslation("Impure Chalcopyrite Dust", {ru: "Загрязнённая Халькопиритовая пыль",  zh: "黄铜矿污染的粉尘"});

Translation.addTranslation("Impure VanadiumMagnetite Dust", {ru: "Загрязнённая Ванадий-Магнетитовая пыль",  zh: "受污染的钒磁铁矿的灰尘"});

Translation.addTranslation("Impure Magnetite Dust", {ru: "Загрязнённая Магнетитовая пыль",  zh: "受污染的磁铁矿的灰尘"});

Translation.addTranslation("Impure Cassiterite Dust", {ru: "Загрязнённая Касситеритная пыль",  zh: "锡石被污染的粉尘"});

Translation.addTranslation("Impure Antimony Dust", {ru: "Загрязнённая Антимонитовая пыль",  zh: "Antimonova被污染的粉尘"});

Translation.addTranslation("Impure Tetrahedrite Dust", {ru: "Загрязнённая Тетраэдритная пыль",  zh: "Tetraedrica被污染的粉尘"});

Translation.addTranslation("Impure Galena Dust", {ru: "Загрязнённая Галенитовая пыль",  zh: "Galena被污染的粉尘"});

Translation.addTranslation("Impure LapisLazuli Dust", {ru: "Загрязнённая лазуритная пыль",  zh: "不純的青金石礦石"});

Translation.addTranslation("Impure Redstone Dust", {ru: "Загрязнённая красная пыль",  zh: "不純的紅石礦"});

Translation.addTranslation("Impure Emerald Dust", {ru: "Загрязнённая изумрудная пыль",  zh: "不純的祖母綠礦石"});

Translation.addTranslation("Impure Diamond Dust", {ru: "Загрязнённая алмазная пыль",  zh: "不純的鑽石礦石"});

Translation.addTranslation("Impure Coal Dust", {ru: "Загрязнённая угольная пыль",  zh: "不純的煤礦"});

Translation.addTranslation("Impure Tin Dust", {ru: "Загрязнённая оловянная пыль",  zh: "不純淨的錫塵"});

Translation.addTranslation("Impure Iron Dust", {ru: "Загрязнённая железная пыль",  zh: "不純的鐵屑"});

Translation.addTranslation("Impure Silver Dust", {ru: "Загрязнённая Серебряная пыль",  zh: "不純的銀灰"});

Translation.addTranslation("Impure Gold Dust", {ru: "Загрязнённая Золотая пыль",  zh: "不純的金粉"});

Translation.addTranslation("Impure Copper Dust", {ru: "Загрязнённая Медная пыль",  zh: "不純的銅塵"});

Translation.addTranslation("Impure Lead Dust", {ru: "Загрязнённая Свинцовая пыль",  zh: "不純的鉛塵"});

//GEMS
Translation.addTranslation("Perfect Diamond", {ru: "Совершенный алмаз",  zh: "完美的鑽石"});

Translation.addTranslation("Flawless Diamond", {ru: "Безупречный алмаз",  zh: "完美無瑕的鑽石"});

Translation.addTranslation("Defective Diamond", {ru: "Дефектный алмаз",  zh: "有缺陷的鑽石"});

Translation.addTranslation("Split Diamond", {ru: "Расколотый алмаз",  zh: "分裂的鑽石"});

Translation.addTranslation("Perfect Emerald", {ru: "Совершенный изумруд",  zh: "完美的祖母綠"});

Translation.addTranslation("Flawless Emerald", {ru: "Безупречный изумруд",  zh: "完美無瑕的祖母綠"});

Translation.addTranslation("Defective Emerald", {ru: "Дефектный изумруд",  zh: "有缺陷的祖母綠"});

Translation.addTranslation("Split Emerald", {ru: "Расколотый изумруд",  zh: "分裂祖母綠"});

//HAMMERS

Translation.addTranslation("Iron Hammer", {ru: "Железный молот",  zh: "铁锤"});

Translation.addTranslation("Bronze Hammer", {ru: "Бронзовый молот",  zh: "青铜锤"});

Translation.addTranslation("Diamond Hammer", {ru: "Алмазный молот",  zh: "钻石锤"});

Translation.addTranslation("Emerald Hammer", {ru: "Изумрудный молот",  zh: "翡翠锤"});

Translation.addTranslation("Quartz Hammer", {ru: "Кварцевый молот",  zh: "石英锤"});

Translation.addTranslation("Star Hammer", {ru: "Молот из адской звезды",  zh: "锤狱星"});

Translation.addTranslation("Steel Hammer", {ru: "Стальной молот",  zh: "钢铁锤"});

Translation.addTranslation("Lead Hammer", {ru: "Свинцовый молот",  zh: "铅锤"});

Translation.addTranslation("Gold Hammer", {ru: "Золотой молот",  zh: "金锤"});

Translation.addTranslation("Silver Hammer", {ru: "Серебряный молот",  zh: "银锤"});

//Wrenchs

Translation.addTranslation("Iron Wrench", {ru: "Железный ключ",  zh: "铁键"});

Translation.addTranslation("Gold Wrench", {ru: "Золотой ключ",  zh: "铁键"});

Translation.addTranslation("Bronze Wrench", {ru: "Бронзовый ключ",  zh: "青铜钥匙"});

Translation.addTranslation("Lead Wrench", {ru: "Свинцовый ключ",  zh: "导致关键"});

Translation.addTranslation("Steel Wrench", {ru: "Стальной ключ",  zh: "钢关键"});

Translation.addTranslation("Silver Wrench", {ru: "Серебряный ключ",  zh: "银色的钥匙"});

//Files

Translation.addTranslation("Bronze File", {ru: "Бронзовый напильник",  zh: "青铜文件"});

Translation.addTranslation("Steel File", {ru: "Стальной напильник",  zh: "钢文件"});

Translation.addTranslation("Iron File", {ru: "Железный напильник",  zh: "铁文件"});

Translation.addTranslation("Gold File", {ru: "Золотой напильник",  zh: "黄金的文件"});

Translation.addTranslation("Silver File", {ru: "Серебряный напильник",  zh: "银文件"});

Translation.addTranslation("Lead File", {ru: "Свинцовый напильник",  zh: "导文件"});

//Knifes

Translation.addTranslation("Lead Knife", {ru: "Свинцовый нож",  zh: "导致刀"});

Translation.addTranslation("Silver Knife", {ru: "Серебряный нож",  zh: "银刀"});

Translation.addTranslation("Bronze Knife", {ru: "Бронзовый нож",  zh: "青铜刀"});

Translation.addTranslation("Gold Knife", {ru: "Золотой нож",  zh: "金色的刀"});

Translation.addTranslation("Iron Knife", {ru: "Железный нож",  zh: "铁刀"});

Translation.addTranslation("Steel Knife", {ru: "Стальной нож",  zh: "钢刀"});

//SawBlades
Translation.addTranslation("Bronze Saw Blade", {ru: "Бронзовая часть пилы",  zh: "铜的一部分，看到了"});

Translation.addTranslation("Gold Saw Blade", {ru: "Золотая часть пилы",  zh: "黄金的一部分，看到了"});

Translation.addTranslation("Iron Saw Blade", {ru: "Железная часть пилы",  zh: "铁的一部分，看到了"});

Translation.addTranslation("Silver Saw Blade", {ru: "Серебряная часть пилы",  zh: "银的一部分，看到了"});

Translation.addTranslation("Steel Saw Blade", {ru: "Стальная часть пилы",  zh: "的钢材的一部分，看到了"});

//saw
Translation.addTranslation("Bronze Saw", {ru: "Бронзовая пила",  zh: "青铜看到了"});

Translation.addTranslation("Gold Saw", {ru: "Золотая пила",  zh: "金看到了"});

Translation.addTranslation("Iron Saw", {ru: "Железная пила",  zh: "钢锯"});

Translation.addTranslation("Lead Saw", {ru: "Свинцовая пила",  zh: "致看到了"});

Translation.addTranslation("Silver Saw", {ru: "Серебряная пила",  zh: "银看到了"});

Translation.addTranslation("Steel Saw", {ru: "Стальная пила",  zh: "钢锯"});

//mortar
Translation.addTranslation("Iron Mortar", {ru: "Железная ступка",  zh: "铁砂浆"});

Translation.addTranslation("Bronze Mortar", {ru: "Бронзовая ступка",  zh: "青铜灰浆"});

Translation.addTranslation("Diamond Mortar", {ru: "Алмазная ступка",  zh: "钻石砂浆"});

Translation.addTranslation("Gold Mortar", {ru: "Золотая ступка",  zh: "金色的砂浆"});

Translation.addTranslation("Lead Mortar", {ru: "Свинцовая ступка",  zh: "导致砂浆"});

Translation.addTranslation("Steel Mortar", {ru: "Стальная ступка",  zh: "钢铁砂浆"});

Translation.addTranslation("Silver Mortar", {ru: "Серебряная ступка",  zh: "银灰浆"});

Translation.addTranslation("Flint Mortar", {ru: "Кремневая ступка",  zh: "石灰浆"});




// file: Tools/Items.js

addTool("Iron", 64, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Bronze", 48, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Diamond", 320, {hammer: 1, wrench: 0, file: 0, knife: 0, saw: 0, mortar: 1});
addTool("Emerald", 64, {hammer: 1, wrench: 0, file: 0, knife: 0, saw: 0});
addTool("Quartz", 16, {hammer: 1, wrench: 0, file: 0, knife: 0, saw: 0});
addTool("Star", 1280, {hammer: 1, wrench: 0, file: 0, knife: 0, saw: 0});
addTool("Gold", 32, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Lead", 16, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Steel", 128, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Silver", 16, {hammer: 1, wrench: 1, file: 1, knife: 1, saw: 1, mortar: 1});
addTool("Flint", 16, {hammer: 0, wrench: 0, file: 0, knife: 0, saw: 0, mortar: 1});

Recipes.addShaped({id: ItemID.IronSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', 280, 0, '#', ItemID.IronSawBlade, 0]);

Recipes.addShaped({id: ItemID.BronzeSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', 280, 0, '#', ItemID.BronzeSawBlade, 0]);

Recipes.addShaped({id: ItemID.GoldSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', ItemID.SteelRod, 0, '#', ItemID.GoldSawBlade, 0]);

Recipes.addShaped({id: ItemID.SteelSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', 280, 0, '#', ItemID.SteelSawBlade, 0]);

Recipes.addShaped({id: ItemID.SilverSaw, count: 1, data: 0}, [
	"#x",
	"",
	""
], ['x', ItemID.SteelRod, 0, '#', ItemID.SilverSawBlade, 0]);

Recipes.addShaped({id: ItemID.IronHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 265, 0]);

Recipes.addShaped({id: ItemID.GoldHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', ItemID.SteelRod, 0, '#', 266, 0]);


Recipes.addShaped({id: ItemID.BronzeHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', ItemID.BronzeIngot, 0]);

Recipes.addShaped({id: ItemID.SilverHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', ItemID.SteelRod, 0, '#', ItemID.SilverIngot, 0]);

Recipes.addShaped({id: ItemID.SteelHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', ItemID.SteelIngot, 0]);


Recipes.addShaped({id: ItemID.DiamondHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 264, 0]);


Recipes.addShaped({id: ItemID.EmeraldHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 388, 0]);


Recipes.addShaped({id: ItemID.QuartzHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 406, 0]);


Recipes.addShaped({id: ItemID.StarHammer, count: 1, data: 0}, [
	"##",
	"##x",
	"##"
], ['x', 280, 0, '#', 399, 0]);

Recipes.addShaped({id: ItemID.BronzeFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', 280, 0, '#', ItemID.BronzePlate, 0]);

Recipes.addShaped({id: ItemID.SteelFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', 280, 0, '#', ItemID.SteelPlate, 0]);

Recipes.addShaped({id: ItemID.SilverFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', ItemID.SteelRod, 0, '#', ItemID.SilverPlate, 0]);


Recipes.addShaped({id: ItemID.IronFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', 280, 0, '#', ItemID.IronPlate, 0]);


Recipes.addShaped({id: ItemID.GoldFile, count: 1, data: 0}, [
	"#",
	"#",
	"x"
], ['x', ItemID.SteelRod, 0, '#', ItemID.GoldPlate, 0]);




// file: Tools/Tool.js

addTool1("Wood", {dur: 15, lvl: 1, eff: 1.5, dmg: 1, ench: 8});
ToolAPI.setTool(ItemID.WoodSword, "Wood", ToolType.sword);
ToolAPI.setTool(ItemID.WoodShovel, "Wood", ToolType.shovel);
ToolAPI.setTool(ItemID.WoodPickaxe, "Wood", ToolType.pickaxe);
ToolAPI.setTool(ItemID.WoodAxe, "Wood", ToolType.axe);
ToolAPI.setTool(ItemID.WoodHoe, "Wood", ToolType.hoe);
Recipes.addShaped({id: ItemID.WoodSword, count: 1, data: 0}, [" b "," b "," a "], ['a', 280, 0, 'b', 5, -1]);
Recipes.addShaped({id: ItemID.WoodAxe, count: 1, data: 0}, ["bb ","ba "," a "], ['a', 280, 0, 'b', 5, -1]); 
Recipes.addShaped({id: ItemID.WoodShovel, count: 1, data: 0}, [" b "," a "," a "], ['a', 280, 0, 'b', 5, -1]);
Recipes.addShaped({id: ItemID.WoodHoe, count: 1, data: 0}, ["bb "," a "," a "], ['a', 280, 0, 'b', 5, -1]); 
Recipes.addShaped({id: ItemID.WoodPickaxe, count: 1, data: 0}, ["bbb"," a "," a "], ['a', 280, 0, 'b', 5, -1]);

addTool1("Flint", {dur: 63, lvl: 2, eff: 2, dmg: 2, ench: 10});
ToolAPI.setTool(ItemID.FlintSword, "Flint", ToolType.sword);
ToolAPI.setTool(ItemID.FlintShovel, "Flint", ToolType.shovel);
ToolAPI.setTool(ItemID.FlintPickaxe, "Flint", ToolType.pickaxe);
ToolAPI.setTool(ItemID.FlintAxe, "Flint", ToolType.axe);
ToolAPI.setTool(ItemID.FlintHoe, "Flint", ToolType.hoe);
Recipes.addShaped({id: ItemID.FlintSword, count: 1, data: 0}, [" b "," b "," a "], ['a', 280, 0, 'b', 318, 0]);
Recipes.addShaped({id: ItemID.FlintAxe, count: 1, data: 0}, ["bb ","ba "," a "], ['a', 280, 0, 'b', 318, 0]); 
Recipes.addShaped({id: ItemID.FlintShovel, count: 1, data: 0}, [" b "," a "," a "], ['a', 280, 0, 'b', 318, 0]);
Recipes.addShaped({id: ItemID.FlintHoe, count: 1, data: 0}, ["bb "," a "," a "], ['a', 280, 0, 'b', 318, 0]); 
Recipes.addShaped({id: ItemID.FlintPickaxe, count: 1, data: 0}, ["bbb"," a "," a "], ['a', 280, 0, 'b', 318, 0]);


addTool1("Stone", {dur: 31, lvl: 2, eff: 2.5, dmg: 1.5, ench: 14});
ToolAPI.setTool(ItemID.StoneSword, "Stone", ToolType.sword);
ToolAPI.setTool(ItemID.StoneShovel, "Stone", ToolType.shovel);
ToolAPI.setTool(ItemID.StonePickaxe, "Stone", ToolType.pickaxe);
ToolAPI.setTool(ItemID.StoneAxe, "Stone", ToolType.axe);
ToolAPI.setTool(ItemID.StoneHoe, "Stone", ToolType.hoe);
Recipes.addShaped({id: ItemID.StoneSword, count: 1, data: 0}, [" b "," b "," a "], ['a', 280, 0, 'b', 4, 0]);
Recipes.addShaped({id: ItemID.StoneAxe, count: 1, data: 0}, ["bb ","ba "," a "], ['a', 280, 0, 'b', 4, 0]); 
Recipes.addShaped({id: ItemID.StoneShovel, count: 1, data: 0}, [" b "," a "," a "], ['a', 280, 0, 'b', 4, 0]);
Recipes.addShaped({id: ItemID.StoneHoe, count: 1, data: 0}, ["bb "," a "," a "], ['a', 280, 0, 'b', 4, 0]); 
Recipes.addShaped({id: ItemID.StonePickaxe, count: 1, data: 0}, ["bbb"," a "," a "], ['a', 280, 0, 'b', 4, 0]);


addTool1("Iron", {dur: 255, lvl: 3, eff: 4.5, dmg: 2.5, ench: 16});
ToolAPI.setTool(ItemID.IronSword, "Iron", ToolType.sword);
ToolAPI.setTool(ItemID.IronShovel, "Iron", ToolType.shovel);
ToolAPI.setTool(ItemID.IronPickaxe, "Iron", ToolType.pickaxe);
ToolAPI.setTool(ItemID.IronAxe, "Iron", ToolType.axe);
ToolAPI.setTool(ItemID.IronHoe, "Iron", ToolType.hoe);

addTool1("Bronze", {dur: 191, lvl: 3, eff: 4.5, dmg: 2.5, ench: 12});
ToolAPI.setTool(ItemID.BronzeSword, "Bronze", ToolType.sword);
ToolAPI.setTool(ItemID.BronzeShovel, "Bronze", ToolType.shovel);
ToolAPI.setTool(ItemID.BronzePickaxe, "Bronze", ToolType.pickaxe);
ToolAPI.setTool(ItemID.BronzeAxe, "Bronze", ToolType.axe);
ToolAPI.setTool(ItemID.BronzeHoe, "Bronze", ToolType.hoe);

addTool1("Diamond", {dur: 1279, lvl: 4, eff: 5.5, dmg: 3.5, ench: 19});
ToolAPI.setTool(ItemID.DiamondSword, "Diamond", ToolType.sword);
ToolAPI.setTool(ItemID.DiamondShovel, "Diamond", ToolType.shovel);
ToolAPI.setTool(ItemID.DiamondPickaxe, "Diamond", ToolType.pickaxe);
ToolAPI.setTool(ItemID.DiamondAxe, "Diamond", ToolType.axe);
ToolAPI.setTool(ItemID.DiamondHoe, "Diamond", ToolType.hoe);

addTool1("Steel", {dur: 511, lvl: 3, eff: 4.5, dmg: 2.5, ench: 6});
ToolAPI.setTool(ItemID.SteelSword, "Steel", ToolType.sword);
ToolAPI.setTool(ItemID.SteelShovel, "Steel", ToolType.shovel);
ToolAPI.setTool(ItemID.SteelPickaxe, "Steel", ToolType.pickaxe);
ToolAPI.setTool(ItemID.SteelAxe, "Steel", ToolType.axe);
ToolAPI.setTool(ItemID.SteelHoe, "Steel", ToolType.hoe);

addTool1("Emerald", {dur: 255, lvl: 3, eff: 5 , dmg: 2.5, ench: 25});
ToolAPI.setTool(ItemID.EmeraldSword, "Emerald", ToolType.sword);
ToolAPI.setTool(ItemID.EmeraldShovel, "Emerald", ToolType.shovel);
ToolAPI.setTool(ItemID.EmeraldPickaxe, "Emerald", ToolType.pickaxe);
ToolAPI.setTool(ItemID.EmeraldAxe, "Emerald", ToolType.axe);
ToolAPI.setTool(ItemID.EmeraldHoe, "Emerald", ToolType.hoe);




// file: Vanila/Vedit.js

//EditRecipe
Recipes.deleteRecipe({id: 380, count: 1, data: 0});
Recipes.deleteRecipe({id: 148, count: 1, data: 0});
Recipes.deleteRecipe({id: 147, count: 1, data: 0});
Recipes.deleteRecipe({id: 167, count: 1, data: 0});
Recipes.deleteRecipe({id: 101, count: 16, data: 0});
Recipes.deleteRecipe({id: 359, count: 1, data: 0});
Recipes.deleteRecipe({id: 330, count: 3, data: 0});
Recipes.deleteRecipe({id: 328, count: 1, data: 0});
Recipes.deleteRecipe({id: 310, count: 1, data: 0});
Recipes.deleteRecipe({id: 311, count: 1, data: 0});
Recipes.deleteRecipe({id: 312, count: 1, data: 0});
Recipes.deleteRecipe({id: 313, count: 1, data: 0});
Recipes.deleteRecipe({id: 314, count: 1, data: 0});
Recipes.deleteRecipe({id: 315, count: 1, data: 0});
Recipes.deleteRecipe({id: 316, count: 1, data: 0});
Recipes.deleteRecipe({id: 317, count: 1, data: 0});
Recipes.deleteRecipe({id: 325, count: 1, data: 0});
Recipes.deleteRecipe({id: 306, count: 1, data: 0});
Recipes.deleteRecipe({id: 307, count: 1, data: 0});
Recipes.deleteRecipe({id: 308, count: 1, data: 0});
Recipes.deleteRecipe({id: 309, count: 1, data: 0});
Recipes.deleteRecipe({id: 256, count: 1, data: 0});
Recipes.deleteRecipe({id: 257, count: 1, data: 0});
Recipes.deleteRecipe({id: 258, count: 1, data: 0});
Recipes.deleteRecipe({id: 259, count: 1, data: 0});
Recipes.deleteRecipe({id: 267, count: 1, data: 0});
Recipes.deleteRecipe({id: 268, count: 1, data: 0});
Recipes.deleteRecipe({id: 269, count: 1, data: 0});
Recipes.deleteRecipe({id: 270, count: 1, data: 0});
Recipes.deleteRecipe({id: 271, count: 1, data: 0});
Recipes.deleteRecipe({id: 272, count: 1, data: 0});
Recipes.deleteRecipe({id: 273, count: 1, data: 0});
Recipes.deleteRecipe({id: 274, count: 1, data: 0});
Recipes.deleteRecipe({id: 275, count: 1, data: 0});
Recipes.deleteRecipe({id: 276, count: 1, data: 0});
Recipes.deleteRecipe({id: 277, count: 1, data: 0});
Recipes.deleteRecipe({id: 278, count: 1, data: 0});
Recipes.deleteRecipe({id: 279, count: 1, data: 0});
Recipes.deleteRecipe({id: 290, count: 1, data: 0});
Recipes.deleteRecipe({id: 291, count: 1, data: 0});
Recipes.deleteRecipe({id: 292, count: 1, data: 0});
Recipes.deleteRecipe({id: 293, count: 1, data: 0});

Recipes.deleteRecipe({id: 5, count: 4, data: 0});
Recipes.deleteRecipe({id: 5, count: 4, data: 1});
Recipes.deleteRecipe({id: 5, count: 4, data: 2});
Recipes.deleteRecipe({id: 5, count: 4, data: 3});
Recipes.deleteRecipe({id: 5, count: 4, data: 4});
Recipes.deleteRecipe({id: 5, count: 4, data: 5});
Recipes.addShapeless({id: 5, count: 2, data: 0}, [{id: 17, data: 0}]); 
Recipes.addShapeless({id: 5, count: 2, data: 1}, [{id: 17, data: 1}]); 
Recipes.addShapeless({id: 5, count: 2, data: 2}, [{id: 17, data: 2}]); 
Recipes.addShapeless({id: 5, count: 2, data: 3}, [{id: 17, data: 3}]);
Recipes.addShapeless({id: 5, count: 2, data: 4}, [{id: 162, data: 0}]);
Recipes.addShapeless({id: 5, count: 2, data: 5}, [{id: 162, data: 1}]); 

Recipes.deleteRecipe({id: 280, count: 4, data: 0});

Recipes.deleteRecipe({id: 42, count: 1, data: 0});
Recipes.deleteRecipe({id: 41, count: 1, data: 0});
Recipes.deleteRecipe({id: 57, count: 1, data: 0});
Recipes.deleteRecipe({id: 133, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.blockBronze, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.blockTin, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.blockCopper, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.blockLead, count: 1, data: 0});
Recipes.deleteRecipe({id: 22, count: 1, data: 0});
Recipes.deleteRecipe({id: 173, count: 1, data: 0});
Recipes.deleteRecipe({id: 152, count: 1, data: 0});

Recipes.addShaped({id: 280, count: 2, data: 0}, [
     "a  ",
     "a  ",
     "   "
], [ 'a', 5, -1]); 

//IC2 Recipes
Recipes.deleteRecipe({id: ItemID.circuitBasic, count: 1, data: 0});
Recipes.deleteRecipe({id: ItemID.circuitAdvanced, count: 1, data: 0});
Recipes.deleteRecipe({id: ItemID.cellEmpty, count: 1, data: 0});
Recipes.deleteRecipe({id: ItemID.craftingHammer, count: 1, data: 0});
Recipes.deleteRecipe({id: ItemID.craftingCutter, count: 1, data: 0});
Recipes.deleteRecipe({id: ItemID.ingotSteel, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.massFabricator, count: 1, data: 0});

Recipes.deleteRecipe({id: BlockID.primalGenerator, count: 8, data: 0});
Recipes.deleteRecipe({id: BlockID.blockCopper, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.blockTin, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.blockBronze, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.blockLead, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.blockSteel, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.machineBlockBasic, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.machineBlockAdvanced, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.reinforcedStone, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.solarPanel, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.genWindmill, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.genWatermill, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.electricFurnace, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.inductionFurnace, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.macerator, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.recycler, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.compressor, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.extractor, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.metalFormer, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.geothermalGenerator, count: 1, data: 0});
Recipes.deleteRecipe({id: BlockID.ironFurnace, count: 1, data: 0});








// file: Vanila/Ores.js

Callback.addCallback("DestroyBlockStart", function(coords){
var id = World.getBlockID(coords.x, coords.y, coords.z)
if(id == 56||id == 16||id == 14|| id == 15||id == 73||id == 129||id == 21){
Game.prevent();
}
});




// file: Recipes/CraftRecipes.js

Recipes.addShaped({id: 50, count: 4, data: 0}, ["b ","a "], ['a', 280, 0, 'b', ItemID.latex, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldCylinder, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldAnvil, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldPlate, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldIngot, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldNuggets, 0]);
Recipes.addShaped({id: ItemID.EmptyShapePlate, count: 1, data: 0}, ["   "," a ","   "], ['a', ItemID.MoldBlock, 0]);
var recMortar=[[ItemID.GoldMortar, 266],[ItemID.BronzeMortar, ItemID.BronzeIngot],[ItemID.DiamondMortar, 264],[ItemID.FlintMortar, 318],[ItemID.LeadMortar, ItemID.LeadIngot],[ItemID.SilverMortar, ItemID.SilverIngot],[ItemID.SteelMortar, ItemID.SteelIngot],[ItemID.IronMortar, 265]];
for(var i in recMortar){
Recipes.addShaped({id: recMortar[i][0], count: 1, data: 0}, [" a ","bab","bbb"], ['b', 1, 0, 'a', recMortar[i][1], 0]);
}

var tinydust=[[ItemID.TinDust,ItemID.TinyPileTinDust],[ItemID.IronDust, ItemID.TinyPileIronDust],[ItemID.GoldDust, ItemID.TinyPileGoldDust],
[ItemID.CopperDust, ItemID.TinyPileCopperDust],[ItemID.LeadDust, ItemID.TinyPileLeadDust],[ItemID.SilverDust, ItemID.TinyPileSilverDust],[ItemID.RubberDust, ItemID.TinyPileRubberDust],[ItemID.BronzeDust, ItemID.TinyPileBronzeDust],[ItemID.AntimonyDust, ItemID.TinyPileAntimonyDust],
[ItemID.DiamondDust, ItemID.TinyPileDiamondDust],[ItemID.EmeraldDust, ItemID.TinyPileEmeraldDust],[ItemID.SteelDust, ItemID.TinyPileSteelDust],[ItemID.AshesDust, ItemID.TinyPileAshesDust],[ItemID.DarkAshesDust, ItemID.TinyPileDarkAshesDust]];

var smalldust=[[ItemID.TinDust,ItemID.SmallPileTinDust],[ItemID.IronDust, ItemID.SmallPileIronDust],[ItemID.GoldDust, ItemID.SmallPileGoldDust],
[ItemID.CopperDust, ItemID.SmallPileCopperDust],[ItemID.LeadDust, ItemID.SmallPileLeadDust],[ItemID.SilverDust, ItemID.SmallPileSilverDust],[ItemID.RubberDust, ItemID.SmallPileRubberDust],[ItemID.BronzeDust, ItemID.SmallPileBronzeDust],[ItemID.AntimonyDust, ItemID.SmallPileAntimonyDust],
[ItemID.DiamondDust, ItemID.SmallPileDiamondDust],[ItemID.EmeraldDust, ItemID.SmallPileEmeraldDust],[ItemID.SteelDust, ItemID.SmallPileSteelDust]];
for(var i in tinydust){
Recipes.addShaped({id: tinydust[i][0], count: 1, data: 0}, ["bbb","bbb","bbb"], ['b', tinydust[i][1], 0]);
Recipes.addShaped({id: tinydust[i][1], count: 9, data: 0}, ["  "," b"], ['b', tinydust[i][0], 0]);
}
for(var i in smalldust){
Recipes.addShaped({id: smalldust[i][0], count: 1, data: 0}, ["bb","bb"], ['b', smalldust[i][1], 0]);
Recipes.addShaped({id: smalldust[i][1], count: 4, data: 0}, ["  "," b"], ['b', smalldust[i][0], 0]);
}
Recipes.addShaped({id: ItemID.BronzeDust, count: 3, data: 0}, ["aa","ab"], ['b', ItemID.TinDust, 0, 'a', ItemID.CopperDust, 0]);




// file: Recipes/FurnaceRecipes.js

Recipes.addFurnaceFuel(ItemID.Lignite, 0, 1200);
Recipes.addFurnaceFuel(ItemID.LigniteDust, 0, 1200);
Recipes.addFurnaceFuel(ItemID.CrushedLigniteOre, 0, 1200);
Recipes.addFurnaceFuel(ItemID.CoalDust, 0, 1600);
Recipes.addFurnaceFuel(ItemID.CrushedCoalOre, 0, 1600);
Recipes.removeFurnaceRecipe(1);
Recipes.addFurnace(17, 17, 0);
Recipes.addFurnace(162, 162, 0);
Recipes.addFurnace(BlockID.oreDiamond, 264, 0);
Recipes.addFurnace(BlockID.oreGold, 266, 0);
Recipes.addFurnace(BlockID.oreLigniteCoal, ItemID.Lignite, 0);
Recipes.addFurnace(BlockID.oreCoal, 263, 0);
Recipes.addFurnace(ItemID.ImpureGoldDust, 266, 0);
Recipes.addFurnace(ItemID.ImpureTetrahedriteDust, ItemID.CopperIngot, 0);
Recipes.addFurnace(ItemID.ImpureAntimonyDust, ItemID.AntimonyIngot, 0);
Recipes.addFurnace(ItemID.ImpureChalcopyriteDust, ItemID.CopperIngot, 0);
Recipes.addFurnace(ItemID.ImpurePyriteDust, 265, 0);
Recipes.addFurnace(ItemID.ImpureMalachiteDust, ItemID.CopperIngot, 0);
Recipes.addFurnace(ItemID.ImpureCassiteriteDust, ItemID.TinIngot, 0);
Recipes.addFurnace(ItemID.ImpureBandedIronDust, 265, 0);
Recipes.addFurnace(ItemID.ImpureYellowLimoniteDust, 265, 0);
Recipes.addFurnace(ItemID.ImpureBrownLimoniteDust, 265, 0);
Recipes.addFurnace(ItemID.ImpureSilverDust, ItemID.SilverIngot, 0);
Recipes.addFurnace(ItemID.ImpureLeadDust, ItemID.LeadIngot, 0);
Recipes.addFurnace(ItemID.ImpureTinDust, ItemID.TinIngot, 0);
Recipes.addFurnace(ItemID.ImpureCopperDust, ItemID.CopperIngot, 0);
Recipes.addFurnace(ItemID.ImpureIronDust, 265, 0);

Recipes.addFurnace(BlockID.oreTetrahedrite, ItemID.CopperIngot, 0);
Recipes.addFurnace(BlockID.oreAntimonite, ItemID.AntimonyIngot, 0);
Recipes.addFurnace(BlockID.oreChalcopyrite, ItemID.CopperIngot, 0);
Recipes.addFurnace(BlockID.orePyrite, 265, 0);
Recipes.addFurnace(BlockID.oreMalachite, ItemID.CopperIngot, 0);
Recipes.addFurnace(BlockID.oreCassiterite, ItemID.TinIngot, 0);
Recipes.addFurnace(BlockID.oreBandedIron, 265, 0);
Recipes.addFurnace(BlockID.oreYellowLimonite, 265, 0);
Recipes.addFurnace(BlockID.oreBrownLimonite, 265, 0);
Recipes.addFurnace(BlockID.oreSilver, ItemID.SilverIngot, 0);
Recipes.addFurnace(BlockID.oreLead, ItemID.LeadIngot, 0);
Recipes.addFurnace(BlockID.oreTin, ItemID.TinIngot, 0);
Recipes.addFurnace(BlockID.oreCopper, ItemID.CopperIngot, 0);
Recipes.addFurnace(BlockID.oreIron, 265, 0);
Recipes.addFurnace(ItemID.IronDust, 265, 0);
Recipes.addFurnace(ItemID.CopperDust, ItemID.CopperIngot, 0);
Recipes.addFurnace(ItemID.LeadDust, ItemID.LeadIngot, 0);
Recipes.addFurnace(ItemID.GoldDust, 266, 0);
Recipes.addFurnace(ItemID.TinDust, ItemID.TinIngot, 0);
Recipes.addFurnace(ItemID.SilverDust, ItemID.SilverIngot, 0);
Recipes.addFurnace(ItemID.BronzeDust, ItemID.BronzeIngot, 0);
Recipes.addFurnace(ItemID.AntimonyDust, ItemID.AntimonyIngot, 0);

Recipes.addFurnace(ItemID.IronPlate, 265, 0);
Recipes.addFurnace(ItemID.CopperPlate, ItemID.CopperIngot, 0);
Recipes.addFurnace(ItemID.LeadPlate, ItemID.LeadIngot, 0);
Recipes.addFurnace(ItemID.GoldPlate, 266, 0);
Recipes.addFurnace(ItemID.TinPlate, ItemID.TinIngot, 0);
Recipes.addFurnace(ItemID.SilverPlate, ItemID.SilverIngot, 0);
Recipes.addFurnace(ItemID.BronzePlate, ItemID.BronzeIngot, 0);
Recipes.addFurnace(ItemID.AntimonyPlate, ItemID.AntimonyIngot, 0);




// file: Machines/CraftGregTech.js

var ClCraft=0;
var recipe = [
//minecraftrecipe
[306, 1, 1, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, 0, 0, 0],
[307, 1, 1, 0, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate],
[308, 1, 1, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate],
[309, 1, 1, 0, 0, 0, 0, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate],
[314, 1, 1, 0, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, 0, ItemID.GoldPlate, 0, 0, 0],
[315, 1, 1, 0, ItemID.GoldPlate, 0, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate],
[316, 1, 1, 0, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, ItemID.GoldPlate, 0, ItemID.GoldPlate, ItemID.GoldPlate, 0, ItemID.GoldPlate],
[317, 1, 1, 0, 0, 0, 0, ItemID.GoldPlate, 0, ItemID.GoldPlate, ItemID.GoldPlate, 0, ItemID.GoldPlate],
[310, 1, 4, 0, 264, 264, 264, 264, 0, 264, 0, 0, 0],
[311, 1, 4, 0, 264, 0, 264, 264, 264, 264, 264, 264, 264],
[312, 1, 4, 0, 264, 264, 264, 264, 0, 264, 264, 0, 264],
[313, 1, 4, 0, 0, 0, 0, 264, 0, 264, 264, 0, 264],

[328, 1, 1, 0, 0, 0, 0, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate],
[330, 1, 1, 0, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate],
[359, 1, 5, 0, ItemID.IronPlate, 0, 0, 0, ItemID.IronPlate, 0, 0, 0, 0],
[167, 1, 5, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, 0, 0, 0],
[101, 6, 2, 0, 0, 0, 0, ItemID.IronRod, ItemID.IronRod, ItemID.IronRod, ItemID.IronRod, ItemID.IronRod, ItemID.IronRod],
[148, 1, 1, 0, ItemID.IronPlate, ItemID.IronPlate, 0, 0, 0, 0, 0, 0, 0],
[147, 1, 1, 0, ItemID.GoldPlate, ItemID.GoldPlate, 0, 0, 0, 0, 0, 0, 0],
[380, 1, 1, 0, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, 0, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate, ItemID.IronPlate],
[325, 1, 1, 0, ItemID.IronPlate, 0, ItemID.IronPlate, 0, ItemID.IronPlate, 0, 0, 0, 0],
//impuredust
[331, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureRedstoneDust, 0, 0, 0, 0],
[ItemID.LigniteDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureLigniteDust, 0, 0, 0, 0],
[ItemID.AntimonyDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureAntimonyDust, 0, 0, 0, 0],
[ItemID.LapisLazuliDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureLapisLazuliDust, 0, 0, 0, 0],
[ItemID.EmeraldDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureEmeraldDust, 0, 0, 0, 0],
[ItemID.DiamondDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureDiamondDust, 0, 0, 0, 0],
[ItemID.CoalDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureCoalDust, 0, 0, 0, 0],
[ItemID.IronDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureIronDust, 0, 0, 0, 0],
[ItemID.TinDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureTinDust, 0, 0, 0, 0],
[ItemID.SilverDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureSilverDust, 0, 0, 0, 0],
[ItemID.GoldDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureGoldDust, 0, 0, 0, 0],
[ItemID.CopperDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureCopperDust, 0, 0, 0, 0],
[ItemID.LeadDust, 1, 9, 0, 0, 0, 0, 0, ItemID.ImpureLeadDust, 0, 0, 0, 0],
//Shapes
[ItemID.MoldPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0],
[ItemID.EmptyShapePlate, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelPlate, 0, ItemID.SteelPlate, ItemID.SteelPlate, 0, 0, 0, 0],
[ItemID.MoldAnvil, 1, 1, 0, 0, 0, 0, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0],
[ItemID.MoldCylinder, 1, 1, 0, 0, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0, 0],
[ItemID.MoldIngot, 1, 1, 0, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0, 0, 0],
[ItemID.MoldNuggets, 1, 1, 0, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.MoldBlock, 1, 1, 0, ItemID.EmptyShapePlate, 0, 0, 0, 0, 0, 0, 0, 0],
//Plates
[ItemID.IronPlate, 1, 1, 0, 0, 0, 0, 0, 265, 0, 0, 265, 0],
[ItemID.GoldPlate, 1, 1, 0, 0, 0, 0, 0, 266, 0, 0, 266, 0],
[ItemID.CopperPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.CopperIngot, 0, 0, ItemID.CopperIngot, 0],
[ItemID.TinPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.TinIngot, 0, 0, ItemID.TinIngot, 0],
[ItemID.LeadPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.LeadIngot, 0, 0, ItemID.LeadIngot, 0],
[ItemID.AntimonyPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.AntimonyIngot, 0, 0, ItemID.AntimonyIngot, 0],
[ItemID.SilverPlate, 1, 1, 0, 0, 0, 0, 0, ItemID.SilverIngot, 0, 0, ItemID.SilverIngot, 0],
[ItemID.BronzePlate, 1, 1, 0, 0, 0, 0, 0, ItemID.BronzeIngot, 0, 0, ItemID.BronzeIngot, 0],

//long rods
[ItemID.LongIronRod, 1, 1, 0, ItemID.IronRod, 0, ItemID.IronRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongGoldRod, 1, 1, 0, ItemID.GoldRod, 0, ItemID.GoldRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongBronzeRod, 1, 1, 0, ItemID.BronzeRod, 0, ItemID.BronzeRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongCopperRod, 1, 1, 0, ItemID.CopperRod, 0, ItemID.CopperRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongTinRod, 1, 1, 0, ItemID.TinRod, 0, ItemID.TinRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongLeadRod, 1, 1, 0, ItemID.LeadRod, 0, ItemID.LeadRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongAntimonyRod, 1, 1, 0, ItemID.AntimonyRod, 0, ItemID.AntimonyRod, 0, 0, 0, 0, 0, 0],
[ItemID.LongSilverRod, 1, 1, 0, ItemID.SilverRod, 0, ItemID.SilverRod, 0, 0, 0, 0, 0, 0],

//wrenchs
[ItemID.IronWrench, 1, 1, 0, 265, 0, 265, 265, 265, 265, 0, 265, 0],
[ItemID.GoldWrench, 1, 1, 0, 266, 0, 266, 266, 266, 266, 0, 266, 0],
[ItemID.BronzeWrench, 1, 1, 0, ItemID.BronzeIngot, 0, ItemID.BronzeIngot, ItemID.BronzeIngot, ItemID.BronzeIngot, ItemID.BronzeIngot, 0, ItemID.BronzeIngot, 0],
[ItemID.LeadWrench, 1, 1, 0, ItemID.LeadIngot, 0, ItemID.LeadIngot, ItemID.LeadIngot, ItemID.LeadIngot, ItemID.LeadIngot, 0, ItemID.LeadIngot, 0],
[ItemID.SteelWrench, 1, 1, 0, ItemID.SteelIngot, 0, ItemID.SteelIngot, ItemID.SteelIngot, ItemID.SteelIngot, ItemID.SteelIngot, 0, ItemID.SteelIngot, 0],
[ItemID.SilverWrench, 1, 1, 0, ItemID.SilverIngot, 0, ItemID.SilverIngot, ItemID.SilverIngot, ItemID.SilverIngot, ItemID.SilverIngot, 0, ItemID.SilverIngot, 0],

//knifes
[ItemID.LeadKnife, 1, 5, 0, 0, ItemID.LeadPlate, 0, 0, ItemID.LeadRod, 0, 0, 0, 0],
[ItemID.SilverKnife, 1, 5, 0, 0, ItemID.SilverPlate, 0, 0, ItemID.SilverRod, 0, 0, 0, 0],
[ItemID.BronzeKnife, 1, 5, 0, 0, ItemID.BronzePlate, 0, 0, ItemID.BronzeRod, 0, 0, 0, 0],
[ItemID.GoldKnife, 1, 5, 0, 0, ItemID.GoldPlate, 0, 0, ItemID.GoldRod, 0, 0, 0, 0],
[ItemID.IronKnife, 1, 5, 0, 0, ItemID.IronPlate, 0, 0, ItemID.IronRod, 0, 0, 0, 0],
[ItemID.SteelKnife, 1, 5, 0, 0, ItemID.SteelPlate, 0, 0, ItemID.SteelPlate, 0, 0, 0, 0],

//rings
[ItemID.RubberRing, 1, 3, 0, 0, 0, 0, 0, ItemID.RubberPlate, 0, 0, 0, 0],
[ItemID.TinRing, 1, 1, 0, 0, 0, 0, 0, ItemID.TinRod, 0, 0, 0, 0],

//impureDusts
[ItemID.ImpureLigniteDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedLigniteOre, 0, 0, 0, 0],
[ItemID.ImpureLapisLazuliDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedLapisLazuliOre, 0, 0, 0, 0],
[ItemID.ImpureRedstoneDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedRedstoneOre, 0, 0, 0, 0],
[ItemID.ImpureEmeraldDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedEmeraldOre, 0, 0, 0, 0],
[ItemID.ImpureDiamondDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedDiamondOre, 0, 0, 0, 0],
[ItemID.ImpureCoalDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedCoalOre, 0, 0, 0, 0],
[ItemID.ImpureIronDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedIronOre, 0, 0, 0, 0],
[ItemID.ImpureTinDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedTinOre, 0, 0, 0, 0],
[ItemID.ImpureSilverDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedSilverOre, 0, 0, 0, 0],
[ItemID.ImpureGoldDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedGoldOre, 0, 0, 0, 0],
[ItemID.ImpureCopperDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedCopperOre, 0, 0, 0, 0],
[ItemID.ImpureLeadDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedLeadOre, 0, 0, 0, 0],
[ItemID.ImpureAntimonyDust, 1, 1, 0, 0, 0, 0, 0, ItemID.CrushedAntimonyOre, 0, 0, 0, 0],

//gems
[ItemID.FlawlessDiamond, 2, 1, 0, 0, 0, 0, 0, ItemID.PerfectDiamond, 0, 0, 0, 0],
[264, 2, 1, 0, 0, 0, 0, 0, ItemID.FlawlessDiamond, 0, 0, 0, 0],
[ItemID.DefectiveDiamond, 2, 1, 0, 0, 0, 0, 0, 264, 0, 0, 0, 0],
[ItemID.SplitDiamond, 2, 1, 0, 0, 0, 0, 0, ItemID.DefectiveDiamond, 0, 0, 0, 0],
[ItemID.FlawlessEmerald, 2, 1, 0, 0, 0, 0, 0, ItemID.PerfectEmerald, 0, 0, 0, 0],
[388, 2, 1, 0, 0, 0, 0, 0, ItemID.FlawlessEmerald, 0, 0, 0, 0],
[ItemID.DefectiveEmerald, 2, 1, 0, 0, 0, 0, 0, 388, 0, 0, 0, 0],
[ItemID.SplitEmerald, 2, 1, 0, 0, 0, 0, 0, ItemID.DefectiveEmerald, 0, 0, 0, 0],

//Swords
[ItemID.IronSword, 1, 5, 0, 0, ItemID.IronPlate, 0, 0, 265, 0, 0, 280, 0],
[ItemID.BronzeSword, 1, 5, 0, 0, ItemID.BronzePlate, 0, 0, ItemID.BronzeIngot, 0, 0, 280, 0],
[ItemID.SteelSword, 1, 5, 0, 0, ItemID.SteelPlate, 0, 0, ItemID.SteelIngot, 0, 0, 280, 0],
[ItemID.DiamondSword, 1, 4, 0, 0, 264, 0, 0, 264, 0, 0, 280, 0],
[ItemID.EmeraldSword, 1, 4, 0, 0, 388, 0, 0, 388, 0, 0, 280, 0],

//Shovels
[ItemID.IronShovel, 1, 5, 0, 0, ItemID.IronPlate, 0, 0, 280, 0, 0, 280, 0],
[ItemID.BronzeShovel, 1, 5, 0, 0, ItemID.BronzePlate, 0, 0, 280, 0, 0, 280, 0],
[ItemID.SteelShovel, 1, 5, 0, 0, ItemID.SteelPlate, 0, 0, 280, 0, 0, 280, 0],
[ItemID.DiamondShovel, 1, 5, 0, 0, 264, 0, 0, 280, 0, 0, 280, 0],
[ItemID.EmeraldShovel, 1, 5, 0, 0, 388, 0, 0, 280, 0, 0, 280, 0],

//Axes
[ItemID.IronAxe, 1, 5, 0, ItemID.IronPlate, 265, 0, ItemID.IronPlate, 280, 0, 0, 280, 0],
[ItemID.BronzeAxe, 1, 5, 0, ItemID.BronzePlate, ItemID.BronzeIngot, 0, ItemID.BronzePlate, 280, 0, 0, 280, 0],
[ItemID.SteelAxe, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelIngot, 0, ItemID.SteelPlate, 280, 0, 0, 280, 0],
[ItemID.DiamondAxe, 1, 5, 0, 264, 264, 0, 264, 280, 0, 0, 280, 0],
[ItemID.EmeraldAxe, 1, 5, 0, 388, 388, 0, 388, 280, 0, 0, 280, 0],

//Pickaxes
[ItemID.IronPickaxe, 1, 5, 0, ItemID.IronPlate, 265, 265, 0, 280, 0, 0, 280, 0],
[ItemID.BronzePickaxe, 1, 5, 0, ItemID.BronzePlate, ItemID.BronzeIngot, ItemID.BronzeIngot, 0, 280, 0, 0, 280, 0],
[ItemID.SteelPickaxe, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelIngot, ItemID.SteelIngot, 0, 280, 0, 0, 280, 0],
[ItemID.DiamondPickaxe, 1, 5, 0, 264, 264, 264, 0, 280, 0, 0, 280, 0],
[ItemID.EmeraldPickaxe, 1, 5, 0, 388, 388, 388, 0, 280, 0, 0, 280, 0],

//hoes
[ItemID.IronHoe, 1, 5, 0, ItemID.IronPlate, 265, 0, 0, 280, 0, 0, 280, 0],
[ItemID.BronzeHoe, 1, 5, 0, ItemID.BronzePlate, ItemID.BronzeIngot, 0, 0, 280, 0, 0, 280, 0],
[ItemID.SteelHoe, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelIngot, 0, 0, 280, 0, 0, 280, 0],
[ItemID.DiamondHoe, 1, 5, 0, 264, 264, 0, 0, 280, 0, 0, 280, 0],
[ItemID.EmeraldHoe, 1, 5, 0, 388, 388, 0, 0, 280, 0, 0, 280, 0],

//sawBlade
[ItemID.BronzeSawBlade, 1, 5, 0, ItemID.BronzePlate, ItemID.BronzePlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.GoldSawBlade, 1, 5, 0, ItemID.GoldPlate, ItemID.GoldPlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.IronSawBlade, 1, 5, 0, ItemID.IronPlate, ItemID.IronPlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.SilverSawBlade, 1, 5, 0, ItemID.SilverPlate, ItemID.SilverPlate, 0, 0, 0, 0, 0, 0, 0],
[ItemID.SteelSawBlade, 1, 5, 0, ItemID.SteelPlate, ItemID.SteelPlate, 0, 0, 0, 0, 0, 0, 0],

//rods
[ItemID.IronRod, 1, 4, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0],
[ItemID.BronzeRod, 1, 4, 0, 0, 0, 0, 0, ItemID.BronzeIngot, 0, 0, 0, 0],
[ItemID.SilverRod, 1, 4, 0, 0, 0, 0, 0, ItemID.SilverIngot, 0, 0, 0, 0],
[ItemID.TinRod, 1, 4, 0, 0, 0, 0, 0, ItemID.TinIngot, 0, 0, 0, 0],
[ItemID.CopperRod, 1, 4, 0, 0, 0, 0, 0, ItemID.CopperIngot, 0, 0, 0, 0],
[ItemID.SteelRod, 1, 4, 0, 0, 0, 0, 0, ItemID.SteelIngot, 0, 0, 0, 0],
[ItemID.LeadRod, 1, 4, 0, 0, 0, 0, 0, ItemID.LeadIngot, 0, 0, 0, 0],
[ItemID.AntimonyRod, 1, 4, 0, 0, 0, 0, 0, ItemID.AntimonyIngot, 0, 0, 0, 0],
[ItemID.GoldRod, 1, 4, 0, 0, 0, 0, 0, 266, 0, 0, 0, 0],

//dusts
[ItemID.IronDust, 1, 8, 0, 0, 0, 0, 0, 265, 0, 0, 0, 0],
[ItemID.BronzeDust, 1, 8, 0, 0, 0, 0, 0, ItemID.BronzeIngot, 0, 0, 0, 0],
[ItemID.SilverDust, 1, 8, 0, 0, 0, 0, 0, ItemID.SilverIngot, 0, 0, 0, 0],
[ItemID.TinDust, 1, 8, 0, 0, 0, 0, 0, ItemID.TinIngot, 0, 0, 0, 0],
[ItemID.CopperDust, 1, 8, 0, 0, 0, 0, 0, ItemID.CopperIngot, 0, 0, 0, 0],
[ItemID.SteelDust, 1, 8, 0, 0, 0, 0, 0, ItemID.SteelIngot, 0, 0, 0, 0],
[ItemID.LeadDust, 1, 8, 0, 0, 0, 0, 0, ItemID.LeadIngot, 0, 0, 0, 0],
[ItemID.AntimonyDust, 1, 8, 0, 0, 0, 0, 0, ItemID.AntimonyIngot, 0, 0, 0, 0],
[ItemID.GoldDust, 1, 8, 0, 0, 0, 0, 0, 266, 0, 0, 0, 0],
[ItemID.DiamondDust, 1, 8, 0, 0, 0, 0, 0, 264, 0, 0, 0, 0],
[ItemID.CoalDust, 1, 8, 0, 0, 0, 0, 0, 263, 0, 0, 0, 0],
[ItemID.EmeraldDust, 1, 8, 0, 0, 0, 0, 0, 388, 0, 0, 0, 0],
[ItemID.LapisLazuliDust, 1, 8, 0, 0, 0, 0, 0, 351, 0, 0, 0, 0],

//saw
[5, 4, 7, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0],
[5, 4, 7, 0, 0, 0, 0, 0, 162, 0, 0, 0, 0],
[280, 4, 7, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0],
[ItemID.IronBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.IronRod, 0, 0, 0, 0],
[ItemID.BronzeBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.BronzeRod, 0, 0, 0, 0],
[ItemID.SilverBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.SilverRod, 0, 0, 0, 0],
[ItemID.TinBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.TinRod, 0, 0, 0, 0],
[ItemID.CopperBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.CopperRod, 0, 0, 0, 0],
[ItemID.SteelBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.SteelRod, 0, 0, 0, 0],
[ItemID.LeadBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.LeadRod, 0, 0, 0, 0],
[ItemID.AntimonyBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.AntimonyRod, 0, 0, 0, 0],
[ItemID.GoldBolt, 2, 7, 0, 0, 0, 0, 0, ItemID.GoldRod, 0, 0, 0, 0],

//pipes
[BlockID.SmallBronzeFluidPipe, 6, 6, 0, ItemID.BronzePlate, 0, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate],
[BlockID.BronzeFluidPipe, 2, 6, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, 0, 0, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate],

//blocks
[BlockID.BronzePlatedBlastFurnase, 1, 2, 0, ItemID.BronzePlate, 61, ItemID.BronzePlate, 61, 0, 61, ItemID.BronzePlate, 61, ItemID.BronzePlate],
[BlockID.BronzePlatedBricks, 2, 2, 0, ItemID.BronzePlate, 0, ItemID.BronzePlate, ItemID.BronzePlate, 45, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate],
[BlockID.BronzeHull, 1, 2, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate],
[BlockID.BrikedBronzeHull, 1, 2, 0, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, ItemID.BronzePlate, 0, ItemID.BronzePlate, 45, 45, 45],
]


Translation.addTranslation("Gregtech workbench", {ru: "Верстак(GregTech)",  zh: "格雷工作台"});

IDRegistry.genBlockID("gregCraft");
Block.createBlockWithRotation("gregCraft", [
{name: "Gregtech workbench", texture: [["GGCB", 0], ["GGCT", 0], ["GGCS", 0], ["GGCS", 0], ["GGCS", 0], ["GGCS", 0],], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.gregCraft, count: 1, data: 0}, [
		"ww ",
		"ww ",
		"   "
	], ['w', 4, 0]);
});

var guiCraftGreg = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Craft"}},
        inventory: {standart: true},
        background: {standart: true}
    },

    
    drawing: [
           
    ],
	
    
    elements: {
        "slot1": {type: "slot", x: 460, y: 150},
	    "slot2": {type: "slot", x: 520, y: 150},
		"slot3": {type: "slot", x: 580, y: 150},
		"slot4": {type: "slot", x: 460, y: 210},
		"slot5": {type: "slot", x: 520, y: 210},
		"slot6": {type: "slot", x: 580, y: 210},
		"slot7": {type: "slot", x: 460, y: 270},
		"slot8": {type: "slot", x: 520, y: 270},
		"slot9": {type: "slot", x: 580, y: 270},
		"slotResult": {type: "slot", x: 680, y: 210},
		"craft_button": {type: "button",  x: 600, y: 350, bitmap: "CraftButton", bitmap2: "CraftButtonDown", scale: 3.2, clicker: {onClick: function(){if(ClCraft == 0){ClCraft = 1;}}}},
		"slotT1": {type: "slot", x: 800, y: 120},
		"slotT2": {type: "slot", x: 800, y: 180},
		"slotT3": {type: "slot", x: 800, y: 240},
		"slotT4": {type: "slot", x: 800, y: 300},
	}
});

SteamMachineRegistry.register(BlockID.gregCraft, {
	defaultValues: {
		set: 0,
		ham: 0,
		ham2: 0,
		water: 0
	},
	
	getGuiScreen: function(){
		return guiCraftGreg;
	},
	
	tick: function(){
		var slot1 = this.container.getSlot("slot1");
		var slot2 = this.container.getSlot("slot2");
		var slot3 = this.container.getSlot("slot3");
		var slot4 = this.container.getSlot("slot4");
		var slot5 = this.container.getSlot("slot5");
		var slot6 = this.container.getSlot("slot6");
		var slot7 = this.container.getSlot("slot7");
		var slot8 = this.container.getSlot("slot8");
		var slot9 = this.container.getSlot("slot9");
		var slot10 = this.container.getSlot("slotResult");
		var slot11 = this.container.getSlot("slotT1");
		var slot12 = this.container.getSlot("slotT2");
		var slot13 = this.container.getSlot("slotT3");
		var slot14 = this.container.getSlot("slotT4");
		var slot = [slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9, slot10, slot11, slot12, slot13, slot14];
		if (slot1.count == 0)
	   {
		   slot1.id = 0;
	   }
	    if (slot2.count == 0)
	   {
		   slot2.id = 0;
	   }
	    if (slot3.count == 0)
	   {
		   slot3.id = 0;
	   }
	    if (slot4.count == 0)
	   {
		   slot4.id = 0;
	   }
	    if (slot5.count == 0)
	   {
		   slot5.id = 0;
	   }
	    if (slot6.count == 0)
	   {
		   slot6.id = 0;
	   }
	    if (slot7.count == 0)
	   {
		   slot7.id = 0;
	   }
	    if (slot8.count == 0)
	   {
		   slot8.id = 0;
	   }
	    if (slot9.count == 0)
	   {
		   slot9.id = 0;
	   }
	    if (slot11.count == 0)
	   {
		   slot11.id = 0;
	   }
	    if (slot12.count == 0)
	   {
		   slot12.id = 0;
	   }
	   if (slot13.count == 0)
	   {
		   slot13.id = 0;
	   }
	   if (slot14.count == 0)
	   {
		   slot14.id = 0;
	   }
for(var craft in slot){
	if(slot[craft].count<0){
		slot[craft].count=0;
	}
}
if(slot[10].id==0){
		this.data.ham=0;	
	}
if(this.data.ham2>0&&(slot[11].id==0||slot[10].id==0)){
		this.data.ham2=0;	
	}
for(var b in Hammers){
		if(slot[10].id==Hammers[b][0]){
			this.data.ham=1;
		}
		if(slot[10].id==Hammers[b][0]&&slot[10].data>=Hammers[b][1]){
			slot[10].count=0;
		}
	}
for(var w in Wrenchs){
		if(slot[10].id==Wrenchs[w][0]){
			this.data.ham=2;
		}
		if(slot[10].id==Wrenchs[w][0]&&slot[10].data>=Wrenchs[w][1]){
			slot[10].count=0;
		}
	}
for(var k in Knifes){
		if(slot[10].id==Knifes[k][0]){
			this.data.ham=3;
		}
		if(slot[10].id==Knifes[k][0]&&slot[10].data>=Knifes[k][1]){
			slot[10].count=0;
		}
	}
for(var f in Files){
		if(slot[10].id==Files[f][0]){
			this.data.ham=4;
		}
		if(slot[10].id==Files[f][0]&&slot[10].data>=Files[f][1]){
			slot[10].count=0;
		}
	}
for(var m in Mortars){
        if(slot[10].id==Mortars[m][0]){
            this.data.ham=8;
        }
        if(slot[10].id==Mortars[m][0]&&slot[10].data>=Mortars[m][1]){
            slot[10].count=0;
        }
    }
for(var s in Saws){
        if(slot[10].id==Saws[s][0]){
            this.data.ham=7;
        }
        if(slot[10].id==Saws[s][0]&&slot[10].data>=Saws[s][1]){
            slot[10].count=0;
        }
    }
for(var hf in Files){
for(var fh in Hammers){
		if((slot[11].id==Files[hf][0]||slot[10].id==Files[hf][0])&&(slot[10].id==Hammers[fh][0]||slot[11].id==Hammers[fh][0])){
			this.data.ham2=5;
		}
		if(slot[10].id==Files[hf][0]&&slot[10].data>=Files[hf][1]||slot[10].id==Hammers[fh][0]&&slot[10].data>=Hammers[fh][1]){
			slot[10].count=0;
		}
        if(slot[11].id==Files[hf][0]&&slot[11].data>=Files[hf][1]||slot[11].id==Hammers[fh][0]&&slot[11].data>=Hammers[fh][1]){
			slot[11].count=0;
		}
	}
}
 if((slot[10].id==325&&slot[10].data==8)||slot[10].id==ItemID.cellWater){
            this.data.ham=9;
        }

for(var hw in Wrenchs){
for(var wh in Hammers){
		if((slot[11].id==Wrenchs[hw][0]||slot[10].id==Wrenchs[hw][0])&&(slot[10].id==Hammers[wh][0]||slot[11].id==Hammers[wh][0])){
			this.data.ham2=6;
		}
		if(slot[10].id==Wrenchs[hw][0]&&slot[10].data>=Wrenchs[hw][1]||slot[10].id==Hammers[wh][0]&&slot[10].data>=Hammers[wh][1]){
			slot[10].count=0;
		}
        if(slot[11].id==Wrenchs[hw][0]&&slot[11].data>=Wrenchs[hw][1]||slot[11].id==Hammers[wh][0]&&slot[11].data>=Hammers[wh][1]){
			slot[11].count=0;
		}
	}
}
	
	if(ClCraft==1){
for(var k in recipe){
if(slot[0].id==recipe[k][4]&& slot[1].id==recipe[k][5]&&slot[2].id==recipe[k][6]&&slot[3].id==recipe[k][7]&&slot[4].id==recipe[k][8]&&slot[5].id==recipe[k][9]&&slot[6].id==recipe[k][10]&&slot[7].id==recipe[k][11]&&slot[8].id==recipe[k][12]&&(recipe[k][2]==this.data.ham||recipe[k][2]==this.data.ham2)){
this.data.set++;
if(this.data.set==9&&(slot[9].id==recipe[k][0]||slot[9].id==0)&&slot[9].count<=64-recipe[k][1]){
slot[9].id=recipe[k][0];
slot[9].count+=recipe[k][1];					slot[9].data=recipe[k][3];
if(this.data.ham!=9){
slot[10].data+=1;
}
if(slot[11].id>0){
slot[11].data++;
}
slot[0].count--;
slot[1].count--; 
slot[2].count--;
slot[3].count--;
slot[4].count--;
slot[5].count--;
slot[6].count--;
slot[7].count--;
slot[8].count--;
ClCraft=0;
this.data.set=0;
if(this.data.ham==9){
this.data.water++;
}
if(this.data.water==8){
if(slot[10].id==325){
slot[10].data=0;
this.data.ham=0;
this.data.water=0;
}
if(slot[10].id==ItemID.cellWater){
slot[10].id=ItemID.cellEmpty;
this.data.ham=0;
this.data.water=0;
}
}
          }						
        }
      }
    }
  }
});




// file: Machines/SmallBoiler.js

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




// file: Machines/SteamFurnase.js

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




// file: Machines/SimpleSolarBoiler.js

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
	], ['g', 20, 0, 's', ItemID.SilverPlate, 0, 'c', BlockID.BrikedBronzeHull, 0, 'p', BlockID.SmallBronzeFluidPipe, 0]);
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




// file: Machines/SteamMacerator.js

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




// file: Machines/SteamExtractor.js

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
ItemID.latex, {id: ItemID.RubberDust, count: 3, data: 0});
ICore.Recipe.addRecipeFor("extractor", "38:4", {id: 351, count: 2, data: 1});  
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




// file: Machines/SteamForgeHammer.js

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




// file: Machines/SteamCompressor.js

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
ICore.Recipe.addRecipeFor("compressor", ItemID.SilverIngot, {id: BlockID.SilverBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", ItemID.TinIngot, {id: BlockID.TinBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", ItemID.SteelIngot, {id: BlockID.SteelBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", 265, {id: 42, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", ItemID.CopperIngot, {id: BlockID.CopperBlock, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", 377, {id: 369, count: 1, data: 0, ingredientCount: 5});   
ICore.Recipe.addRecipeFor("compressor", ItemID.TinyPileCopperDust, {id: ItemID.CopperDust, count: 1, data: 0, ingredientCount: 9});   
ICore.Recipe.addRecipeFor("compressor", ItemID.TinyPileLeadDust, {id: ItemID.LeadDust, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", ItemID.TinyPileBronzeDust, {id: ItemID.BronzeDust, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", 263, {id: 173, count: 1, data: 0, ingredientCount: 9});  
ICore.Recipe.addRecipeFor("compressor", 406, {id: 155, count: 1, data: 0, ingredientCount: 4});  
ICore.Recipe.addRecipeFor("compressor", ItemID.TinyPileSilverDust, {id: ItemID.SilverDust, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", 264, {id: 57, count: 1, data: 0, ingredientCount: 9}); 
ICore.Recipe.addRecipeFor("compressor", 388, {id: 133, count: 1, data: 0, ingredientCount: 9}); 
ICore.Recipe.addRecipeFor("compressor", ItemID.BronzeIngot, {id: BlockID.BronzeBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", 348, {id: 89, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", 12, {id: 24, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", 336, {id: 45, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", 80, {id: 79, count: 1, data: 0, ingredientCount: 1});
ICore.Recipe.addRecipeFor("compressor", 266, {id: 41, count: 1, data: 0, ingredientCount: 9}); 
ICore.Recipe.addRecipeFor("compressor", 331, {id: 152, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", ItemID.LeadIngot, {id: BlockID.LeadBlock, count: 1, data: 0, ingredientCount: 9});
ICore.Recipe.addRecipeFor("compressor", 337, {id: 82, count: 1, data: 0, ingredientCount: 4});
ICore.Recipe.addRecipeFor("compressor", ItemID.TinyPileTinDust, {id: ItemID.TinDust, count: 1, data: 0, ingredientCount: 9}); 
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




// file: Machines/SteamAlloySmelter.js

var Alloy = 
[
[ItemID.carbonPlate, 1, 20, 3, BlockID.reinforcedGlass, 4],
[ItemID.plateAlloy, 1, 20, 3, BlockID.reinforcedGlass, 4],
[ItemID.CopperDust, 3, ItemID.TinDust, 1, ItemID.BronzeIngot, 4],
[ItemID.CopperIngot, 3, ItemID.TinIngot, 1, ItemID.BronzeIngot, 4],
[ItemID.CopperDust, 3, ItemID.TinIngot, 1, ItemID.BronzeIngot, 4],
[ItemID.CopperIngot, 3, ItemID.TinDust, 1, ItemID.BronzeIngot, 4],

//nuggets
[ItemID.CopperIngot, 1, ItemID.MoldNuggets, 0, ItemID.CopperNugget, 9],
[ItemID.RubberIngot, 1, ItemID.MoldNuggets, 0, ItemID.RubberNugget, 9],
[265, 1, ItemID.MoldNuggets, 0, ItemID.IronNugget, 9],
[ItemID.LeadIngot, 1, ItemID.MoldNuggets, 0, ItemID.LeadNugget, 9],
[266, 1, ItemID.MoldNuggets, 0, ItemID.GoldNugget, 9],
[ItemID.BronzeIngot, 1, ItemID.MoldNuggets, 0, ItemID.BronzeNugget, 9],
[ItemID.TinIngot, 1, ItemID.MoldNuggets, 0, ItemID.TinNugget, 9],
[ItemID.SteelIngot, 1, ItemID.MoldNuggets, 0, ItemID.SteelNugget, 9],
[ItemID.SilverIngot, 1, ItemID.MoldNuggets, 0, ItemID.SilverNugget, 9],
[ItemID.AntimonyIngot, 1, ItemID.MoldNuggets, 0, ItemID.AntimonyNugget, 9],


//ingots
[ItemID.AntimonyNugget, 9, ItemID.MoldIngot, 0, ItemID.AntimonyIngot, 1],
[ItemID.RubberNugget, 9, ItemID.MoldIngot, 0, ItemID.RubberIngot, 1],
[ItemID.TinyPileRubberDust, 9, ItemID.MoldIngot, 0, ItemID.RubberIngot, 1],
[ItemID.SmallPileRubberDust, 4, ItemID.MoldIngot, 0, ItemID.RubberIngot, 1],
[ItemID.RubberDust, 1, ItemID.MoldIngot, 0, ItemID.RubberIngot, 1],
[ItemID.BronzeNugget, 9, ItemID.MoldIngot, 0, ItemID.BronzeIngot, 1],
[ItemID.TinNugget, 9, ItemID.MoldIngot, 0, ItemID.TinIngot, 1],
[ItemID.CopperNugget, 9, ItemID.MoldIngot, 0, ItemID.CopperIngot, 1],
[ItemID.SilverNugget, 9, ItemID.MoldIngot, 0, ItemID.SilverIngot, 1],
[ItemID.LeadNugget, 9, ItemID.MoldIngot, 0, ItemID.LeadIngot, 1],
[ItemID.GoldNugget, 9, ItemID.MoldIngot, 0, 266, 1],
[ItemID.IronNugget, 9, ItemID.MoldIngot, 0, 265, 1],
[ItemID.LongIronRod, 1, ItemID.MoldIngot, 0, 265, 1],
[ItemID.TinyPileTinDust, 9, ItemID.MoldIngot, 0, ItemID.TinIngot, 1],
[ItemID.SmallPileTinDust, 4, ItemID.MoldIngot, 0, ItemID.TinIngot, 1],
[ItemID.SmallPileCopperDust, 4, ItemID.MoldIngot, 0, ItemID.CopperIngot, 1],
[ItemID.TinyPileCopperDust, 9, ItemID.MoldIngot, 0, ItemID.CopperIngot, 1],
[ItemID.TinyPileIronDust, 9, ItemID.MoldIngot, 0, 265, 1],
[ItemID.TinyPileLeadDust, 9, ItemID.MoldIngot, 0, ItemID.LeadIngot, 1],
[ItemID.SmallPileLeadDust, 4, ItemID.MoldIngot, 0, ItemID.LeadIngot, 1],
[ItemID.SmallPileIronDust, 4, ItemID.MoldIngot, 0, 265, 1],
[ItemID.TinyPileSilverDust, 9, ItemID.MoldIngot, 0, ItemID.SilverIngot, 1],
[ItemID.SmallPileSilverDust, 4, ItemID.MoldIngot, 0, ItemID.SilverIngot, 1],
[ItemID.IronPlate, 1, ItemID.MoldIngot, 0, 265, 1],
[ItemID.SmallPileBronzeDust, 4, ItemID.MoldIngot, 0, ItemID.BronzeIngot, 1],
[ItemID.SmallPileGoldDust, 4, ItemID.MoldIngot, 0, 266, 1],
[ItemID.TinyPileAntimonyDust, 9, ItemID.MoldIngot, 0, ItemID.AntimonyIngot, 1],
[ItemID.SmallPileAntimonyDust, 4, ItemID.MoldIngot, 0, ItemID.AntimonyIngot, 1],
[ItemID.TinyPileGoldDust, 9, ItemID.MoldIngot, 0, 266, 1],
[ItemID.TinyPileBronzeDust, 9, ItemID.MoldIngot, 0, ItemID.BronzeIngot, 1],
[ItemID.BronzeDust, 1, ItemID.MoldIngot, 0, ItemID.BronzeIngot, 1],
[ItemID.RubberDust, 1, ItemID.MoldIngot, 0, ItemID.RubberIngot, 1],
[ItemID.CopperDust, 1, ItemID.MoldIngot, 0, ItemID.CopperIngot, 1],
[ItemID.TinDust, 1, ItemID.MoldIngot, 0, ItemID.TinIngot, 1],
[ItemID.IronDust, 1, ItemID.MoldIngot, 0, 265, 1],
[ItemID.GoldDust, 1, ItemID.MoldIngot, 0, 266, 1],
[ItemID.SilverDust, 1, ItemID.MoldIngot, 0, ItemID.SilverIngot, 1],
[ItemID.AntimonyDust, 1, ItemID.MoldIngot, 0, ItemID.AntimonyIngot, 1],
[ItemID.LeadDust, 1, ItemID.MoldIngot, 0, ItemID.LeadIngot, 1],

//plates
[ItemID.RubberIngot, 2, ItemID.MoldPlate, 0, ItemID.RubberPlate, 1],
[ItemID.RubberDust, 2, ItemID.MoldPlate, 0, ItemID.RubberPlate, 1],
[ItemID.SteelIngot, 2, ItemID.MoldPlate, 0, ItemID.SteelPlate, 1],
[265, 2, ItemID.MoldPlate, 0, ItemID.IronPlate, 1],
[ItemID.CopperIngot, 2, ItemID.MoldPlate, 0, ItemID.CopperPlate, 1],
[ItemID.BronzeIngot, 2, ItemID.MoldPlate, 0, ItemID.BronzePlate, 1],
[ItemID.SilverIngot, 2, ItemID.MoldPlate, 0, ItemID.SilverPlate, 1],
[ItemID.TinIngot, 2, ItemID.MoldPlate, 0, ItemID.TinPlate, 1],
[266, 2, ItemID.MoldPlate, 0, ItemID.GoldPlate, 1],
[ItemID.LeadIngot, 2, ItemID.MoldPlate, 0, ItemID.LeadPlate, 1],
[ItemID.AntimonyIngot, 2, ItemID.MoldPlate, 0, ItemID.AntimonyPlate, 1],


[ItemID.SteelDust, 2, ItemID.MoldPlate, 0, ItemID.SteelPlate, 1],
[ItemID.IronDust, 2, ItemID.MoldPlate, 0, ItemID.IronPlate, 1],
[ItemID.CopperDust, 2, ItemID.MoldPlate, 0, ItemID.CopperPlate, 1],
[ItemID.BronzeDust, 2, ItemID.MoldPlate, 0, ItemID.BronzePlate, 1],
[ItemID.SilverDust, 2, ItemID.MoldPlate, 0, ItemID.SilverPlate, 1],
[ItemID.TinDust, 2, ItemID.MoldPlate, 0, ItemID.TinPlate, 1],
[ItemID.GoldDust, 2, ItemID.MoldPlate, 0, ItemID.GoldPlate, 1],
[ItemID.LeadDust, 2, ItemID.MoldPlate, 0, ItemID.LeadPlate, 1],
[ItemID.AntimonyDust, 2, ItemID.MoldPlate, 0, ItemID.AntimonyPlate, 1],

//anvil
[265, 31, ItemID.MoldAnvil, 0, 145, 1],
];

Translation.addTranslation("Steam Alloy Smelter", {ru: "Паровая плавильня",  zh: "蒸汽铸造"});

IDRegistry.genBlockID("SteamAlloySmelter");
Block.createBlockWithRotation("SteamAlloySmelter", [
{name: "Steam Alloy Smelter", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_BRONZE", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZE_ALLOYSMELTER", 0], ["MACHINE_BRONZEBRICKS", 0], ["MACHINE_BRONZEBRICKS", 0],], inCreative: true}
]);

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.SteamAlloySmelter, count: 1, data: 0}, [
		"bbb",
		"fcf",
		"bbb"
	], ['b', BlockID.SmallBronzeFluidPipe, 0, 'c', BlockID.BrikedBronzeHull, 0, 'f', 61, 0]);
});

var guiSteamAlloySmelter = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Steam Alloy Smelter"}},
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
        "slotSource": {type: "slot", x: 381, y: 150, bitmap: "bronzeSlotFire"},
		"slotSource2": {type: "slot", x: 441, y: 150, bitmap: "bronzeSlotFire"},
		"slotResult": {type: "slot", x: 625, y: 150},		
		"progressScale": {type: "scale", x: 530, y: 150, direction: 0, value: 0, bitmap: "BronzeProgressScale", scale: 3.2},
    }
});


SteamMachineRegistry.register(BlockID.SteamAlloySmelter, {
	defaultValues: {
		energy_consumption: 16,
		work_time: 200,
		progress: 0,
		gazLevel: 0
	},
	
	getGuiScreen: function(){
		return guiSteamAlloySmelter;
	},
	
	setDefaultValues: function(){
		this.data.energy_consumption = this.defaultValues.energy_consumption;
		this.data.work_time = this.defaultValues.work_time;
	},
	
	
	tick: function(){
		this.setDefaultValues();
		var content = this.container.getGuiContent();
		var sourceSlot = this.container.getSlot("slotSource");
		var sourceSlot2 = this.container.getSlot("slotSource2");
		var resultSlot = this.container.getSlot("slotResult");
		for (var a in Alloy){			
			if (sourceSlot.id == Alloy[a][0]&& sourceSlot2.id == Alloy[a][2]&& sourceSlot.count >= Alloy[a][1]&& sourceSlot2.count >= Alloy[a][3]&& (resultSlot.id == Alloy[a][4] || 0) && resultSlot.count < 64){
				if(this.data.steam >= this.data.energy_consumption){
					this.data.steam -= this.data.energy_consumption;
					this.data.progress += 1/this.data.work_time;
				}else{
            this.data.progress = 0;
        }
			
				if(this.data.progress >= 1 && this.data.gazLevel == 0){
                    
					sourceSlot.count -= Alloy[a][1];
					sourceSlot2.count -= Alloy[a][3];
					resultSlot.id = Alloy[a][4];
					resultSlot.data = 0;
					resultSlot.count += Alloy[a][5];
					this.container.validateAll();
					this.data.progress = 0;
				}
			}
		}
		this.container.setScale("progressScale", this.data.progress);
	},
					
	getEnergyStorage: function(){
		return 16000;
	},
	energyTick: SteamMachineRegistry.basicEnergyReceiveFunc	
});




// file: Machines/HighPressureCoalBoiler.js

Translation.addTranslation("High Pressure Coal Boiler", {ru: "Угольный бойлер высокого давления",  zh: "高壓煤鍋爐"});

IDRegistry.genBlockID("HighPressureCoalBoiler");
Block.createBlockWithRotation("HighPressureCoalBoiler", [
{name: "High Pressure Coal Boiler", texture: [["MACHINE_BRONZEBRICKS_BOTTOM", 0], ["MACHINE_STEEL_TOP", 0], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_HIGHPRESSURECOALBOILER_FRONT", 1], ["MACHINE_STEEL_SIDE", 0], ["MACHINE_STEEL_SIDE", 0],], inCreative: true}
]);

Block.registerDropFunction("HighPressureCoalBoiler", function(){
	return [[BlockID.HighPressureCoalBoiler, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.HighPressureCoalBoiler, count: 1, data: 0}, [
		"bbb",
		"b b",
		"cfc"
	], ['b', ItemID.SteelPlate, 0, 'c', 45, 0, 'f', 61, 0]);
});

var guiHighPressureCoalBoiler = new UI.StandartWindow({
    standart: {
        header: {text: {text: "High Pressure Coal Boiler"}},
        inventory: {standart: true},
        background: { bitmap: "SteelBG"}
    },
	params: {

         

               slot: "SteelSlot",

               invSlot: "SteelSlot"
     
          

     },

    
    drawing: [
            {type: "bitmap", x: 446, y: 200, bitmap: "SteelFuelIcon", scale: 3.2},
            {type: "bitmap", x: 530, y: 140, bitmap: "SteelFuelBG", scale: 3.2},  
 {type: "bitmap", x: 590, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
 {type: "bitmap", x: 650, y: 140, bitmap: "SteelFuelBG", scale: 3.2}, 
{type: "bitmap", x: 714, y: 200, bitmap: "SteelBurnBG", scale: 3.2},
{type: "bitmap", x: 900, y: 400, bitmap: "GTLogoSteel", scale: 4},     
    ],
	
    
    elements: {
        "slotWater": {type: "slot", x: 441, y: 132, bitmap:"SteelSlotIN"},
		"slotNull": {type: "slot", x: 441, y: 262, bitmap:"SteelSlotOUT"},
		"slotFuelD": {type: "slot", x: 711, y: 132, bitmap:"SteelSlotDust"},
		"slotFuel": {type: "slot", x: 711, y: 262, bitmap:"SteelSlotFuel"},
		"steamScale": {type: "scale", x: 530, y: 140, direction: 1, value: 0, bitmap: "SteamScale", scale: 3.2},
		"waterScale": {type: "scale", x: 590, y: 140, direction: 1, value: 0, bitmap: "WaterScale", scale: 3.2},
		"fuelScale": {type: "scale", x: 650, y: 140, direction: 1, value: 0, bitmap: "FuelScale", scale: 3.2},
		"burningScale": {type: "scale", x: 714, y: 200, direction: 1, value: 0, bitmap: "SteelBurnScale", scale: 3.2},
    }
});

SteamMachineRegistry.register(BlockID.HighPressureCoalBoiler, {
	defaultValues: {
		burn: 0,
		water: 0,
		fuel: 0
	},
	
	getGuiScreen: function(){
		return guiHighPressureCoalBoiler;
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
this.data.burn=960;
}
if((Fuel.id == ItemID.Lignite||Fuel.id == ItemID.LigniteDust||Fuel.id == ItemID.CrushedLigniteOre)&&this.data.burn==0){
Fuel.count--;
this.data.burn=720;
}
if(Math.random()<1/3&&this.data.burn==1){
FuelD.id=ItemID.TinyPileDarkAshesDust;
FuelD.count++;
}

		if (luidSlot.id == 325 && luidSlot.data == 8 && this.data.water <= 15000 && luidSlotNull.count < 16)
		{
if(this.data.fuel>=100&&this.data.water==0){
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
		{
if(this.data.fuel>=100&&this.data.water==0){
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
			this.data.steam+= 15;
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
		this.container.setScale("burningScale", this.data.burn / 960);
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




// file: MultiBlock/BronzeBlastFurnase/BronzeBlastFurnase.js

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




// file: Machines/Pipes.js

Translation.addTranslation("Small Bronze Fluid Pipe", {ru: "Малая бронзовая жидкостная труба",  zh: "小铜液管"});

IDRegistry.genBlockID("SmallBronzeFluidPipe");
Block.createBlock("SmallBronzeFluidPipe", [
	{name: "Small Bronze Fluid Pipe", texture: [["PIPE_BRONZE_SMALL", 0]], inCreative: true}
]);

setupBlockAsWire(BlockID.SmallBronzeFluidPipe);
setupWireRender(BlockID.SmallBronzeFluidPipe, 3/8, "gt-fuel");

Translation.addTranslation("Bronze Fluid Pipe", {ru: "Бронзовая жидкостная труба",  zh: "青铜液管"});

IDRegistry.genBlockID("BronzeFluidPipe");
Block.createBlock("BronzeFluidPipe", [
	{name: "Bronze Fluid Pipe", texture: [["PIPE_BRONZE_SMALL", 0]], inCreative: true}
]);

setupBlockAsWire(BlockID.BronzeFluidPipe);
setupWireRender(BlockID.BronzeFluidPipe, 4/8, "gt-fuel");

Translation.addTranslation("Large Bronze Fluid Pipe", {ru: "Большая бронзовая жидкостная труба",  zh: "青铜液管"});

IDRegistry.genBlockID("LargeBronzeFluidPipe");
Block.createBlock("LargeBronzeFluidPipe", [
	{name: "Large Bronze Fluid Pipe", texture: [["PIPE_BRONZE_SMALL", 0]], inCreative: true}
]);

setupBlockAsWire(BlockID.LargeBronzeFluidPipe);
setupWireRender(BlockID.LargeBronzeFluidPipe, 5/8, "gt-fuel");




