#include "wifiConnect.h"
#include "server.h"

extern WebServer server;
extern WebServer esp32_server;
extern bool mode_switch;;

extern String ssid;
extern String password;
extern char channel;

extern int wifiNum;
extern char* txt[1];
extern char wifiSsid[10][64];
extern char wifiPassword[10][64];
extern int wifiConnectTime;

const String html1 = "<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>网页配网</title><script type=\"text/javascript\">function wifi(){var ssid = s.value;var password = p.value;var ip2 = ip.value;var staticIP2 = staticIP.value;var gateway2 = gateway.value;var subnet2 = subnet.value;var dns2 = dns.value;var xmlhttp=new XMLHttpRequest();xmlhttp.open(\"GET\",\"/HandleWifi?ssid=\"+ssid+\"&password=\"+password+\"&ip=\"+ip2+\"&staticIP=\"+staticIP2+\"&gateway=\"+gateway2+\"&subnet=\"+subnet2+\"&dns=\"+dns2,true);xmlhttp.send();document.getElementById(\"loader\").style.display = \"block\";xmlhttp.onload = function(e){document.getElementById(\"loader\").style.display = \"none\";alert(this.responseText);}}</script><script>function c(l){document.getElementById('s').value=l.innerText||l.textContent;document.getElementById('p').focus();}</script><script>function agree(){if(document.getElementById('ip').checked){document.getElementById('ip').value=\"1\";document.getElementById('staticIP').disabled=false;document.getElementById('gateway').disabled=false;document.getElementById('subnet').disabled=false;document.getElementById('dns').disabled=false;}else{document.getElementById('ip').value=\"0\";document.getElementById('staticIP').disabled='disabled';document.getElementById('gateway').disabled='disabled';document.getElementById('subnet').disabled='disabled';document.getElementById('dns').disabled='disabled';}}</script><script>function scan(){var xmlhttp2=new XMLHttpRequest();xmlhttp2.open(\"GET\",\"/HandleScanWifi\",true);xmlhttp2.send();document.getElementById(\"loader\").style.display = \"block\";xmlhttp2.onload = function(e){var element=document.getElementById(\"scan\");document.getElementById(\"loader\").style.display = \"none\";element.innerHTML=this.responseText;}}</script><style>#loader {position: fixed;left: 50%;top: 50%;z-index: 1;width: 120px;height: 120px;margin: -76px 0 0 -76px;border: 16px solid #f3f3f3;border-radius: 50%;border-top: 16px solid #3498db;-webkit-animation: spin 2s linear infinite;animation: spin 2s linear infinite;backdrop-filter: blur(2px);}@-webkit-keyframes spin {0% { -webkit-transform: rotate(0deg); }100% { -webkit-transform: rotate(360deg); }}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }} .container {width: 320px;margin: 0 auto;}</style></head><body><div style=\"display:none;\" id=\"loader\"></div><div class=\"container\"><h2>网页配网</h2><form>WiFi名称：<input id='s' name='s' type=\"text\" placeholder=\"请输入您WiFi的名称\"><br>WiFi密码：<input id='p' name='p' type=\"text\" placeholder=\"请输入您WiFi的密码\"><br><label for=\"ip\">静态IP</label><input name=\"ip\" id=\"ip\" type=\"checkbox\" onclick=\"agree();\"><br>IP地址：<input name=\"staticIP\" id=\"staticIP\" type=\"text\" value=\"192.168.0.80\" disabled=\"\"><br>网关：<input name=\"gateway\" id=\"gateway\" type=\"text\" value=\"192.168.1.1\" disabled=\"\"><br>子网：<input name=\"subnet\" id=\"subnet\" type=\"text\" value=\"255.255.255.0\" disabled=\"\"><br>DNS：<input name=\"dns\" id=\"dns\" type=\"text\" value=\"223.5.5.5\" disabled=\"\"><br><br><input type=\"button\" value=\"扫描\" onclick=\"scan()\"> <input type=\"button\" value=\"连接\" onclick=\"wifi()\"></form><div id=\"scan\"></div>";
const String html2 = "<p><a href=\"/\">返回AP模式</a>  <a href=\"/pageConfigAP\">配置热点</a></p></div></body></html>";

const String htmlAP1 = "<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" /><title>配置热点</title><style>.container {width: 320px;margin: 0 auto;}</style></head><body></div><div class=\"container\"><h2>配置热点</h2><form action=\"/configAP\">热点名称： <input name=\"hotspotName\" type=\"text\" value=\"";
const String htmlAP2 = "\" required=\"required\" maxlength=\"63\" placeholder=\"请输入热点名称\" /><br />热点密码： <input name=\"hotspotPassword\" type=\"text\" value=\"";
const String htmlAP3 = "\" onkeyup=\"value=value.replace(/[\u4e00-\u9fa5]/ig,&#39;&#39;)\" required=\"required\" maxlength=\"63\" placeholder=\"密码请不要少于8位\" /><br />WIFI信道： <select name=\"channel\">";
const String htmlAP4 = "</select><br /><br /><input type=\"submit\" value=\"提交\" /></form><p><a href=\"/\">返回AP模式</a> <a href=\"/wificonnect\">网页配网</a></p></div></body></html>";

const String htmlHeader = "<!DOCTYPE html><html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" /><title>配置开机自连WIFI</title><style>.container {width: 320px;margin: 0 auto;}</style></head><body>";  
// WiFi配置表单模板（这里我们只有一个表单）  
const String wifiFormTemplate = "<form action=\"/configWifi\"><div class=\"container\"><h2>";  
const String wifiInputTemplate1 = "<h2>开机第%d自连WIFI</h2>WIFI名称：</label> <input name=\"WifiName%d\" type=\"text\" value=\"";  
const String wifiInputTemplate2 = "\" required=\"required\" maxlength=\"63\" placeholder=\"请输入WIFI名称\" /><br />WIFI密码：</label> <input name=\"WifiPassword%d\" type=\"password\" value=\"";
const String wifiInputTemplate3 = "\" onkeyup=\"this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,&#39;&#39;);\" required=\"required\" maxlength=\"63\" placeholder=\"密码请不要少于8位\" />";
const String formSubmit = "<br /><br /><input type=\"submit\" value=\"保存所有配置\" />&nbsp;</form><input type=\"button\" value=\"增加自连wifi\" onclick=\"addWifi();\" />&nbsp;<input type=\"button\" value=\"减少自连wifi\" onclick=\"deduceWifi();\" />";  
String htmlContent;
//收尾
const String htmlWifi51 = "<h2>单个WIFI最长连接时间设置（单位ms,推荐750）</h2><form action=\"/configFile\"><input name=\"wifiConnectTime\" type=\"text\" value=\"";
const String htmlWifi52 = "\" onkeyup=\"value=value.replace(/[\u4e00-\u9fa5]/ig,&#39;&#39;)\" required=\"required\" maxlength=\"63\" placeholder=\"输入一个整数\" />";
const String htmlWifi53 = "<br /><input type=\"submit\" value=\"提交\" /></form></div></body><script>function addWifi() {var xmlhttp = new XMLHttpRequest();xmlhttp.open(\"GET\", \"\/addWifi\", false);xmlhttp.send();if (xmlhttp.status == 200)location.reload();}function deduceWifi() {var xmlhttp = new XMLHttpRequest();xmlhttp.open(\"GET\", \"\/deduceWifi\", false);xmlhttp.send();if (xmlhttp.status == 200)location.reload();}</script></html>";

//定义一个结构体，用于存放4位IP地址
struct struct_ipaddr
{
  uint8_t ipaddr_temp[4];
};

//发送配网页面
void handleRoot() {
  
  String str = html1 + html2;
  server.send(200, "text/html", str);
}

//扫描附近WIFI并返回
void HandleScanWifi() {
  uint8_t i = 0;
  String scanstr = "";
  // WiFi.scanNetworks will return the number of networks found
  uint8_t n = WiFi.scanNetworks();
  if (n <= 0) {
    // Serial.println("no networks found");
    scanstr += "NO WIFI";
  }
  else {
    scanstr += "<table><tr><th>序号</th><th>名称</th><th>强度</th></tr>";
    for (i = 0; i < n; i++) {
      scanstr += "<tr><td align=\"center\">" + String(i + 1) + "</td><td align=\"center\">" + "<a href='#p' onclick='c(this)'>" + WiFi.SSID(i) + "</a>" + "</td><td align=\"center\">" + WiFi.RSSI(i) + "</td></tr>";
    }
    scanstr += "</table>";
  }
  server.send(200, "text/html", scanstr);
  
  
}

//尝试连接网页发送的WIFI
void HandleWifi()
{
  String wifis = server.arg("ssid");    //获取WIFI名称
  String wifip = server.arg("password");    //获取WIFI密码
  String ip2 = server.arg("ip");    //判断是DHCP连接还是静态IP连接
  String staticIP2 = server.arg("staticIP");    //静获取态IP地址
  String gateway2 = server.arg("gateway");    //静获取态IP网关
  String subnet2 = server.arg("subnet");    //静获取态IP子网
  String dns2 = server.arg("dns");    //静获取态IP的dns
  struct_ipaddr x;
  String IPAD3 = "";
  // Serial.println("received:" + wifis);
/*
  Serial.println("ip:" + ip2);
  Serial.println("staticIP:" + staticIP2);
  Serial.println("gateway:" + gateway2);
  Serial.println("subnet:" + subnet2);
  Serial.println("dns:" + dns2);
  */
  WiFi.disconnect(true,true);

  
  if(ip2=="1")  //配置静态IP情况
  {
    x = StringToIPAddress(staticIP2);
    IPAddress staticIP(x.ipaddr_temp[0],x.ipaddr_temp[1],x.ipaddr_temp[2],x.ipaddr_temp[3]);
    x = StringToIPAddress(gateway2);
    IPAddress gateway(x.ipaddr_temp[0],x.ipaddr_temp[1],x.ipaddr_temp[2],x.ipaddr_temp[3]);
    x = StringToIPAddress(subnet2);
    IPAddress subnet(x.ipaddr_temp[0],x.ipaddr_temp[1],x.ipaddr_temp[2],x.ipaddr_temp[3]);
    x = StringToIPAddress(dns2);
    IPAddress dns(x.ipaddr_temp[0],x.ipaddr_temp[1],x.ipaddr_temp[2],x.ipaddr_temp[3]);
    // Serial.println(staticIP);
    // Serial.println(gateway);
    // Serial.println(subnet);
    // Serial.println(dns);
    WiFi.config(staticIP, gateway, subnet, dns);
  }
  else    //DHCP情况
  {
    IPAddress test(0,0,0,0);
    WiFi.config(test, test, test, test);
  }
  
  //尝试连接WIFI
  WiFi.begin((char*)wifis.c_str(), (char*)wifip.c_str());
  for (int i = 0; i < 20; i++)        //超时判断
  {
    if (WiFi.status() == WL_CONNECTED)    //如果检测到状态为成功连接WIFI
    {
      vTaskDelay(2000/portTICK_PERIOD_MS);
      // Serial.printf("SSID:%s\r\n", WiFi.SSID().c_str());
      // Serial.printf("PSW:%s\r\n", WiFi.psk().c_str());
      IPAD3 = WiFi.localIP().toString();
      server.send(200, "text/html", "连接成功 IP：" + IPAD3);    //发送连接的IP地址
      vTaskDelay(10000/portTICK_PERIOD_MS);
      mode_switch = 0;                             //函数跳出while循环，从而在loop函数中进入下一个模式
      return;                                      //如果成功连接，则返回到主函数
    }
    else
    {
      vTaskDelay(500/portTICK_PERIOD_MS);
    }
  }
  server.send(200, "text/html", "连接失败");
  
}

//将IP地址字符串转换为结构体，分别存储4位IP地址
struct struct_ipaddr StringToIPAddress(String ipaddr){
  struct struct_ipaddr y;
  y.ipaddr_temp[0]=0;
  y.ipaddr_temp[1]=0;
  y.ipaddr_temp[2]=0;
  y.ipaddr_temp[3]=0;
  uint8_t len = 0;
  uint8_t count = 0;
  uint8_t i = 0,j = 0,k = 0;
  uint8_t temp[3]={1,10,100};
  len = ipaddr.length();
  for(i=0;i<len;i++)
  {
    if(ipaddr[i]=='.')    //通过.来分割IP地址
    {
      for(k=0;k<i-j;k++){
        y.ipaddr_temp[count] += (ipaddr[i-k-1]&0x0f)*temp[k];   //个位*1 + 十位*10 + 百位*100
      }
      j=i+1;
      count++;
    }
  }
  for(k=0;k<i-j;k++){
    y.ipaddr_temp[count] += (ipaddr[i-k-1]&0x0f)*temp[k];
  }
  return y;

}

//发送配置AP网页
void pageConfigAP(){
  int i=1;
  String message = htmlAP1 + ssid + htmlAP2 + password + htmlAP3;
  for(i = 1; i < 14; i++){
    message += "<option value=\"";
    message += String(i);
    if(i==channel){
      message += "\" selected>";
    }
    else{
      message += "\">";
    }
    message += String(i);
    message += "</option>";
  }
  message += htmlAP4;
  server.send(200, "text/html", message);
}

//保存修改的热点名称和密码
void configAP(){
  String ssid2 = server.arg("hotspotName");    //获取热点名称
  String password2 = server.arg("hotspotPassword");    //获取热点密码
  String channel2 = server.arg("channel");    //获取AP信道
  char flag=0;
  char test1[3]={'\r','\n','\0'}; //换行符
  String test2 = test1;
  String message = ssid2 + test2 + password2 + test2 + channel2 + test2;
  // Serial.print(message);
  flag=writeFile(SD_MMC, "/password.txt", (char*)message.c_str());  //将名称和密码写入SD卡
  if(flag){
    ssid = ssid2;
    password = password2;
    channel = String2Char((char*)channel2.c_str());
    server.send(200, "text/html", "<!DOCTYPE html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes\" /><title>配置成功</title></head><body><h1>配置成功</h1><br>请重启服务器</body></html>");
  }
  else{
    server.send(200, "text/html", "<!DOCTYPE html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes\" /><title>配置失败</title></head><body><h1>配置失败</h1></body></html>");
  }
}

//发送配置自连WIFI网页
void pageConfigWIFI(){
  htmlContent="";
  htmlContent += htmlHeader;
  htmlContent += wifiFormTemplate; // 开始表单
  char buffer[1024]; // 确保缓冲区足够大以容纳整个字符串
  for (int i = 1; i <= wifiNum; i++) {
    snprintf(buffer, sizeof(buffer), wifiInputTemplate1.c_str(), i, i, i);  
    htmlContent += buffer;
    htmlContent += wifiSsid[i-1];
    snprintf(buffer, sizeof(buffer), wifiInputTemplate2.c_str(), i);
    htmlContent += buffer;
    htmlContent += wifiPassword[i-1];
    htmlContent += wifiInputTemplate3;
  }  
  htmlContent += formSubmit; // 结束表单并添加提交按钮
  String messagewifi = htmlContent + htmlWifi51 + wifiConnectTime + htmlWifi52 + htmlWifi53;
  esp32_server.send(200, "text/html", messagewifi);
}

//保存
void configWIFI(){
  char* wifi[2] = {
        "WifiName",
        "WifiPassword",
    };
  int i=0;
  char test1[3]={'\r','\n','\0'}; //换行符
  String test2 = test1;
  String localwifissid;
  String localwifipassword;
  String message;
  char buff[100];
  String Wifiname;
  String Wifipassword;

  for(i=0;i<wifiNum;i++){
    sprintf(buff, "%s%d", wifi[0], i+1);
    Wifiname = buff;
    sprintf(buff, "%s%d", wifi[1], i+1);
    Wifipassword = buff;
    Serial.println(Wifiname);
    Serial.println(Wifipassword);
    localwifissid = esp32_server.arg(Wifiname);    //获取Wifi名称
    localwifipassword = esp32_server.arg(Wifipassword);    //获取Wifi密码
    Serial.println(localwifissid);
    Serial.println(localwifipassword);
    message += localwifissid + test2 + localwifipassword + test2;
  }
  writeFile(SD_MMC, txt[0], (char*)message.c_str());  //将名称和密码写入SD卡
  readFile4(SD_MMC, txt[0]);
  esp32_server.send(200, "text/html", "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /></head><body><script>window.location.href='/';alert('配置保存成功');</script></body></html>");
}
void wifi_handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}
