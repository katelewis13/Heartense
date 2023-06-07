db.createCollection("sensors");
db.sensors.insertMany([
  {
    recorded_on: "2023-06-07T12:19:30Z",
    user: "kate",
    heart_rate: 107,
    blood_oxygen: 58
  },
  {
    recorded_on: "2023-06-07T12:20:00Z",
    user: "kate",
    heart_rate: 107,
    blood_oxygen: 58
  },
  {
    recorded_on: "2023-06-07T12:20:30Z",
    user: "kate",
    heart_rate: 107,
    blood_oxygen: 58
  },
  {
    recorded_on: "2023-06-07T12:19:35Z",
    user: "bryce",
    heart_rate: 107,
    blood_oxygen: 58
  },
  {
    recorded_on: "2023-06-07T12:20:05Z",
    user: "bryce",
    heart_rate: 107,
    blood_oxygen: 58
  },
  {
    recorded_on: "2023-06-07T12:20:35Z",
    user: "bryce",
    heart_rate: 107,
    blood_oxygen: 58
  },
]);
