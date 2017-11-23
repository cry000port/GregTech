var explode = ModAPI.requireGlobal("Level.explode"); 
var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");

importLib("ToolType", "*");
importLib("energylib", "*");

var Saws =
[[ItemID.sawIron, 64],
[ItemID.sawBronze, 48],
[ItemID.sawLead, 16],
[ItemID.sawGold, 32],
[ItemID.sawSteel, 128],
[ItemID.sawSilver, 16]]

var Mortars = 
[[ItemID.mortarIron, 64],
[ItemID.mortarBronze, 48],
[ItemID.mortarDiamond, 320],
[ItemID.mortarSteel, 128],
[ItemID.mortarSilver, 16],
[ItemID.mortarFlint, 16],
[ItemID.mortarLead, 16],
[ItemID.mortarGold, 32]];

var Hammers = 
[[ItemID.hammerIron, 64], [ItemID.hammerBronze, 48], [ItemID.hammerDiamond, 320], [ItemID.hammerEmerald, 64], [ItemID.hammerQuartz, 16], [ItemID.hammerStar, 1280], [ItemID.hammerSteel, 128], [ItemID.hammerSilver, 16],
[ItemID.hammerGold, 32],
[ItemID.hammerLead, 16]];

var Wrenchs = 
[[ItemID.wrenchIron, 64], [ItemID.wrenchGold, 32], [ItemID.wrenchBronze, 48], [ItemID.wrenchLead, 16], [ItemID.wrenchSteel, 128], [ItemID.wrenchSilver, 16]];

var Files =
[[ItemID.fileBronze, 48], [ItemID.fileSteel, 128], [ItemID.fileIron, 64], [ItemID.fileGold, 32], [ItemID.fileSilver, 16]];

var Knifes =
[[ItemID.knifeLead, 16], [ItemID.knifeSilver, 16], [ItemID.knifeBronze, 48], [ItemID.knifeGold, 32],
[ItemID.knifeIron, 64],
[ItemID.knifeSteel, 128]];


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
    IDRegistry.genItemID("ingot" + name);
    Item.createItem("ingot" + name, name + " Ingot", {name: name + "_ingot"});
	}
	//nugget
	if(data.nugget == 1){
	IDRegistry.genItemID("nugget" + name);
    Item.createItem("nugget" + name, name + " Nugget", {name: name + "_nugget"});
	}
	//long rod
	if(data.longrod == 1){
	IDRegistry.genItemID("longrod" + name);
    Item.createItem("longrod" + name, "Long " + name + " Rod", {name: name + "_longrod"});
	}
	//plate
	if(data.plate == 1){
	IDRegistry.genItemID("plate" + name);
    Item.createItem("plate" + name, name+" Plate", {name: name + "_plate"});
	}
	//dust
	if(data.dust == 1){
	IDRegistry.genItemID("dust" + name);
    Item.createItem("dust" + name, name + " Dust", {name: name +"_dust"});
	}
	//small dust
	if(data.smalldust == 1){
	IDRegistry.genItemID("smalldust" + name);
    Item.createItem("smalldust" + name, "Small Pile of " + name + " Dust", {name: name + "_smalldust"});
	}
	//tiny dust
	if(data.tinydust == 1){
	IDRegistry.genItemID("tinydust" + name);
    Item.createItem("tinydust" + name, "Tiny Pile of " + name + " Dust", {name: name + "_tinydust"});
	}
	//rod
	if(data.rod == 1){
	IDRegistry.genItemID("rod" + name);
    Item.createItem("rod" + name, name + " Rod", {name: name + "_rod"});
	}
	//bolt
	if(data.bolt == 1){
	IDRegistry.genItemID("bolt" + name);
    Item.createItem("bolt" + name, name + " Bolt", {name: name + "_bolt"});  
	}
	//smallGear
	if(data.smallGear == 1){
	IDRegistry.genItemID("smallgear" + name);
    Item.createItem("smallgear" + name, "Small" + name + " Gear", {name: name + "_smallgear"});  
	}
    //Gear
	if(data.Gear == 1){
	IDRegistry.genItemID("gear" + name);
    Item.createItem("gear" + name, name + " Gear", {name: name + "_gear"});  
	}
    //foil
	if(data.foil == 1){
	IDRegistry.genItemID("foil" + name);
    Item.createItem("foil" + name, name + " Foil", {name: name + "_foil"});  
	}
    //screw
	if(data.screw == 1){
	IDRegistry.genItemID("screw" + name);
    Item.createItem("screw" + name, name + " Screw", {name: name + "_screw"});  
	}
    //ring
	if(data.ring == 1){
	IDRegistry.genItemID("ring" + name);
    Item.createItem("ring" + name, name + " Ring", {name: name + "_ring"});  
	}
	//crushedOre
	if(data.crushedOre == 1){
	IDRegistry.genItemID("crushedore" + name);
    Item.createItem("crushedore" + name, "Crushed " + name + " Ore", {name: name + "_crushed"});  
	}
    //purifiedOre
	if(data.purifiedOre == 1){
	IDRegistry.genItemID("purifiedore" + name);
    Item.createItem("purifiedore" + name, "Purified " + name + " Ore", {name: name + "_purified"});  
	}
    //impureDust
	if(data.impureDust == 1){
	IDRegistry.genItemID("impuredust" + name);
    Item.createItem("impuredust" + name, "Impure " + name + " Dust", {name: name + "_impure"});  
	}
	//sawBlade
	if(data.sawBlade == 1){
	IDRegistry.genItemID("sawblade" + name);
    Item.createItem("sawblade" + name, name + " Saw Blade", {name: name + "_sawblade"});  
	}
}

function addGems(name)
{
	//perfect
    IDRegistry.genItemID("perfect" + name);
    Item.createItem("perfect" + name, "Perfect " + name, {name: "Perfect_" + name});
    //flawless
    IDRegistry.genItemID("flawless" + name);
    Item.createItem("flawless" + name, "Flawless " + name, {name: "Flawless_" + name});
	//defective
    IDRegistry.genItemID("defective" + name);
    Item.createItem("defective" + name, "Defective " + name, {name: "Defective_" + name});
	//split
    IDRegistry.genItemID("split" + name);
    Item.createItem("split" + name, "Split " + name, {name: "Split_" + name});
}

function addTool(name, damage, data){
	if(data.hammer == 1){
		IDRegistry.genItemID("hammer" + name);
        Item.createItem("hammer" + name, name + " Hammer", {name: name + "_hammer"}, {stack: 1});
        Item.setMaxDamage("hammer" + name, damage);
	}
	if(data.wrench == 1){
		IDRegistry.genItemID("wrench" + name);
        Item.createItem("wrench" + name, name + " Wrench", {name: name + "_wrench"}, {stack: 1});
        Item.setMaxDamage("wrench" + name, damage);
	}
	if(data.file == 1){
		IDRegistry.genItemID("file" + name);
        Item.createItem("file" + name, name + " File", {name: name + "_file"}, {stack: 1});
        Item.setMaxDamage("file" + name, damage);
	}
	if(data.knife == 1){
		IDRegistry.genItemID("knife" + name);
        Item.createItem("knife" + name, name + " Knife", {name: name + "_knife"}, {stack: 1});
        Item.setMaxDamage("knife" + name, damage);
	}
	if(data.saw == 1){
		IDRegistry.genItemID("saw" + name);
        Item.createItem("saw" + name, name + " Saw", {name: name + "_saw"}, {stack: 1});
        Item.setMaxDamage("saw" + name, damage);
	}
	if(data.mortar == 1){
		IDRegistry.genItemID("mortar" + name);
	    Item.createItem("mortar" + name, name + " Mortar", {name: name + "_mortar"},{stack: 1});
	    Item.setMaxDamage("mortar" + name, damage);
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
