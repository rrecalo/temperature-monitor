# IoT Temperature and Humidity Monitor Web Interface
A web interface for displaying live IoT sensor data (<1 min old)

### Built With
[![My Skills](https://skillicons.dev/icons?i=react,tailwind,aws)](https://skillicons.dev)

### A concise breakdown of the IoT data pipeline
1. Sensor data is read from a DHT11 Temperature and Humidity sensor using an Espressif32 microcontroller and relayed to AWS IoT core using MQTT protocol over WiFi.
2. AWS IoT core rules forward the published MQTT message to an AWS S3 bucket
3. Web app fetches latest data from S3 using AWS Amplify Storage API
