#include "audio.h"
#include "upload.h"

extern WebServer esp32_server;

String listaudioDir(fs::FS &fs, const char * dirname)
{
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

  String storageInfo = "]}"; // 结束musicList数组
  
  json += storageInfo; // 将音乐列表和存储信息合并到一起

  return json;
}

void listaudio(){
  String json = listaudioDir(SD_MMC,"/音乐");
  esp32_server.send(200, "application/json", json);
  Serial.println(json);
}

String getContentType(String filename) {
    if (filename.endsWith(".html") || filename.endsWith(".htm")) return "text/html; charset=UTF-8";
    else if (filename.endsWith(".css")) return "text/css";
    else if (filename.endsWith(".js")) return "application/javascript";
    else if (filename.endsWith(".json")) return "application/json";
    else if (filename.endsWith(".xml")) return "application/xml";
    else if (filename.endsWith(".txt")) return "text/plain";
    
    else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
    else if (filename.endsWith(".png")) return "image/png";
    else if (filename.endsWith(".gif")) return "image/gif";
    else if (filename.endsWith(".bmp")) return "image/bmp";
    else if (filename.endsWith(".ico")) return "image/vnd.microsoft.icon";
    else if (filename.endsWith(".svg")) return "image/svg+xml";
    else if (filename.endsWith(".tiff") || filename.endsWith(".tif")) return "image/tiff";
    
    else if (filename.endsWith(".mp3")) return "audio/mpeg";
    else if (filename.endsWith(".wav")) return "audio/wav";
    else if (filename.endsWith(".aac")) return "audio/aac";
    else if (filename.endsWith(".ogg")) return "audio/ogg";
    else if (filename.endsWith(".opus")) return "audio/opus";
    else if (filename.endsWith(".mid") || filename.endsWith(".midi")) return "audio/midi";
    else if (filename.endsWith(".flac")) return "audio/flac";
    
    else if (filename.endsWith(".mp4")) return "video/mp4";
    else if (filename.endsWith(".webm")) return "video/webm";
    else if (filename.endsWith(".mov")) return "video/quicktime";
    else if (filename.endsWith(".avi")) return "video/x-msvideo";
    else if (filename.endsWith(".mpeg") || filename.endsWith(".mpg")) return "video/mpeg";
    else if (filename.endsWith(".m3u8")) return "application/vnd.apple.mpegurl";
    
    else if (filename.endsWith(".pdf")) return "application/pdf";
    else if (filename.endsWith(".doc") || filename.endsWith(".docx")) return "application/msword";
    else if (filename.endsWith(".xls") || filename.endsWith(".xlsx")) return "application/vnd.ms-excel";
    else if (filename.endsWith(".ppt") || filename.endsWith(".pptx")) return "application/vnd.ms-powerpoint";
    
    else if (filename.endsWith(".zip")) return "application/zip";
    else if (filename.endsWith(".rar")) return "application/x-rar-compressed";
    else if (filename.endsWith(".tar.gz") || filename.endsWith(".tgz")) return "application/gzip";
    
    else if (filename.endsWith(".swf")) return "application/x-shockwave-flash";

    return "application/octet-stream";
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
