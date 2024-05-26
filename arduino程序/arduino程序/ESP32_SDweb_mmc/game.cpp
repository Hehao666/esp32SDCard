#include "game.h"
#include "upload.h"

extern WebServer esp32_server;
extern long long totalstorage;
extern long long storage;


void listGame() {
    String folder = "/webgame/oldGame";
    char totalstorageStr[32] = {0};
    char storageStr[32] = {0};
    Storage();
    sprintf(totalstorageStr, "%lld", totalstorage);
    sprintf(storageStr, "%lld", storage);

    File root = SD_MMC.open((char*)folder.c_str());
    if (!root) {
        esp32_server.send(500, "text/html", "Failed to open directory <br />");
        return;
    } else if (!root.isDirectory()) {
        esp32_server.send(500, "text/html", "Not a directory <br />");
        return;
    }

    String jsonGames = "["; // 开始构建JSON数组
    bool isFirstGame = true;
    File file;
    while ((file = root.openNextFile())) {
        if (!file.isDirectory()) {
            if (!isFirstGame) {
                jsonGames += ","; // 添加逗号分隔数组元素，除了第一个
            }
            isFirstGame = false;

            String gamePath = String(file.path());
            size_t fileSize = file.size(); // 获取文件大小
            jsonGames += "{\"gamepath\":\"" + gamePath + "\", \"filesize\":\"" + String(fileSize) + "\"}"; // 添加游戏路径和大小到数组
        }
        file.close();
    }
    jsonGames += "]"; // 结束JSON数组

    // 构建最终的JSON响应，包括总存储和存储信息
    String jsonResponse = "{\"totalstorage\":\"" + String(totalstorageStr) + "\","
                        + "\"storage\":\"" + String(storageStr) + "\","
                        + "\"games\": " + jsonGames + "}"; // 注意：jsonGames已经包含了一个开始的'['和结束的']，无需再在外部添加
    Serial.println(jsonResponse);
    esp32_server.send(200, "application/json",jsonResponse); // 发送完整的JSON响应
}