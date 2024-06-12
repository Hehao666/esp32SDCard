#include "wifiConnect.h"
#include "myserver.h"

extern WebServer esp32_server;
extern bool mode_switch;

extern String ssid;
extern String password;
extern char channel;

extern int wifiNum;
extern char* txt[1];
extern char wifiSsid[10][64];
extern char wifiPassword[10][64];
extern int wifiConnectTime;

//保存修改的热点名称和密码
void configAP() {
  String ssid2 = esp32_server.arg("hotspotName");          //获取热点名称
  String password2 = esp32_server.arg("hotspotPassword");  //获取热点密码
  String channel2 = esp32_server.arg("channel");           //获取AP信道
  char flag = 0;
  char test1[3] = { '\r', '\n', '\0' };  //换行符
  String test2 = test1;
  String message = ssid2 + test2 + password2 + test2 + channel2 + test2;
  // Serial.print(message);
  flag = writeFile(SD_MMC, "/配置/password.txt", (char*)message.c_str());  //将名称和密码写入SD卡
  if (flag) {
    ssid = ssid2;
    password = password2;
    channel = String2Char((char*)channel2.c_str());
    respondOK();
  } else {
    esp32_server.send(500);
  }
}

void getWifi() {
  char jsonBuffer[2048];  // 假定的缓冲区大小，请根据实际情况调整
  char tempBuffer[128];   // 临时缓冲区，用于snprintf
  char timeStr[20];
  sprintf(timeStr, "%d", wifiConnectTime);
  // 初始化JSON字符串

  strcpy(jsonBuffer, "{\"autoWifinum\": \"");
  snprintf(tempBuffer, sizeof(tempBuffer), "%d", wifiNum);
  strcat(jsonBuffer, tempBuffer);

  strcat(jsonBuffer, "\",\"ssid\": \"");
  snprintf(tempBuffer, sizeof(tempBuffer), "%s", ssid);
  strcat(jsonBuffer, tempBuffer);

  strcat(jsonBuffer, "\",\"password\": \"");
  snprintf(tempBuffer, sizeof(tempBuffer), "%s", password);
  strcat(jsonBuffer, tempBuffer);

  strcat(jsonBuffer, "\",\"channel\": \"");
  snprintf(tempBuffer, sizeof(tempBuffer), "%d", channel);
  strcat(jsonBuffer, tempBuffer);

  strcat(jsonBuffer, "\",\"wifiConnectTime\": \"");
  strcat(jsonBuffer, timeStr);
  strcat(jsonBuffer, "\",\"wifilist\": [");  // 开始wifilist数组

  for (int i = 1; i <= wifiNum; i++) {
    strcat(jsonBuffer, "{\"wifiname\": \"");
    strcat(jsonBuffer, wifiSsid[i - 1]);
    strcat(jsonBuffer, "\",\"wifipass\": \"");
    strcat(jsonBuffer, wifiPassword[i - 1]);
    strcat(jsonBuffer, "\"}");

    // 如果不是最后一个元素，添加逗号
    if (i < wifiNum) {
      strcat(jsonBuffer, ",");
    }
  }

  strcat(jsonBuffer, "]}");  // 结束wifilist数组并关闭整个JSON对象
  // 打印或使用json字符串
  Serial.println(jsonBuffer);
  esp32_server.send(200, "application/json", jsonBuffer);
}
//保存
void configWIFI() {
  char* wifi[2] = {
    "WifiName",
    "WifiPassword",
  };
  int i = 0;
  char test1[3] = { '\r', '\n', '\0' };  //换行符
  String test2 = test1;
  String localwifissid;
  String localwifipassword;
  String message;
  char buff[100];
  String Wifiname;
  String Wifipassword;

  for (i = 0; i < wifiNum; i++) {
    sprintf(buff, "%s%d", wifi[0], i + 1);
    Wifiname = buff;
    sprintf(buff, "%s%d", wifi[1], i + 1);
    Wifipassword = buff;
    Serial.println(Wifiname);
    Serial.println(Wifipassword);
    localwifissid = esp32_server.arg(Wifiname);  //获取Wifi名称
    Serial.println(wifiNum);
    Serial.println(localwifissid);
    localwifipassword = esp32_server.arg(Wifipassword);  //获取Wifi密码
    Serial.println(localwifipassword);
    message += localwifissid + test2 + localwifipassword + test2;
  }
  writeFile(SD_MMC, txt[0], (char*)message.c_str());  //将名称和密码写入SD卡
  readFile4(SD_MMC, txt[0]);
  respondOK();
}
