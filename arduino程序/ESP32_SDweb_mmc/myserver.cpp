#include "myserver.h"
#include <WiFi.h>
#include <Update.h>
#include "version.h"
#include <ESPmDNS.h>
#include "audio.h"
#include "copy.h"

extern WebServer esp32_server;    //网页服务
extern bool mode_switch;

extern char *wifissid;
extern String IPAD;
extern String ssid;
extern String password;
extern char channel;

extern String foldPath;
extern int wifiNum;
extern char* txt[1];
extern char wifiSsid[10][64];
extern char wifiPassword[10][64];
const char* fileName = "/config/config.txt";
int wifiConnectTime=750;
extern int CPUfrequency;
extern int FirstWebis;
extern const char* host;
char hostBuffer[20]={};

//主页
void FirstWeb(){
  String select =esp32_server.arg("FirstWebis");
  Serial.println(select);   
  writeConfigKeyValue(SD_MMC, "FirstWebis", select);
  readConfig(SD_MMC);
  esp32_server.send(200);
}
//模式转换
void changemode(){
  mode_switch=0;    //使下面的函数跳出while循环，从而在loop函数中进入下一个模式
}

void configFile(){
  String newValue = esp32_server.arg("wifiConnectTime");
  Serial.println(newValue);   
  writeConfigKeyValue(SD_MMC, "wifiConnectTime", newValue);
  readConfig(SD_MMC);
  esp32_server.send(200);
}

void nameText(){
  String newValue = esp32_server.arg("nameText");
  Serial.println(newValue);   
  writeConfigKeyValue(SD_MMC, "hostName", newValue);
  readConfig(SD_MMC);
  esp32_server.send(200);
}

//读取SD卡中保存的热点名称和密码
void readFile3(fs::FS &fs, const char * path){
  char i=0,j=0;
  char flag_hotspot=1;
  char flag_OK=0;
  char hotspotName[64];
  char hotspotPassword[64];
  char hotspotChannel[5];

  File file = fs.open(path);
  if(!file){
      Serial.println("Failed to open file for reading");
      return;
  }
  while(file.available()){
    if(flag_hotspot == 1)
    {
      if(j<63){
        hotspotName[j] = file.read(); //读取热点名称
        if(hotspotName[j]=='\r'){
          i++;
          hotspotName[j]='\0';
        }
        else if(hotspotName[j]=='\n'){  //以回车键作为划分名称和密码的标志
          hotspotName[j]='\0';
          flag_hotspot=2;
          j=0;
        }
        else{
          i++;
          j++;
        }
      }
      else{
        break;  //如果超过63个字符，则名称过长，退出循环
      }
    }
    else if(flag_hotspot == 2){
      if(j<63){
        hotspotPassword[j] = file.read();  //读取热点密码
        if(hotspotPassword[j]=='\r'){
          i++;
          hotspotPassword[j]='\0';
        }
        else if(hotspotPassword[j]=='\n'){  //以回车键作为划分密码和信道的标志
          hotspotPassword[j]='\0';
          flag_hotspot=3;
          j=0;
          flag_OK=1;    //获取到合适的热点名称
        }
        else{
          i++;
          j++;
        }
      }
      else{
        break;  //如果超过63个字符，则密码过长，退出循环
      }
    }
    
    else{
      if(j<3){
        hotspotChannel[j] = file.read();  //读取热点信道
        if(hotspotChannel[j]=='\r'){
          break;
        }
        else{
          i++;
          j++;
        }
      }
      else{
        break;  //如果超过2个字符，则信道错误，退出循环
      }
    }
  }
  hotspotChannel[j]='\0';
  file.close();
  if(flag_OK){
    ssid=hotspotName;
    password=hotspotPassword;
    channel=String2Char((char*)hotspotChannel);
    if(channel>13 || channel<1){
      channel = 1;
    }
  }
  else{
    return;
  }
}

void readFile4(fs::FS &fs, const char * path){  
    File file = fs.open(path);  
    if (!file) {  
        Serial.println("Failed to open file for reading");  
        return;  
    }  
    char buffer[64]; // 临时缓冲区，用于读取一行  
    int num = 0;  
    while (file.available() && num < wifiNum * 2) {  
        size_t len = file.readBytesUntil('\n', buffer, sizeof(buffer) - 1);  
  
        // 如果读取到的长度为0，但文件还有内容，可能是遇到了\r\n的情况  
        if (len == 0 && file.available()) {  
            int peeked = file.peek();  
            if (peeked == '\r') {  
                // 读取并丢弃\r  
                file.read();  
                // 接着读取直到\n或缓冲区满  
                len = file.readBytesUntil('\n', buffer, sizeof(buffer) - 1);  
                // 如果这里len仍然为0，说明文件在此处结束，没有额外的\n  
            }  
        }  
        // 确保读取到的内容以null结尾  
        if (len > 0) {  
            buffer[len] = '\0';  
            // 去除字符串末尾可能存在的\r（如果有的话）  
            char *end = buffer + len - 1;  
            while (end >= buffer && *end == '\r') {  
                *end = '\0'; // 将\r替换为字符串结束符  
                end--;  
            }  
            // 假设文件中的行是交替的，首先是WiFi名称，然后是密码  
            if (num % 2 == 0) { // 偶数索引是名称  
                strncpy(wifiSsid[num / 2], buffer, sizeof(wifiSsid[num / 2]) - 1); // 确保不越界  
                wifiSsid[num / 2][sizeof(wifiSsid[num / 2]) - 1] = '\0'; // 确保字符串以null结尾   
            } else { // 奇数索引是密码  
                strncpy(wifiPassword[num / 2], buffer, sizeof(wifiPassword[num / 2]) - 1); // 确保不越界  
                wifiPassword[num / 2][sizeof(wifiPassword[num / 2]) - 1] = '\0'; // 确保字符串以null结尾  
            }  
            num++;  
        }  
        // 如果文件当前字符是换行符，读取并丢弃它  
        if (file.peek() == '\n') {  
            file.read();  
        }  
    }  
    file.close(); // 在循环结束后关闭文件  
}

void writeConfigKeyValue(fs::FS &fs, const String &key, const String &value) {  
    // 尝试以读模式打开文件  
    File file = fs.open(fileName, FILE_READ);  
    if (!file) {  
        // 如果文件不存在，则创建一个新文件并写入键值对  
        file = fs.open(fileName, FILE_WRITE);  
        if (file) {  
            file.print(key);  
            file.print("=");  
            file.println(value);  
            file.close();  
            Serial.println("New config file created and written successfully");  
            return;  
        } else {  
            Serial.println("Failed to create new config file");  
            return;  
        }  
    }  
  
    // 读取文件内容到字符串缓冲区中  
    String fileContent;  
    while (file.available()) {  
        fileContent += file.readStringUntil('\n');  
        if (file.available()) {  
            fileContent += '\n'; // 保留换行符  
        }  
    }  
    file.close();  
  
    // 准备新的文件内容  
    String newContent;  
    bool keyFound = false; // 标记是否找到了键  
  
    // 逐行处理文件内容  
    size_t prevPos = 0;  
    size_t pos = fileContent.indexOf(key + "=");  
    while (pos != -1) { // 使用 -1 而不是 String::npos  
        // 写入从上次匹配位置到当前匹配位置之前的所有内容（如果有）  
        if (prevPos < pos) {  
            newContent += fileContent.substring(prevPos, pos);  
            newContent += '\n'; // 如果需要，保留换行符  
        }  
  
        // 如果找到了键，则替换其值  
        if (!keyFound) {  
            newContent += key;  
            newContent += "=";  
            newContent += value;  
            newContent += '\n'; // 添加换行符  
            keyFound = true; // 标记键已找到  
        }  
  
        // 更新搜索位置以跳过已处理的键值对  
      prevPos = fileContent.indexOf('\n', pos); // 查找下一个换行符的位置  
      if (prevPos == -1) { // 使用-1来检查是否未找到换行符  
      prevPos = fileContent.length(); // 直接使用length()来获取字符串长度  
      } else {  
        prevPos++; // 跳过换行符本身  
      } 
  
        // 继续搜索下一个匹配项  
        pos = fileContent.indexOf(key + "=", prevPos);  
    }  
  
    // 写入剩余的文件内容（如果有）  
    if (prevPos < fileContent.length()) {  
        newContent += fileContent.substring(prevPos);  
    }  
  
    // 写入新的文件内容  
    file = fs.open(fileName, FILE_WRITE);  
    if (file) {  
        file.print(newContent);  
        file.close();  
        Serial.println("Config file updated successfully");  
    } else {  
        Serial.println("Failed to update config file");  
    }  
}

void readConfig(fs::FS &fs){
  File file = fs.open(fileName);  
  if (!file) {  
    Serial.println("Failed to open file");  
    return;  
  }  
  // 读取文件内容  
  while (file.available()) {  
    String line = file.readStringUntil('\n'); // 读取一行直到换行符  
    line.trim(); // 去除行首尾的空白字符
    //Serial.println(line);  
    // 解析数据（这里假设每行都是一个键值对，用等号分隔）  
    int index = line.indexOf('=');  
    if (index != -1) {  
      String key = line.substring(0, index);  
      String value = line.substring(index + 1); 
      // 根据键做不同的处理  
      if (key == "wifiConnectTime"){   
        wifiConnectTime = value.toInt();
        Serial.println(wifiConnectTime);
        }
      else if (key == "autoWifinum"){   
        wifiNum = value.toInt();
        Serial.println(wifiNum);
        }
      else if (key == "CPUFfrequency"){
        CPUfrequency = value.toInt();
        Serial.println(CPUfrequency);
        } 
      else if (key == "hostName"){
        strcpy(hostBuffer, value.c_str()); 
        host=hostBuffer;
        Serial.println(host);
        //Serial.println(hostBuffer);
        }    
      else if(key == "FirstWebis") {
        FirstWebis = value.toInt();
        Serial.println(FirstWebis);
      }
    }  
  }  
  // 关闭文件  
  file.close(); 
}

void server_wifista(){
  int i=0;
  WiFi.mode(WIFI_STA);
  for(int j=0;j<wifiNum;j++)
  {
    Serial.println(wifiSsid[j]);
    Serial.println(wifiPassword[j]);
    WiFi.begin(wifiSsid[j], wifiPassword[j]);
    while((!(WiFi.status()==WL_CONNECTED))&&(i<10))
    {
      i++;
      delay(wifiConnectTime);
    }
    if(i!=0)
      i=0;
    if(WiFi.status()==WL_CONNECTED){
      wifissid=wifiSsid[j];
      break;
    }

  }
  if(WiFi.status()==WL_CONNECTED){
  //digitalWrite(37,HIGH);
  //digitalWrite(38,LOW);
  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());              // 通过串口监视器输出连接的WiFi名称
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());           // 通过串口监视器输出ESP32-NodeMCU的IP
  //IPAD=WiFi.localIP().toString();
  //Serial.println(IPAD); 
  if (!MDNS.begin(host)) {  
    Serial.println("Error setting up MDNS responder!");  
    while (1) {  
      delay(1000);  
    }  
  }

  esp32ServerOn();

  while(mode_switch)    //监听用户请求，直到模式转换
  {
    esp32_server.handleClient();                    // 处理用户请求
    //vTaskDelay(2/portTICK_PERIOD_MS);
  }
  
  mode_switch=1;
  esp32_server.close();   //关闭网站服务
  }else
  Serial.println('失败');  

}

//AP模式
void server_ap(){
  WiFi.disconnect(true,true);
  WiFi.mode(WIFI_AP);
  IPAddress local_IP(192, 168, 1, 1);  //配置ESP32的IP地址
  IPAddress gateway(192, 168, 1, 1);    //配置ESP32的网关
  IPAddress subnet(255, 255, 255, 0);   //配置ESP32的子网
 
  WiFi.softAPConfig(local_IP,gateway,subnet);
  WiFi.softAP((char*)ssid.c_str(), (char*)password.c_str(), channel, 0, 4);  //启动AP模式
  //wifissid=(char*)ssid.c_str();

    // 开始mDNS  
  if (!MDNS.begin(host)) {  
    Serial.println("Error setting up MDNS responder!");  
    while (1) {  
      delay(1000);  
    }  
  }

  //digitalWrite(37,LOW);
  //digitalWrite(38,HIGH);
  Serial.println(WiFi.softAPIP().toString()); 

  esp32ServerOn();

  while(mode_switch)    //监听用户请求，直到模式转换
  {
    esp32_server.handleClient();                    // 处理用户请求
    //vTaskDelay(pdMS_TO_TICKS(2));
  }
  
  mode_switch=1;
  esp32_server.close();   //关闭网站服务
}

void handleGetFiles() {
  listFile(SD_MMC,foldPath);
}
void respondOK(){
  esp32_server.send(200);
}
/*void download(){
  String path = esp32_server.uri();   // 获取用户请求网址信息
  Serial.println("下载："+path);
}*/
void esp32ServerOn(){
  //IPAD=String(host)+".local";
  esp32_server.onNotFound(handleUserRequet);      // 告知系统如何处理用户请求
  esp32_server.on("/configWifi",HTTP_GET, configWIFI);   //保存wifi
  esp32_server.on("/gamelist", HTTP_GET, listGame);   //列出游戏列表
  esp32_server.on("/upload",   // 如果客户端通过upload页面
          HTTP_POST,        // 向服务器发送文件(请求方法POST)
          respondOK,        // 则回复状态码 200 给客户端
          handleFileUploadAll);// 并且运行处理文件上传函数
  esp32_server.on("/uploadAll",   // 如果客户端通过allFile页面
          HTTP_POST,        // 向服务器发送文件(请求方法POST)
          respondOK,        // 则回复状态码 200 给客户端
          handleFileUploadAll);// 并且运行处理文件上传函数
  esp32_server.on("/set",   // 如果客户端通过set页面
          HTTP_POST,        // 向服务器发送文件(请求方法POST)
          respondOK,        // 则回复状态码 200 给客户端
          handleFileset);// 并且运行处理文件上传函数
  esp32_server.on("/backRoot", HTTP_GET, backRoot);   //回到根目录
  esp32_server.on("/lookthis", HTTP_GET, lookthisFile);   //查看文件
  esp32_server.on("/uploadaddFold", HTTP_GET, uploadaddFold);   //upload创建文件夹
  esp32_server.on("/renameFile", HTTP_GET, renameFile);   //重命名
  esp32_server.on("/deleteUploadFile", HTTP_GET, deleteUploadFile);   //删除文件
  esp32_server.on("/listaudio", HTTP_GET, listaudio);    //列出音乐列表
  esp32_server.on("/edittxt",HTTP_GET,editTxt);   //编辑txt文件
  esp32_server.on("/modify",HTTP_GET,modify);   //修改文件
  esp32_server.on("/wificonnect",changemode);   //模式转换
  esp32_server.on("/get_version", setversion); //显示版本
  esp32_server.on("/get_storage", getStorage); //显示版本
  esp32_server.on("/get_wifi", getWifi); //显示版本
  esp32_server.on("/get_video", getVideo); //显示版本
  esp32_server.on("/get_RootFile", getRootFile); //显示版本
  esp32_server.on("/get_quickFile", getQuickFile); //显示版本
  esp32_server.on("/get_File", handleGetFiles); //显示版本
  esp32_server.on("/configFile",HTTP_GET, configFile); //修改配置文件
  esp32_server.on("/nameText",HTTP_GET, nameText); //修改配置文件
  esp32_server.on("/addWifi",HTTP_GET, addWifi); //增加自连wifi
  esp32_server.on("/deduceWifi",HTTP_GET, deduceWifi); //减少自连wifi
  esp32_server.on("/backone",HTTP_GET, backone); //上一级
  esp32_server.on("/configAP", configAP);         //配置热点
  esp32_server.on("/FirstWeb", FirstWeb);         //配置主页
  //esp32_server.on("/download", download);         //配置主页
  
  //OTA
  esp32_server.on(
    "/update", HTTP_POST, []()
    {
    esp32_server.sendHeader("Connection", "close");
    esp32_server.send(200, "text/plain", (Update.hasError()) ? "FAIL" : "OK");
    ESP.restart(); },
    []()
    {
      HTTPUpload &upload = esp32_server.upload();
      if (upload.status == UPLOAD_FILE_START)
      {
        Serial.printf("Update: %s\n", upload.filename.c_str());
        if (!Update.begin(UPDATE_SIZE_UNKNOWN))
        { // start with max available size
          Update.printError(Serial);
        }
      }
      else if (upload.status == UPLOAD_FILE_WRITE)
      {
        /* flashing firmware to ESP*/
        if (Update.write(upload.buf, upload.currentSize) != upload.currentSize)
        {
          Update.printError(Serial);
        }
      }
      else if (upload.status == UPLOAD_FILE_END)
      {
        if (Update.end(true))
        { // true to set the size to the current progress
          esp32_server.send(200,"text/html","");
          Serial.printf("Update Success: %u\nRebooting...\n", upload.totalSize);
        }
        else
        {
          Update.printError(Serial);
        }
      }
    });

  esp32_server.begin();                           // 启动网站服务
  MDNS.addService("http", "tcp", 80);  
  Serial.println("mDNS responder started");
  Serial.println("HTTP server started");
}