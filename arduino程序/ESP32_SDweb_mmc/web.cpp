#include "web.h"
#include "audio.h"
#include "video.h"

extern WebServer esp32_server;
extern bool hasSD;
extern bool ONE_BIT_MODE;
extern int FirstWebis;

// 处理用户浏览器的HTTP访问
void handleUserRequet() {
  String path = esp32_server.uri();  // 获取用户请求网址信息
  Serial.println(path);
  bool fileReadOK = false;
  String contentType = "";
  if (path.indexOf('%') != -1)
    path = URLDecode(path);
  if (strncmp(path.c_str(), "/音乐/", 7) == 0) {
    handleAudioRequest(path);
  } else if (strncmp(path.c_str(), "/游戏/老游戏", 16) == 0) {
    if (SD_MMC.exists(path)) {
      File file = SD_MMC.open(path, "r");
      if (!file) {
        esp32_server.send(500, "text/plain", "Internal Server Error");
        return;
      }
      // 明确设置SWF的Content-Type
      String contentType = "application/x-shockwave-flash";
      size_t sent = esp32_server.streamFile(file, contentType);
      file.close();
      if (sent == 0) {
        esp32_server.send(500, "text/plain", "Failed to stream SWF file.");
      }
    }
  } else if (path.endsWith("/")) {  // 如果访问地址以"/"为结尾
    if (FirstWebis == 1)
      path = "/系统/allFile.html";  // 则将访问地址修改为/index.html便于SPIFFS访问
    else if (FirstWebis == 2)
      path = "/系统/upload.html";
    else if (FirstWebis == 3)
      path = "/系统/audio.html";
    else if (FirstWebis == 4)
      path = "/系统/webgame.html";
    else if (FirstWebis == 5)
      path = "/系统/video.html";
    else if (FirstWebis == 6)
      path = "/系统/clipboard.html";
    else if (FirstWebis == 7)
      path = "/系统/set.html";
    else if (FirstWebis == 8)
      path = "/系统/wifi.html";
    contentType = "text/html";
    if (SD_MMC.exists(path)) {  // 如果访问的文件可以在SPIFFS中找到
      Serial.println(path);
      File file = SD_MMC.open(path, FILE_READ);    // 则尝试打开该文件
      esp32_server.streamFile(file, contentType);  // 并且将该文件返回给浏览器
      file.close();                                // 并且关闭文件
      fileReadOK = true;
    } else {
      fileReadOK = false;
    }
  } else {
    contentType = getContentType(path);
    Serial.println(path);

    if (SD_MMC.exists(path)) {  // 如果访问的文件可以在SPIFFS中找到
      Serial.println(path);
      File file = SD_MMC.open(path, FILE_READ);    // 则尝试打开该文件
      esp32_server.streamFile(file, contentType);  // 并且将该文件返回给浏览器
      file.close();                                // 并且关闭文件
      fileReadOK = true;
    } else {
      fileReadOK = false;
    }
  }

  if (!fileReadOK) {
    SD_MMC.end();
    if (SD_MMC.begin("/sdcard", ONE_BIT_MODE))  //SD卡初始化
    {
      if (!hasSD) {
        esp32_server.send(404, "text/plain", "Card Mount Succeed");  // 如果在SD卡初始化成功，则回复Card Mount Succeed
        hasSD = true;
      } else {
        esp32_server.send(404, "text/plain", "404 Not Found");  // 如果在SD卡无法找到用户访问的资源，则回复404 Not Found
      }

    } else {
      hasSD = false;
      esp32_server.send(404, "text/plain", "Card Mount Failed");  // 如果无法读取SD卡，则回复Card Mount Failed
    }
  }
}
