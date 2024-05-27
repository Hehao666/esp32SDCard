#include "upload.h"
#include "copy.h"
#include "version.h"
#include "server.h"

extern char* txt[1];
extern int FirstWebis;
extern int wifiNum;
extern WebServer esp32_server;
extern File fsUploadFile;
extern bool hasSD;
extern bool ONE_BIT_MODE;
extern String foldPath;
extern const char* host;
extern long long totalstorage;
extern long long storage;
extern String IPAD;
extern char *wifissid;

void Storage(){
  if(totalstorage==0&&storage==0)
  {
    totalstorage = SD_MMC.totalBytes();
    storage =SD_MMC.usedBytes();
  }
}

void getStorage(){
  Storage();
  char buffer[100];
  snprintf(buffer, sizeof(buffer), "{\"totalstorage\": \"%lld\",\"storage\": \"%lld\"}", totalstorage, storage);
  esp32_server.send(200, "application/json", buffer);
}

void listFile(fs::FS &fs, String dirname){
  String filename = "";
  String filepath = "";
  File root = fs.open(dirname);
  if(!root){
      esp32_server.send(500, "text/html", "Failed to open directory <br />");
      return;
  }
  if(!root.isDirectory()){
      esp32_server.send(500, "text/html", "Not a directory <br />");
      return;
  }

  File file = root.openNextFile();
  String json = "["; // 开始构建JSON数组
  bool isFirstGame = true;
  while(file){
      if(file.isDirectory()){
           if(String(file.name())!="System Volume Information")
           {
            if (!isFirstGame) {
                json += ","; // 添加逗号分隔数组元素，除了第一个
            }
            isFirstGame = false;
            filepath=String(file.path());
            json += "{\"filepath\":\"" + filepath + "\", \"filesize\":\"0\"}"; // 添加游戏路径和大小到数组
           }
      } else {
          if (!isFirstGame) {
              json += ","; // 添加逗号分隔数组元素，除了第一个
          }
          isFirstGame = false;
          filename = String(file.path());
          size_t fileSize = file.size();
          json += "{\"filepath\":\"" + filename + "\", \"filesize\":\"" + String(fileSize) + "\"}"; // 添加游戏路径和大小到数组
      }
      file = root.openNextFile();
  }
  file.close();
  json += "]"; // 结束JSON数组
  char totalstorageStr[32] = {0};
  char storageStr[32] = {0};
  Storage();
  sprintf(totalstorageStr, "%lld", totalstorage);
  sprintf(storageStr, "%lld", storage);
  String jsonResponse = "{\"totalstorage\":\"" + String(totalstorageStr) + "\","
                        + "\"storage\":\"" + String(storageStr) + "\","
                        + "\"files\": " + json + "}";
  Serial.println(jsonResponse);
  esp32_server.send(200, "application/json",jsonResponse); // 发送完整的JSON响应
}

void handleFileUploadAll(){  
  HTTPUpload& upload = esp32_server.upload();
  
  if(upload.status == UPLOAD_FILE_START){                     // 如果上传状态为UPLOAD_FILE_START

    if (SD_MMC.exists((char *)upload.filename.c_str())) {
      SD_MMC.remove((char *)upload.filename.c_str());
    }
    
    String filename = upload.filename;                        // 建立字符串变量用于存放上传文件名
    if(!filename.startsWith("/")) 
      filename = foldPath+"/" + filename;

    fsUploadFile = SD_MMC.open(filename, FILE_WRITE);            // 在SD卡中建立文件用于写入用户上传的文件数据
    
  }
  else if(upload.status == UPLOAD_FILE_WRITE){          // 如果上传状态为UPLOAD_FILE_WRITE      
    
    if(fsUploadFile)
      fsUploadFile.write(upload.buf, upload.currentSize); // 向SD卡文件写入浏览器发来的文件数据
      
  }
  else if(upload.status == UPLOAD_FILE_END){            // 如果上传状态为UPLOAD_FILE_END 
    if(fsUploadFile) {                                    // 如果文件成功建立
      fsUploadFile.close();                               // 将文件关闭
      
    }
    else {                                              // 如果文件未能成功建立
      esp32_server.send(500, "text/plain", "500: couldn't create file"); // 向浏览器发送相应代码500（服务器错误）
    }    
  }
  
}
void handleFileset(){  
  HTTPUpload& upload = esp32_server.upload();
  
  if(upload.status == UPLOAD_FILE_START){                     // 如果上传状态为UPLOAD_FILE_START

    if (SD_MMC.exists((char *)upload.filename.c_str())) {
      SD_MMC.remove((char *)upload.filename.c_str());
    }
    String filename = upload.filename;                        // 建立字符串变量用于存放上传文件名
    if(filename=="logo.jpg")
      foldPath="/config/";
    else if(filename=="background.jpg")
      foldPath="/config/";
    if(!filename.startsWith("/")) 
      filename = foldPath + filename;
     Serial.println("File Name: " + filename);                 // 通过串口监视器输出上传文件的名称

    fsUploadFile = SD_MMC.open(filename, FILE_WRITE);            // 在SD卡中建立文件用于写入用户上传的文件数据
  }
  else if(upload.status == UPLOAD_FILE_WRITE){          // 如果上传状态为UPLOAD_FILE_WRITE      
    
    if(fsUploadFile)
      fsUploadFile.write(upload.buf, upload.currentSize); // 向SD卡文件写入浏览器发来的文件数据
  }
  else if(upload.status == UPLOAD_FILE_END){            // 如果上传状态为UPLOAD_FILE_END 
    if(fsUploadFile) {                                    // 如果文件成功建立
      fsUploadFile.close();                               // 将文件关闭
      esp32_server.send(200);
    }
    else {                                              // 如果文件未能成功建立
      esp32_server.send(300); // 向浏览器发送相应代码500（服务器错误）
    }    
  }
  
}

void deleteUploadFile(){
    char flag=0;
    String deletePath = esp32_server.arg("deletePath");
    File fl = SD_MMC.open(deletePath);
    if(fl.isDirectory()){
      flag=deleteFold(SD_MMC, (char*)deletePath.c_str());
    }else{
      flag=deleteFile(SD_MMC, (char*)deletePath.c_str());
    }
    if(flag){
      esp32_server.send(200,"text/html","删除成功");
    } else {
      esp32_server.send(200,"text/html","删除失败");
    }
    
}
void lookthisFile(){
  foldPath = esp32_server.arg("lookthisPath");
  esp32_server.send(200, "text/html", "");
}
void modify(){
  String filename = esp32_server.arg("filename");
  Serial.println(filename);
  modifyfile(filename.c_str());
}
void setversion(){
  Storage();
  char buffer[100];
  snprintf(buffer, sizeof(buffer), "\"totalstorage\": \"%lld\", \"storage\": \"%lld\"", totalstorage, storage);
  IPAD = WiFi.localIP().toString();
  String json = "{\"version\": \"" + String(VERSION) + "\",\"text\": \"" + String(host) + "\",\"FirstWebis\": \"" + String(FirstWebis) + "\",\"IPAD\": \"" + String(IPAD) + "\",\"WIFI\": \"" + String(wifissid) + "\", " + String(buffer) + "}";
  esp32_server.send(200, "application/json", json);
  Serial.println(json);
}
void backRoot(){
  foldPath="/";
  esp32_server.send(200, "text/html", "");
}
void backone(){
  if(foldPath!="/"){
    int lastIndex = foldPath.lastIndexOf('/'); // 查找最后一个'/'的位置
    if(lastIndex!=0)  
      foldPath = foldPath.substring(0, lastIndex);
    else
      foldPath="/";
    esp32_server.send(200, "text/html", "");
  }
}
void uploadaddFold(){
  char flag=0;
  String foldname ="";
  foldname+=foldPath+"/";
  foldname+= esp32_server.arg("foldname");
  flag=SD_MMC.mkdir(foldname);
  if(flag){
    esp32_server.send(200,"text/html","添加成功");
  } else {
    esp32_server.send(300,"text/html","添加失败");
  }
}
void addWifi(){
  if(wifiNum<9)
    wifiNum++;
  Serial.println(wifiNum);
  String buffer = String(wifiNum);  
  Serial.println(buffer);
  writeConfigKeyValue(SD_MMC, "autoWifinum", buffer);
  readFile4(SD_MMC, txt[0]);
  esp32_server.send(200);
}
void deduceWifi(){
  if (wifiNum > 1) 
    wifiNum--;  
  Serial.println(wifiNum);
  String buffer = String(wifiNum); 
  Serial.println(buffer);
  writeConfigKeyValue(SD_MMC, "autoWifinum", buffer);
  readFile4(SD_MMC, txt[0]);
  esp32_server.send(200);
}

void renameFile(){
  char flag=0;
  String newfoldname ="";
  newfoldname+=foldPath+"/";
  newfoldname+= esp32_server.arg("newfoldname");
  String foldname ="";
  foldname+=foldPath+"/";
  foldname+= esp32_server.arg("foldname");
  Serial.println(foldname);
  Serial.println(newfoldname);
  flag=renameFold(SD_MMC,foldname.c_str(),newfoldname.c_str());
  if(flag){
    esp32_server.send(200);
  } else {
    esp32_server.send(300);
  }
}
void getQuickFile(){
  foldPath="/upload";
  listFile(SD_MMC,foldPath);
}
void getRootFile(){
  foldPath="/";
  listFile(SD_MMC,foldPath);
}
