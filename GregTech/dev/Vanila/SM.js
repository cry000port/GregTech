var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");

var ctx = com.mojang.minecraftpe.MainActivity
    .currentMainActivity.get();
var mediaPlayer = new android.media.MediaPlayer();

var bytes = ModPE.getBytesFromTexturePack(filename);
//создаем временный файл
tempMp3 = java.io.File.createTempFile("temp", "mp3", 
    ctx.getCacheDir());
//чтобы файл удалялся при закрытии Майнкрафта
tempMp3.deleteOnExit();
//открываем выходной поток
var fos = new java.io.FileOutputStream(tempMp3);
//записываем наш файл
fos.write(bytes);
//обязательно закрываем, иначе не откроется дальше)
fos.close();