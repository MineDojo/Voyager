# Fabric Mods Install
In this tutorial, we will install the Fabric launcher and 5 mods. Remember to use the correct Fabric version that matches your game version (1.19) of all the mods. 
1. You can download the latest Fabric Installer from [here](https://fabricmc.net/use/installer/). For Windows users, just download the `.exe` file. For Mac or Ubuntu users, download the jar file and call `java -jar fabric-installer-0.11.2.jar` to install. Select game version to be `1.19` and loader version to be `0.14.18`. It will automatically detect your Minecraft game install location.
2. After installing Fabric, you will have a `YOUR_MINECRAFT_GAME_LOCATION/mods` folder. You need to put all the mods under this folder. Also, you will have a `YOUR_MINECRAFT_GAME_LOCATION/versions/fabric-loader-0.14.18-1.19`. This is the version you will run the game with. 
3. Here are 4 mods that can be directly downloaded to `YOUR_MINECRAFT_GAME_LOCATION/mods` folder: 
   * [Fabric API](https://modrinth.com/mod/fabric-api/version/0.58.0+1.19): Basic Fabric APIs.
   * [Mod Menu](https://cdn.modrinth.com/data/mOgUt4GM/versions/4.0.4/modmenu-4.0.4.jar): Used to manage all the mods that you download.
   * [Complete Config](https://www.curseforge.com/minecraft/mc-mods/completeconfig/download/3821056): Dependency of server pause.
   * [Multi Server Pause](https://www.curseforge.com/minecraft/mc-mods/multiplayer-server-pause-fabric/download/3822586): Used to pause the server when waiting for GPT-4 to reply.
4. For the last mod [Better Respawn](https://github.com/xieleo5/better-respawn/tree/1.19), you need to manually clone and compile.
   
   * After you clone the repo, remove the `'forge'` string in the last line of `settings.gradle`. Then run `gradlew build` to compile the mod. You will find the compiled jar file in `better-respawn/fabric/build/libs/better-respawn-fabric-1.19-2.0.0.jar`. Put the jar file to the mod folder.
     * You will need a Java Runtime Environment v17+ to build `better-respawn`. Some newer JRE versions will error during build. Find the JRE v17 archive [here](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
   * After you launch the game, go to `YOUR_MINECRAFT_GAME_LOCATION/config/better-respawn`, and modify the properties file with:
      ```
      respawn_block_range=32
      max_respawn_distance=32
      min_respawn_distance=0
      ```
5. Don't forget to change the `version` in `azure_login` to `fabric-loader-0.14.18-1.19` that you are using. You can find it under `YOUR_MINECRAFT_GAME_LOCATION/version` folder.

You can return to [README.md](../README.md#getting-started) and getting started now.
