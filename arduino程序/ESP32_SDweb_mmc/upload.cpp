#include "upload.h"
#include "copy.h"
#include "version.h"
#include "server.h"

extern char* txt[1];
extern int wifiNum;
extern WebServer esp32_server;
extern File fsUploadFile;
extern bool hasSD;
extern bool ONE_BIT_MODE;
extern String foldPath;
extern String messagehead;
extern String messageheadAll;
extern const char* host;

String getHtmlContent() {
  File file = SD_MMC.open("/upload.html", "r"); // 假设你的HTML文件名为index.html
  String content = file.readString();
  file.close();
  return content;
}

String getHtmlContentAll() {
  File file = SD_MMC.open("/allFile.html", "r"); // 假设你的HTML文件名为index.html
  String content = file.readString();
  file.close();
  return content;
}
String sdStorage(fs::FS &fs, const char * dirname, uint8_t levels)
{
    // 初始化文件计数器  
  uint16_t fileCount = 0;  
  // 读取目录中的每个文件  
  File calRoot = fs.open(foldPath); 
  File entry = calRoot.openNextFile();  
  while (entry) {  
    fileCount++;  
    // 可以选择打印文件名  
    entry.close();  
    entry = calRoot.openNextFile();  
  }
  calRoot.close();
  String message="";
  String str="总容量/剩余容量：";
  File root = fs.open(dirname);
  char *log[] = {"B","K", "M", "G"};
  int choose[2] ={0,0}; 
  char buff[20];
  char buff2[20];
  long long totalstorage = SD_MMC.totalBytes();
  long long storage = SD_MMC.totalBytes()-SD_MMC.usedBytes();
  double totalGB=0,GB=0;
  if((totalstorage / 1024) > 1024)
    if((totalstorage / (1024*1024)) > 1024)
      if((totalstorage / (1024*1024*1024)) > 1){
        totalGB=totalstorage / (1024.0 * 1024.0 * 1024.0);
        choose[0]=3;
        }
      else
      {
        totalGB=totalstorage / (1024.0 * 1024.0);
        choose[0]=2;
      }
    else{
      totalGB=totalstorage / 1024.0;
      choose[0]=1;
    }
  else{
    choose[0]=0;
  }
  if((storage / 1024) > 1024)
    if((storage / (1024*1024)) > 1024)
      if((storage / (1024*1024*1024)) > 1){
        GB=storage / (1024.0 * 1024.0 * 1024.0);
        choose[1]=3;
        }
      else
      {
        GB=storage / (1024.0 * 1024.0);
        choose[1]=2;
      }
    else{
      GB=storage / 1024.0;
      choose[1]=1;
    }
  else{
    choose[1]=0;
  }
  sprintf(buff,"%.2f", totalGB);
  sprintf(buff2,"%.2f", GB);
  str =str + buff+log[choose[0]]+'/'+buff2+log[choose[1]];
  message +="<div class=\"container\"><table><tr><th align='left'>"+ str+"</th><th></th><th></th></tr></div>";
  message +="<tr><th align='left'>当前文件路径："+foldPath+"</th><th></th><th></th></tr>";
  message +="<tr><th align='left'>文件名</th><th align='left'>大小</th><th>" + String(fileCount) + "</th><th></th></tr>";
  return message;
}

//列出上传的文件
String listAllDir(fs::FS &fs, const char * dirname, uint8_t levels)
{
  String filename = "";
  String filename2 = "";
  String allFilename = "";
  //String fileAllpath = "";
  String foldname = "";
  String message="";
  String filepath = "";
  File root = fs.open(dirname);
  if(!root){
      message += "Failed to open directory <br />";
      return message;
  }
  if(!root.isDirectory()){
      message += "Not a directory <br />";
      return message;
  }
  File file = root.openNextFile();
  while(file){
      if(file.isDirectory()){
           if(String(file.name())!="System Volume Information")
           {
              foldname=String(file.name());
              filepath=String(file.path());
              message += "<tr align='left'><td>" + foldname + "</td>";
              message += "<td></td><td></td><td><button onclick=\"lookthis(\'" + filepath + "\')\">查看</button></td>";
              message += "<td><input type=\"text\" name=\"refoldname\" value=\'"+foldname+"\' id=\'"+foldname+"nameInputValue\' placeholder=\"请输入重命名名称\">";
              message += "<button onclick=\"renameFile(\'" + foldname + "\')\">确定重命名</button></td>";
              if(foldPath!="/")
                message += "<td><button onclick=\"deleteButton(\'" + filepath + "\')\">删除</button></td><td><button onclick=\"deleteAllButton(\'" + filepath + "\')\">删除全部</button></td></tr>";
              else
                message += "<td><button onclick=\"deleteButton(\'" + filepath + "\')\">删除</button></td></tr>";
           }
      } else {
          filename = String(file.path());
          filename2 = String(file.name());
          message += "<tr align='left'><td>" + filename2 + "</td><td>" + formatBytes(file.size());
          if(filename2.endsWith(".html")||filename2.endsWith(".txt")){
            message += "<td><button onclick=\"modify(\'" + filename + "\')\">修改</button></td>";
            }
          else
          message += "<td></td>";
          message += "<td><button onclick=\"downloadButton(\'" + filename + "\',\'" + filename2 + "\')\">下载</button></td>";
          message += "<td><input type=\"text\" name=\"refoldname\" value=\'"+filename2+"\' id=\'"+filename2+"nameInputValue\' placeholder=\"请输入重命名名称\">";
          message += "<button onclick=\"renameFile(\'" + filename2 + "\')\">确定重命名</button></td>";
          message += "<td><button onclick=\"deleteButton(\'" + filename + "\')\">删除</button></td></tr>";
      }
      file = root.openNextFile();
  }
  message += "</table>";
  return message;
}


//列出上传的文件
String listUploadDir(fs::FS &fs, const char * dirname, uint8_t levels)
{
  String filename = "";
  String filename2 = "";
  String foldname = "";
  String filepath = "";
  String message="";
  File root = fs.open(dirname);
  if(!root){
      message += "Failed to open directory <br />";
      return message;
  }
  if(!root.isDirectory()){
      message += "Not a directory <br />";
      return message;
  }

  File file = root.openNextFile();
  while(file){
      if(file.isDirectory()){
           if(String(file.name())!="System Volume Information")
           {
              foldname=String(file.name());
              filepath=String(file.path());
              message += "<tr align='left'><td>" + foldname + "</td>";
              message += "<td><button onclick=\"lookthis(\'" + filepath + "\')\">查看</button>";
              message += "<button onclick=\"deleteButton(\'" + filepath + "\')\">删除</button></td></tr>";
           }
      } else {
          filename = String(file.path());
          filename2 = String(file.name());
          message += "<tr align='left'><td>" + filename2 + "</td><td>" + formatBytes(file.size());
          message += "</td><td><button onclick=\"downloadButton(\'" + filename + "\',\'" + filename2 + "\')\">下载</button></td>";
          message += "<td><button onclick=\"deleteButton(\'" + filename + "\')\">删除</button></tr>";

      }
      file = root.openNextFile();
  }
  message += "</table>";
  return message;
}
void listUploadFile() {
  String messagesend ="";
  if(messagehead=="")
   messagehead = getHtmlContent();
  String message = listUploadDir(SD_MMC,foldPath.c_str(),1);
  String mymessage = sdStorage(SD_MMC,foldPath.c_str(),1);
  messagesend = messagehead+mymessage+message;
  esp32_server.send(200,"text/html",messagesend); 
} 
void listAllFile() {
  String messagesend ="";
  if(messageheadAll=="")
   messageheadAll = getHtmlContentAll();
  String message = listAllDir(SD_MMC,foldPath.c_str(),1);
  String mymessage = sdStorage(SD_MMC,foldPath.c_str(),1);
  messagesend = messageheadAll+mymessage+message;
  esp32_server.send(200,"text/html",messagesend); 
} 

void listAllFileFirst() {
  foldPath="/";
  String messagesend ="";
  if(messageheadAll=="")
   messageheadAll = getHtmlContentAll();
  String message = listAllDir(SD_MMC,foldPath.c_str(),1);
  String mymessage = sdStorage(SD_MMC,foldPath.c_str(),1);
  messagesend = messageheadAll+mymessage+message;
  esp32_server.send(200,"text/html",messagesend); 
} 

void handleFileUpload(){  
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
    if(filename=="2.jpg")
      foldPath="/images/";
    else if(filename=="logo.jpg")
      foldPath="/";
    else if(filename=="intro-bg.jpg")
      foldPath="/images/";
    else if(filename=="allFile.html")
      foldPath="/";
    else if(filename=="upload.html")
      foldPath="/";
    else if(filename=="webgame.html")
      foldPath="/webgame/";
    else if(filename=="video.html")
      foldPath="/";
    else if(filename=="index.html")
      foldPath="/";
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
      
    }
    else {                                              // 如果文件未能成功建立
      esp32_server.send(500, "text/plain", "500: couldn't create file"); // 向浏览器发送相应代码500（服务器错误）
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
void deleteUploadAllFile(){
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
void deleteAllButton(){
    String deletePath = esp32_server.arg("deletePath");
    File fl = SD_MMC.open(deletePath);
    File entry = fl.openNextFile();
    while (entry) {  
      String subPath = String(entry.path());
      if (entry.isDirectory()) {   
        deleteFold(SD_MMC, subPath.c_str());         
      } else {
        deleteFile(SD_MMC, subPath.c_str());   
      }  
      entry = fl.openNextFile();  
    }
    esp32_server.send(200,"text/html","删除成功");
}
void lookthisFile(){
  foldPath = esp32_server.arg("lookthisPath");
  esp32_server.send(200, "text/html", "");
}
void modify(){
  String foldAll ="";
  foldAll = esp32_server.arg("foldname");//文件名
  Serial.println(foldAll);
  modifyfile(foldAll.c_str());
}
void setversion(){
  String json = "{\"version\": \"" + String(VERSION) + "\",\"text\": \"" + String(host) + "\"}";  
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
void addFold(){
  char flag=0;
  String foldname ="";
  foldname+=foldPath+"/";
  foldname+= esp32_server.arg("foldname");
  SD_MMC.mkdir(foldname);
  if(flag){
    esp32_server.send(200,"text/html","添加成功");
  } else {
    esp32_server.send(300,"text/html","添加失败");
  }
}
void uploadaddFold(){
  String foldname ="";
  foldname+=foldPath+"/";
  foldname+= esp32_server.arg("foldname");
  SD_MMC.mkdir(foldname);
}
void addWifi(){
  if(wifiNum<9)
    wifiNum++;
  Serial.println(wifiNum);
  String buffer = String(wifiNum);  
  Serial.println(buffer);
  writeConfigKeyValue(SD_MMC, "autoWifinum", buffer);
  readFile4(SD_MMC, txt[0]);
  esp32_server.send(200, "text/html", "<html><body><script>location.reload(true);</script></body></html>");
}
void deduceWifi(){
  if (wifiNum > 1) 
    wifiNum--;  
  Serial.println(wifiNum);
  String buffer = String(wifiNum); 
  Serial.println(buffer);
  writeConfigKeyValue(SD_MMC, "autoWifinum", buffer);
  readFile4(SD_MMC, txt[0]);
  esp32_server.send(200, "text/html", "<html><body><script>location.reload(true);</script></body></html>");
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
    esp32_server.send(200,"text/html","重命名成功");
  } else {
    esp32_server.send(300,"text/html","重命名失败");
  }
}

void quickfile(){
  foldPath="/upload";
  //esp32_server.sendHeader("Location", "/white.html");
  //esp32_server.send(200,"text/html","");
  listUploadFile();
}
void quickAllFile(){
  foldPath="/";
  //esp32_server.sendHeader("Location", "/whiteAll.html");
  //esp32_server.send(200,"text/html","");
  listAllFile();
}
void downloadUploadFile(){
  String attname = esp32_server.arg("attname");
  String downloadPath = esp32_server.arg("downloadPath");
  String attachment = "";
  attachment += "attachment; filename=" + attname;
  if (SD_MMC.exists(downloadPath)) {
    File file = SD_MMC.open(downloadPath, FILE_READ);
    esp32_server.sendHeader("Content-Disposition", (char*)attachment.c_str());
    esp32_server.streamFile(file, "application/octet-stream");
    file.close();
}
  else{
    esp32_server.send(404, "text/plain", "404 Not Found");
  }
}
