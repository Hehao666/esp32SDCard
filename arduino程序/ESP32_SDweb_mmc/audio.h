#include "common.h"
#include <WebServer.h>

void listaudio();
String listaudioDir(fs::FS &fs, const char * dirname);
String getContentType(String filename);
String URLDecode(String url);
char hexToDec(char hex);