#include "common.h"
#include <WebServer.h>

void listaudio();
String listaudioDir(fs::FS &fs, const char * dirname);
String getContentType(String filename);
void handleAudioRequest(String path);
String URLDecode(String url);
char hexToDec(char hex);