# Minecraft Instance Install
To start using Voyager, you should first make sure to have an official [Minecraft](https://www.minecraft.net/) game (version 1.19) installed. 

There are two ways to start a Minecraft instance for Voyager. Sometimes GPT-4 will write an infinite loop that runs forever. In this case, there'll be a request timeout. Using Azure login can automatically resume the running if there's a request timeout.

## Option 1: Microsoft Azure Login (Recommended)
Using this method will allow Voyager to automatically resume when there's a request timeout. This is dependent on the [minecraft-launcher-lib](https://minecraft-launcher-lib.readthedocs.io/en/stable/tutorial/microsoft_login.html#let-the-user-log-in) library.

1. Sign in to [Azure Portal](https://portal.azure.com/).
2. Go to [Azure Active Directory](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview).
3. Click on the `App Registrations` tab on the left panel.
4. Click on the `New registration` button.
5. Fill the form with the following values:
    - Name: `YOUR_APP_NAME`
    - Supported account types: `Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts`
    - Redirect URI Type: `Public client/native (mobile & desktop)`, Value: `https://127.0.0.1/auth-response` (If you get `KeyError: 'access_token'` in the end, you can try to change the type to `Web`, see [FAQ](https://github.com/MineDojo/Voyager/blob/main/FAQ.md) for more information)
6. Click on the `Register` button.
7. The `Application (client) ID` will be your `client_id`.
8. [Optional] Go to the `Certificates & Secrets` tab and click on the `New client secret` button. Fill the description by yourself. After you click `Add`, you will see your value, this will be your `secret_value`.
9. Go to your Minecraft install location `YOUR_MINECRAFT_GAME_LOCATION/versions`, and check all the versions you have. All the folder names are your valid `version` value. 

After these steps, you will finally get your azure_login information:
```python
azure_login = {
    "client_id": "CLIENT_ID FROM STEP 7",
    "redirect_url": "https://127.0.0.1/auth-response",
    "secret_value": "[OPTIONAL] SECRET_KEY FROM STEP 8",
    "version": "MINECRAFT VERSION YOU WANT TO USE",
}
```
**Voyager use `fabric-loader-0.14.18-1.19` version to run all the experiments.** You may not have this version currently, you can move on to the [Fabric Mods Install](fabric_mods_install.md#fabric-mods-install) section and follow the instructions there to install the fabric version of the game.

## Option 2: Minecraft Official Launcher

After you install official Minecraft, you should have a Minecraft official launcher, open it, and follow the instructions here:
1. Select the version you want to play and start the game.
2. Select `Singleplayer` and create a new world.
3. Set Game Mode to `Creative` and Difficulty to `Peaceful`.
4. After the world is created, press `Esc` and select `Open to LAN`.
5. Select `Allow cheats: ON` and press `Start LAN World`.
6. You will see a port number in the chat log, that is your `mc-port`, use this number to instantiate Voyager later.

## Option 3: Run a dedicated Minecraft server
Install the Fabric minecraft server following the instructions at https://fabricmc.net/use/server/, or use the below:
```
curl -OJ https://meta.fabricmc.net/v2/versions/loader/1.19/0.14.18/0.11.2/server/jar
java -Xmx2G -jar fabric-server-mc.1.19-loader.0.14.18-launcher.0.11.2.jar nogui
```

This will start the server, creating the necessary folder structure. You should now kill the server by typing `stop`

You should now copy the mods into the mods directory as per https://github.com/MineDojo/Voyager/blob/main/installation/fabric_mods_install.md

Edit the `server.properties` file, changing the following values
```
difficulty=peaceful
gamemode=survival
online-mode=false
enable-rcon=true # Only needed if you wish to use RCON features
rcon.password=hunter2
rcon.port=25575
spawn-protection=0 # This is important, otherwise the bot can't do anything near the spawn
```

You can now start the server again. Now you can start Voyager, and have it connect with `mc_port=25565`. Once `bot` has joined the minecraft server, run `op bot` in the minecraft server console.
