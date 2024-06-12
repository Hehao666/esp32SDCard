#include "FS.h"
#include "SD_MMC.h"
#include <WebServer.h>

String formatBytes(size_t bytes);
void listDir(fs::FS &fs, const char * dirname, uint8_t levels);
char deleteFile(fs::FS &fs, const char * path);
char deleteFold(fs::FS &fs, const char * path);
char renameFold(fs::FS &fs, const char * path1, const char * path2);
char writeFile(fs::FS &fs, const char * path, const char * message);
char String2Char(char *str);
void readFile(fs::FS &fs, const char *path);
void appendFile(fs::FS &fs, const char *path, const char *message);
void testFileIO(fs::FS &fs, const char *path);
