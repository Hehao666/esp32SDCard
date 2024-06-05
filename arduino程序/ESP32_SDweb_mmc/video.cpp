#include "video.h"
#include "upload.h"
#include "audio.h"

extern WebServer esp32_server;

void getVideo() {
  String folder = "/视频";
  bool isFirstVideo = true;
  File root = SD_MMC.open((char*)folder.c_str());
  if (!root) {
    esp32_server.send(500, "text/html", "Failed to open directory <br />");
    return;
  }
  if (!root.isDirectory()) {
    esp32_server.send(500, "text/html", "Not a directory <br />");
    return;
  }
  String jsonVideos = "[";  // 开始构建JSON数组
  File file;
  while ((file = root.openNextFile())) {
    if (!file.isDirectory()) {
      if (!isFirstVideo) {
        jsonVideos += ",";  // 添加逗号分隔数组元素，除了第一个
      }
      isFirstVideo = false;

      String videoPath = String(file.path());
      size_t fileSize = file.size();                                                                     // 获取文件大小
      jsonVideos += "{\"videoPath\":\"" + videoPath + "\", \"filesize\":\"" + String(fileSize) + "\"}";  // 添加游戏路径和大小到数组
    }
    file.close();
  }
  jsonVideos += "]";  // 结束JSON数组
  String jsonResponse = "{\"videos\": " + jsonVideos + "}";
  Serial.println(jsonResponse);
  esp32_server.send(200, "application/json", jsonResponse);  // 发送完整的JSON响应
}
