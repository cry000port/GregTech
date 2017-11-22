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
