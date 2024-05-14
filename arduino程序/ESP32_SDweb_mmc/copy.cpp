#include "copy.h"
#include <string> 

extern WebServer esp32_server;
extern String htmlHeader;

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
//读取txt文件
String readFile2(fs::FS &fs, const char * path){
  int i=0;
  String message="";
  File file = fs.open(path);
  int leng=file.size();
  Serial.println(leng);
  char readbuff[leng+20];
  if(!file){
      // Serial.println("Failed to open file for reading");
      return message;
  }

  while(file.available()){
      if(i<leng)
      {
          readbuff[i] = file.read();
          i++;
      }
      else{
        break;
      }
  }
  file.close();
  readbuff[i]='\0';
  message = readbuff;
  return message;
}

//覆盖写入txt文件
void editTxt(){
  String txtPath = esp32_server.arg("txtpath");   //提取文件路径
  Serial.println(txtPath);
  String Contentmodify = esp32_server.arg("con");    //提取要保存的内容
  Serial.println(Contentmodify);
  //String txtContent = replacePercent23WithHash(Contentmodify);
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

//剪切板HTML代码
void clipBoard(){
  String content="";
  content = readFile2(SD_MMC,"/copy.txt");  //读取copy.txt的内容
  String message = htmlHeader + "<title>剪切板</title></head><body><h2>剪切板</h2><button type=\"button\" onclick=\"theCopy()\">复制</button> <button type=\"button\" onclick=\"theSave()\">保存</button><br><br/><label style=\"display: block\"><textarea id=\"textArea\" rows=\"8\" style=\"width:100%;\">";
  message += content;
  message += "</textarea></label></body><script>function theCopy() {var textArea = document.getElementById('textArea');console.log(textArea);textArea.select();document.execCommand('copy');alert('复制成功');}</script><script>function theSave() {var text=document.getElementById('textArea').value;var con=text.replace(/\\+/g, '%2B').replace(/#/g, '%23').replace(/%/g, '%25').replace(/&/g, '%26').replace(/\\r\\n/g, '%0D%0A').replace(/\\n/g, '%0D%0A');var xmlhttp=new XMLHttpRequest();xmlhttp.open(\"GET\",\"/edittxt?txtpath=/copy.txt&con=\"+con,true);xmlhttp.send();xmlhttp.onload = function(e){alert(this.responseText);}}</script></html>";
  
  esp32_server.send(200,"text/html",message);
}
void modifyfile(const char * path){
  String content="";
  String modifypath=path;
  Serial.println(path);
  content = readFile2(SD_MMC,path);  //读取copy.txt的内容
  String message = htmlHeader + "<title>\'" + path + "\'</title></head><body><h2>\'" + path + "\'</h2><button type=\"button\" onclick=\"theCopy()\">复制</button> <button type=\"button\" onclick=\"theSave(\'" + modifypath + "\')\">保存</button><br><br/><label style=\"display: block\"><textarea id=\"textArea\" rows=\"40\" style=\"width:100%;\">";
  message += content;
  message += "</textarea></label></body><script>function theCopy() {var textArea = document.getElementById('textArea');console.log(textArea);textArea.select();document.execCommand('copy');alert('复制成功');}</script><script>function theSave(path) {var modifypath = path;var text=document.getElementById('textArea').value;var con=text.replace(/\\+/g, '%2B').replace(/#/g, '%23').replace(/%/g, '%25').replace(/&/g, '%26').replace(/\\r\\n/g, '%0D%0A').replace(/\\n/g, '%0D%0A');var xmlhttp=new XMLHttpRequest();xmlhttp.open(\"GET\",\"/edittxt?txtpath=\"+modifypath+\"&con=\"+con,true);xmlhttp.send();xmlhttp.onload = function(e){alert(this.responseText);}}</script></html>";
  //Serial.println(message);
  esp32_server.send(200,"text/html",message);
}




