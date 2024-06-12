#include "web.h"
#include "audio.h"
#include "video.h"

extern WebServer esp32_server;
extern bool hasSD;
extern bool ONE_BIT_MODE;
extern int FirstWebis;

void FirstWebsend() {
  String jsonResponse = "{\"FirstWebis\": " + String(FirstWebis) + "}";
  esp32_server.send(200, "application/json", jsonResponse);  // 发送完整的JSON响应
}
void handleUserRequet() {
  String path = esp32_server.uri();
  Serial.println(path);
  if (path.indexOf('%') != -1)
    path = URLDecode(path);

  if (strncmp(path.c_str(), "/音乐/", 5) == 0) {
    handleAudioRequest(path);
  } else if (strncmp(path.c_str(), "/游戏/老游戏", 8) == 0) {
    handleSwfGameRequest(path);
  } else if (path.endsWith("/")) {
    path = "/系统/index.html";
  }

  if (SD_MMC.exists(path)) {
    File file = SD_MMC.open(path, "r");
    if (!file) {
      esp32_server.send(500, "text/plain", "Internal Server Error");
      return;
    }

    String contentType = getContentType(path);
    esp32_server.streamFile(file, contentType);  // 内置处理Range请求
    file.close();
  } else {
    handleFileNotFound();
  }
}

void handleSwfGameRequest(String path) {
  if (SD_MMC.exists(path)) {
    File file = SD_MMC.open(path, "r");
    if (!file) {
      esp32_server.send(500, "text/plain", "Internal Server Error");
      return;
    }
    esp32_server.sendHeader("Content-Type", "application/x-shockwave-flash");
    size_t sent = esp32_server.streamFile(file, "");
    file.close();
    if (sent == 0) {
      esp32_server.send(500, "text/plain", "Failed to stream SWF file.");
    }
  } else {
    handleFileNotFound();
  }
}

void handleFileNotFound() {
  SD_MMC.end();
  if (SD_MMC.begin("/sdcard", ONE_BIT_MODE)) {
    if (!hasSD) {
      esp32_server.send(404, "text/plain", "Card Mount Succeed");
      hasSD = true;
    } else {
      esp32_server.send(404, "text/plain", "404 Not Found");
    }
  } else {
    hasSD = false;
    esp32_server.send(404, "text/plain", "Card Mount Failed");
  }
}