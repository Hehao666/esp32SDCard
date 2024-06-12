#include <SD_MMC.h>
#include <sd_defines.h>
#include <WiFi.h>
#include <WebServer.h>
#include "FS.h"
#include "common.h"
#include "myserver.h"
#include "game.h"
#include "upload.h"
#include "video.h"
#include "web.h"
#include "copy.h"
#include "wifiConnect.h"
#include <Update.h>
#include "version.h"
#include <ESPmDNS.h>

bool hasSD = false;         //是否有SD卡
bool ONE_BIT_MODE = true;  //设置SD卡模式 1bit：true 4bit：false

WebServer esp32_server(80);  // 建立网络服务器对象，该对象用于响应HTTP请求。监听端口（80）
File fsUploadFile;           // 建立文件对象用于闪存文件上传

bool mode_switch = 1;  //用于控制模式变换中的跳出while循环
const char* host = "esp32";

String IPAD = "192.168.1.1";    //在AP和STA模式下存储ESP32的IP地址
String ssid = "HAHASDCARD";     //wifi名称
String password = "333444555";  //wifi密码（注意WiFi密码位数不要小于8位）
char channel = 1;               //wifi信道
char* txt[1] = {
  "/配置/mywifi.txt",
};

char* wifissid[40];
int wifiNum = 4;
char wifiSsid[10][64] = {};
char wifiPassword[10][64] = {};
bool wifi_isok = 0;

String foldPath = "/";
TaskHandle_t Task_Server;  //第1核心任务
int FirstWebis = 1;

long long totalstorage = 0;
long long storage = 0;
char buff[20] = {};
char buff2[20] = {};

void setup() {
  setCpuFrequencyMhz(240);  //CPU频率变为240MHz
  Serial.begin(115200);     // 启动串口通讯
  while (!hasSD) {
    if (!SD_MMC.begin("/sdcard", ONE_BIT_MODE))  //SD卡初始化
    {
      Serial.println("内存卡初始化失败");
      return;
    } else {
      hasSD = true;
    }
    if (hasSD) {
      readFile3(SD_MMC, "/配置/password.txt");  //读取保存的AP名称和密码
      readFile4(SD_MMC, txt[0]);                //读取保存的wifi名称和密码
      readConfig(SD_MMC);                       //配置文件
    }
  }
}

void loop(void) {
  xTaskCreatePinnedToCore(task_server, "Task_Server", 40960, NULL, 1, &Task_Server, 1);  //创建第1核心服务器任务
  vTaskDelete(NULL);
}

//第1核心任务
void task_server(void* pvParameters) {
  while (1) {
    server_wifista();
    server_ap();
  }
}
