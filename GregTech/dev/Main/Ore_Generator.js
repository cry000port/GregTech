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




