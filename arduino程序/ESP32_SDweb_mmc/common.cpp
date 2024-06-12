#include "common.h"

extern WebServer esp32_server;

//计算文件大小
String formatBytes(size_t bytes) {
  if (bytes < 1024) {
    return String(bytes) + "B";
  } else if (bytes < (1024 * 1024)) {
    return String(bytes / 1024.0) + "KB";
  } else if (bytes < (1024 * 1024 * 1024)) {
    return String(bytes / 1024.0 / 1024.0) + "MB";
  } else {
    return String(bytes / 1024.0 / 1024.0 / 1024.0) + "GB";
  }
}


void listDir(fs::FS &fs, const char *dirname, uint8_t levels) {
  // Serial.printf("Listing directory: %s\n", dirname);

  File root = fs.open(dirname);
  if (!root) {
    // Serial.println("Failed to open directory");
    return;
  }
  if (!root.isDirectory()) {
    // Serial.println("Not a directory");
    return;
  }

  File file = root.openNextFile();
  while (file) {
    if (file.isDirectory()) {
      // Serial.print("  DIR : ");
      // Serial.println(file.name());
      if (levels) {
        listDir(fs, file.name(), levels - 1);
      }
    } else {
      // Serial.print("  FILE: ");
      // Serial.print(file.name());
      // Serial.print("  SIZE: ");
      // Serial.println(file.size());
    }
    file = root.openNextFile();
  }
}

char deleteFile(fs::FS &fs, const char *path) {
  // Serial.printf("Deleting file: %s\n", path);
  if (fs.remove(path)) {
    return 1;
  } else {
    return 0;
  }
}
char deleteFold(fs::FS &fs, const char *path) {
  // Serial.printf("Deleting file: %s\n", path);
  if (fs.rmdir(path)) {
    return 1;
  } else {
    return 0;
  }
}
char renameFold(fs::FS &fs, const char *path1, const char *path2) {
  // Serial.printf("Deleting file: %s\n", path);
  if (fs.rename(path1, path2)) {
    Serial.println("文件名称修改成功！");
    return 1;
  } else {
    Serial.println("重命名失败！");
    return 0;
  }
}

char writeFile(fs::FS &fs, const char *path, const char *message) {
  File file = fs.open(path, FILE_WRITE);
  if (!file) {
    return 0;
  }
  if (file.print(message)) {
    return 1;
  } else {
    return 0;
  }
  file.close();
}

//字符串转数字
char String2Char(char *str) {
  char flag = '+';  //指示结果是否带符号
  long res = 0;

  if (*str == '-')  //字符串带负号
  {
    ++str;       //指向下一个字符
    flag = '-';  //将标志设为负号
  }
  //逐个字符转换，并累加到结果res
  while (*str >= 48 && *str <= 57)  //如果是数字才进行转换，数字0~9的ASCII码：48~57
  {
    res = 10 * res + *str++ - 48;  //字符'0'的ASCII码为48,48-48=0刚好转化为数字0
  }

  if (flag == '-')  //处理是负数的情况
  {
    res = -res;
  }

  return (char)res;
}

void readFile(fs::FS &fs, const char *path) {
  Serial.printf("Reading file: %s\r\n", path);

  File file = fs.open(path);
  if (!file || file.isDirectory()) {
    Serial.println("- failed to open file for reading");
    return;
  }

  Serial.println("- read from file:");
  while (file.available()) {
    Serial.write(file.read());
  }
  file.close();
}

void appendFile(fs::FS &fs, const char *path, const char *message) {
  Serial.printf("Appending to file: %s\r\n", path);

  File file = fs.open(path, FILE_APPEND);
  if (!file) {
    Serial.println("- failed to open file for appending");
    return;
  }
  if (file.print(message)) {
    Serial.println("- message appended");
  } else {
    Serial.println("- append failed");
  }
  file.close();
}

void testFileIO(fs::FS &fs, const char *path) {
  Serial.printf("Testing file I/O with %s\r\n", path);

  static uint8_t buf[512];
  size_t len = 0;
  File file = fs.open(path, FILE_WRITE);
  if (!file) {
    Serial.println("- failed to open file for writing");
    return;
  }

  size_t i;
  Serial.print("- writing");
  uint32_t start = millis();
  for (i = 0; i < 2048; i++) {
    if ((i & 0x001F) == 0x001F) {
      Serial.print(".");
    }
    file.write(buf, 512);
  }
  Serial.println("");
  uint32_t end = millis() - start;
  Serial.printf(" - %u bytes written in %lu ms\r\n", 2048 * 512, end);
  file.close();
  String jsonResponse = "{\"writtenBytes\": " + String(2048 * 512) + ", \"writeTime\": " + String(end);
  file = fs.open(path);
  start = millis();
  end = start;
  i = 0;
  if (file && !file.isDirectory()) {
    len = file.size();
    size_t flen = len;
    start = millis();
    Serial.print("- reading");
    while (len) {
      size_t toRead = len;
      if (toRead > 512) {
        toRead = 512;
      }
      file.read(buf, toRead);
      if ((i++ & 0x001F) == 0x001F) {
        Serial.print(".");
      }
      len -= toRead;
    }
    Serial.println("");
    end = millis() - start;
    Serial.printf("- %u bytes read in %lu ms\r\n", flen, end);
    jsonResponse += ",\"readBytes\": " + String(flen) + ", \"readTime\": " + String(end) + "}";
    file.close();
  } else {
    Serial.println("- failed to open file for reading");
  }
  deleteFile(SD_MMC, "/test.txt");
  Serial.println(jsonResponse);
  esp32_server.send(200, "application/json", jsonResponse);  // 发送完整的JSON响应
}