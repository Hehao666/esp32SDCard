#include "copy.h"
#include <string>
#include "upload.h"

extern WebServer esp32_server;

String urlDecode(const String &encodedStr) {
  String decodedStr = encodedStr;
  decodedStr.replace("%2B", "+");
  decodedStr.replace("%23", "#");
  decodedStr.replace("%25", "%");
  decodedStr.replace("%26", "&");
  decodedStr.replace("\r\n", "\n");  // 通常我们保持\n为换行符，但这里也可以替换为"\r\n"
  decodedStr.replace("\n", "\n");    // 如果需要，也可以替换为"%0D%0A"，但通常我们不这样做
  //decodedStr.replace(" ", "\\s");   // 如果需要，也可以替换为"%0D%0A"，但通常我们不这样做
  // 注意：'\s' 在这里不处理，因为我们需要明确要替换的空白字符
  return decodedStr;
}

//覆盖写入txt文件
void editTxt() {
  String txtPath = esp32_server.arg("txtpath");  //提取文件路径
  Serial.println(txtPath);
  String Contentmodify = esp32_server.arg("con");  //提取要保存的内容
  String txtContent = urlDecode(Contentmodify);
  Serial.println(txtContent);
  char flag = 0;
  flag = writeFile(SD_MMC, (char *)txtPath.c_str(), (char *)txtContent.c_str());
  if (flag) {
    respondOK();
  } else {
    esp32_server.send(500);
  }
}

void modifyfile(const char *path) {
  File file = SD_MMC.open(path, FILE_READ);
  if (!file) {
    esp32_server.send(404, "text/plain", "File Not Found");
    return;
  }

  String contentType = "application/octet-stream";  // 确保这个函数定义了并且能根据文件类型返回正确的MIME类型
  esp32_server.setContentLength(file.size());
  esp32_server.send(200, contentType, "");

  char buffer[2048];
  size_t bytesRead;
  while ((bytesRead = file.readBytes(buffer, 2048)) > 0) {
    esp32_server.sendContent(buffer, bytesRead);  // 分批次发送内容
  }

  file.close();
}