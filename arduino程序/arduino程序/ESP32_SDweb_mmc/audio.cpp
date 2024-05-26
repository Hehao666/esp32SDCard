#include "audio.h"
#include "upload.h"

extern WebServer esp32_server;
extern String foldPath;
extern long long totalstorage;
extern long long storage;

String listaudioDir(fs::FS &fs, const char * dirname)
{
  String foldPath = "/audio";
  String json = "{\"musicList\": ["; // 开始构建包含musicList数组的JSON对象
  bool firstEntry = true; // 控制音乐列表中逗号的添加

  File root = fs.open(dirname);
  if (!root) {
    Serial.println("Failed to open directory");
    return "";
  }

  File file = root.openNextFile();
  while(file){
      if(file.isDirectory()){
      } else {
        if (!firstEntry) {  
            json += ","; // 在音乐列表的每个元素之间添加逗号分隔符
        }  
        firstEntry = false;  

        String filepath = file.path();
        String filename = file.name();

        json += "{\"filepath\": \"" + filepath + "\",\"filename\": \"" + filename + "\"}";
      }
      file = root.openNextFile();
  }
  root.close();

  Storage(); // 假设这个函数设置了totalstorage和storage变量
  String storageInfo = "]"; // 结束musicList数组
  storageInfo += ",\"storageInfo\": {\"totalstorage\": \"" + String(totalstorage) + "\",\"storage\": \"" + String(storage) + "\"}}"; // 添加storageInfo对象到根对象中
  
  json += storageInfo; // 将音乐列表和存储信息合并到一起

  return json;
}

void listaudio(){
  String json = listaudioDir(SD_MMC,"/audio");
  esp32_server.send(200, "application/json", json);
  Serial.println(json);
}

void handleAudioRequest(String path1) {
    String path = URLDecode(path1);
    Serial.println(path);
    String contentType = getContentType(path);
    if (SD_MMC.exists(path)) {
        File file = SD_MMC.open(path, "r");
        if (!file) {
            esp32_server.send(500, "text/plain", "Internal Server Error");
            return;
        }

        size_t sent = esp32_server.streamFile(file, contentType);
        file.close();
        if (sent == 0) {
            esp32_server.send(500, "text/plain", "File Not Sent");
        }
    } else {
        esp32_server.send(404, "text/plain", "File Not Found");
    }
}

String getContentType(String filename) {
    if (filename.endsWith(".mp3")) return "audio/mpeg";
    else if (filename.endsWith(".wav")) return "audio/wav";
    else if (filename.endsWith(".aac")) return "audio/aac";
    else if (filename.endsWith(".ogg")) return "audio/ogg";
    else if (filename.endsWith(".opus")) return "audio/opus";
    else if (filename.endsWith(".mid") || filename.endsWith(".midi")) return "audio/midi";
    else return "text/plain";
}
// URL解码函数
String URLDecode(String url) {
    String decoded = "";
    char c;
    char code0;
    char code1;
    for (uint i = 0; i < url.length(); i++) {
        c = url.charAt(i);
        if (c == '+') {
            decoded += ' ';
        } else if (c == '%') {
            code0 = url.charAt(i + 1);
            code1 = url.charAt(i + 2);
            c = (hexToDec(code0) << 4 | hexToDec(code1));
            decoded += c;
            i += 2; // 跳过已解码的两个字符
        } else {
            decoded += c;
        }
    }
    return decoded;
}

// 辅助函数：将十六进制字符转换为十进制数字
char hexToDec(char hex) {
    return (hex >= 'A' ? (hex & 0xDF) - 'A' + 10 : (hex - '0'));
}
