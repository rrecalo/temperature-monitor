# IoT Temperature and Humidity Monitor Web Interface
A web interface for displaying live IoT sensor data (<1 min old)

[Live Deploy](https://master.d3tgy8y41907fm.amplifyapp.com/)
### Built With
[![My Skills](https://skillicons.dev/icons?i=react,tailwind,aws)](https://skillicons.dev)

### A concise breakdown of the IoT data pipeline
1. Sensor data is read from a DHT11 Temperature and Humidity sensor using an Espressif32 microcontroller and relayed to AWS IoT core using MQTT protocol over WiFi.
2. AWS IoT core rules forward the published MQTT message to an AWS DynamoDB table
3. Web app fetches latest data from DynamoDB using AWS Amplify API and graphql
<img src="https://github.com/rrecalo/temperature-monitor/assets/103965989/632db0a0-a008-490c-a33a-548c47484c5d" height=500/>
<img src="https://github.com/rrecalo/temperature-monitor/assets/103965989/14844569-2f3e-45e4-a2ad-249b1d8c7abd" height=500/>
<img src="https://github.com/rrecalo/temperature-monitor/assets/103965989/96adc520-59d2-4826-a2b8-9bff1f296134" height=500/>
