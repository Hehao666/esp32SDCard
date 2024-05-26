#include "copy.h"
#include <string> 
#include "upload.h"

extern WebServer esp32_server;
extern long long totalstorage;
extern long long storage;

String urlDecode(const String &encodedStr) {  
    String decodedStr = encodedStr;
    decodedStr.replace("%2B", "+");   
    decodedStr.replace("%23", "#");  
    decodedStr.replace("%25", "%");  
    decodedStr.replace("%26", "&");  
    decodedStr.replace("\r\n", "\n"); // 通常我们保持\n为换行符，但这里也可以替换为"\r\n"  
    decodedStr.replace("\n", "\n");   // 如果需要，也可以替换为"%0D%0A"，但通常我们不这样做
    //decodedStr.replace(" ", "\\s");   // 如果需要，也可以替换为"%0D%0A"，但通常我们不这样做  
    // 注意：'\s' 在这里不处理，因为我们需要明确要替换的空白字符  
    return decodedStr;  
}  

//覆盖写入txt文件
void editTxt(){
  String txtPath = esp32_server.arg("txtpath");   //提取文件路径
  Serial.println(txtPath);
  String Contentmodify = esp32_server.arg("con");    //提取要保存的内容
  //Serial.println(Contentmodify);
  String txtContent = urlDecode(Contentmodify);
  Serial.println(txtContent); 
  char flag=0;
  flag=writeFile(SD_MMC, (char*)txtPath.c_str(), (char*)txtContent.c_str());
  if(flag){
    esp32_server.send(200,"text/html","保存成功");
  } else {
    esp32_server.send(200,"text/html","保存失败");
  }  
}
void getClipboard() {
    // 假设Storage()函数会正确设置totalstorage和storage的值
    Storage();

    // 手动将数值转换为字符串
    char totalstorageStr[32]; // 根据可能的最大数值长度调整
    char storageStr[32];
    sprintf(totalstorageStr, "%lld", totalstorage);
    sprintf(storageStr, "%lld", storage);

    // 读取文件内容
    File file = SD_MMC.open("/copy.txt", FILE_READ);
    if (!file) {
        Serial.println("Failed to open file for reading");
        return;
    }
    String content = file.readString();
    file.close();
    content.replace("%", "%25");      // 替换百分号
    content.replace("+", "%2B");      // 替换加号
    content.replace("#", "%23");      // 替换井号
    content.replace("&", "%26");      // 替换和号
    content.replace("\r\n", "%0D%0A"); // 替换Windows风格的换行符
    content.replace("\n", "%0D%0A");   // 替换Unix/Linux风格的换行符，注意此处应先替换\r\n再替换\n以保持一致性
    // 构建JSON格式的字符串响应
    String jsonResponse = "{\"totalstorage\":\"" + String(totalstorage) + "\","
                         + "\"storage\":\"" + String(storage) + "\","
                         + "\"clipboardContent\":\"" + content + "\"}";

    // 发送HTTP响应
    Serial.println(jsonResponse);
    esp32_server.send(200, "application/json", jsonResponse);
}

void modifyfile(const char *path) {
    File file = SD_MMC.open(path, FILE_READ);
    if (!file) {
        esp32_server.send(404, "text/plain", "File Not Found");
        return;
    }

    String contentType = "application/octet-stream"; // 确保这个函数定义了并且能根据文件类型返回正确的MIME类型
    esp32_server.setContentLength(file.size());
    esp32_server.send(200, contentType, "");

    char buffer[2048];
    size_t bytesRead;
    while ((bytesRead = file.readBytes(buffer, 2048)) > 0) {
        esp32_server.sendContent(buffer, bytesRead); // 分批次发送内容
    }

    file.close();
}