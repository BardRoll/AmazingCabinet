#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <string.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define ssid "realme narzo 30A"
#define password "13bb425d1ab9"

#define mqtt_server "broker.emqx.io"
#define mqtt_port 1883
#define mqtt_user ""
#define mqtt_password ""
#define mqtt_name "test_mqtt"

WiFiClient espClient; // Initial client instance
PubSubClient client(espClient);
LiquidCrystal_I2C lcd(0x27, 16, 2);

void Connect_Wifi();

void setup() {
  Serial.begin(115200);
  
  /* Connect to WiFi */
  Connect_Wifi();

  /* MQTT setup */
  client.setServer(mqtt_server, mqtt_port); 
  client.setCallback(callback);
  if(client.connect(mqtt_name,mqtt_user,mqtt_password)){
      client.subscribe("/cabinet");
  }else{
      Serial.println("failed");
  }

}

void loop() {
  // String json;
  // DynamicJsonDocument doc(2048);
  // doc["cabinet"] = 2;
  // serializeJson(doc, json);
  // const char *json_char = json.c_str();
  client.loop();
}

void Connect_Wifi(){
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.print("OK! IP=");
    Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length){
  Serial.print("Message arrived [");
  Serial.print(topic); //ใน mqtx ต้องใส่ชื่อ topic ในช่อง topic
  Serial.print("] ");
  DynamicJsonDocument doc(2048);
  deserializeJson(doc, payload);
  String cabinet1 = doc["cabinet1"];
  Serial.print("cabinet1 : ");
  Serial.println(cabinet1);
  String cabinet2 = doc["cabinet2"];
  Serial.print("cabinet2 : ");
  Serial.println(cabinet2);

  /* start LCD */
  lcd.begin();
  lcd.backlight();
  lcd.setCursor(0, 0);  
  lcd.print("carbinet 1 = ");
  lcd.setCursor(11, 0);
  lcd.print(cabinet1);
  lcd.setCursor(0,1);
  lcd.print("carbinet 2 = ");
  lcd.print(cabinet2);
}
