#include <WiFi.h>
#include <WebServer.h> 
#include "common.h"
#include "game.h"
#include "upload.h"
#include "video.h"
#include "web.h"
#include "copy.h"
#include "wifiConnect.h"

void changemode();
void readFile4(fs::FS &fs, const char * path);
void readFile3(fs::FS &fs, const char * path);
void readConfig(fs::FS &fs);
void configFile();
void nameText();
void writeConfigKeyValue(fs::FS &fs, const String &key, const String &value);
void server_ap();
void server_wifista();
void esp32ServerOn();
