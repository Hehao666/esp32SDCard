#include "game.h"
#include "upload.h"
#include <SD_MMC.h>

extern WebServer esp32_server;

void listGame() {
    String folder = "/游戏/老游戏";

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
    String jsonResponse = "{\"games\": " + jsonGames + "}";
    Serial.println(jsonResponse);
    esp32_server.send(200, "application/json",jsonResponse); // 发送完整的JSON响应
}