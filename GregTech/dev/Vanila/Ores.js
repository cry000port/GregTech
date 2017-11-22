Callback.addCallback("DestroyBlockStart", function(coords){
var id = World.getBlockID(coords.x, coords.y, coords.z)
if(id == 56||id == 16||id == 14|| id == 15||id == 73||id == 129||id == 21){
Game.prevent();
}
});