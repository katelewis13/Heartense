import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime, timedelta

# Uncomment the dotenv import if you want to run this locally
# ------------------------------------------------------------
# from dotenv import load_dotenv
# load_dotenv()

host = MongoClient(os.environ.get("MONGO_HOST"))
db = host[os.environ.get("MONGO_DB")]
collection = db[os.environ.get("MONGO_COLLECTION")]

app = Flask(__name__)
CORS(app)

@app.route('/api/sensor/data', methods=['GET'])
def getSensorData():
    
    today = datetime.now().date()

    start_time = datetime.combine(today, datetime.min.time()) + timedelta(hours=10)
    end_time = datetime.combine(today, datetime.min.time()) + timedelta(hours=11)

    query = {
        "timefield": {
            "$gte": start_time,
            "$lte": end_time
        }
    }

    results = collection.find(query)
    docs = list(results)
    docs.sort(key=lambda x: x["timefield"])

    interval_duration = 30

    earliest = docs[0]["timefield"]
    latest = docs[-1]["timefield"]

    interval_start = datetime(earliest.year, earliest.month, earliest.day, earliest.hour, earliest.minute)
    interval_end = interval_start + timedelta(seconds=interval_duration)

    reformated_records_to_return = []

    while (interval_start < latest):
        # Get all the records that fall within the current interval
        current_interval_values = []
        people_accounted_for = []
        
        for record in docs:
            if record["timefield"] >= interval_start and record["timefield"] < interval_end and record["name"] not in people_accounted_for:
                current_interval_values.append(
                    {
                        record["name"]: {
                            "heart_rate": record["heart_rate"],
                            "blood_oxygen": record["blood_ox"]
                        }
                    })
                people_accounted_for.append(record["name"])
        
        period_dict = { "recorded_on": interval_start }

        for person_data in current_interval_values:
                period_dict.update(person_data)

        reformated_records_to_return.append(period_dict)

        interval_start = interval_end
        interval_end = interval_start + timedelta(seconds=interval_duration)

    return jsonify(reformated_records_to_return), 200
    

@app.route('/api/actuator/colour', methods=['GET'])
def dummyColourData():
    data = [
        {
            "Bryce": {
                "colourHeartHigh":[205, 16, 209],
                "colourHeartLow":[78, 199, 45],
                "colourOxHigh":[132, 68, 255],
                "colourOxLow":[21, 144, 189],
                },
            "Kate": {
                "colourHeartHigh":[205, 16, 209],
                "colourHeartLow":[78, 199, 45],
                "colourOxHigh":[132, 68, 255],
                "colourOxLow":[21, 144, 189],
                },
            "Aidyn": {
                "colourHeartHigh":[205, 16, 209],
                "colourHeartLow":[78, 199, 45],
                "colourOxHigh":[132, 68, 255],
                "colourOxLow":[21, 144, 189],
                },
            "Yagumi": {
                "colourHeartHigh":[205, 16, 209],
                "colourHeartLow":[78, 199, 45],
                "colourOxHigh":[132, 68, 255],
                "colourOxLow":[21, 144, 189],
                },
            "Varad": {
                "colourHeartHigh":[205, 16, 209],
                "colourHeartLow":[78, 199, 45],
                "colourOxHigh":[132, 68, 255],
                "colourOxLow":[21, 144, 189],
                }
        }]
    return jsonify(data), 200

@app.route('/api/actuator/colour', methods=['POST'])
def colour():
    person = request.json.get('key')
    colour = request.json.get('value')

    if colour is None or person is None:
        return jsonify({'error': 'Missing key or value'}), 400


    return jsonify({'message': 'Setting updated'}), 200


@app.route("/api/search", methods=["POST"])
def search():
    data = request.get_json()

    start_date = data.get("start", None)
    end_date = data.get("end", None)

    query = {}
    if start_date or end_date:
        query["recorded_on"] = {}
        if start_date:
            query["recorded_on"]["$gte"] = start_date
        if end_date:
            query["recorded_on"]["$lte"] = end_date

    app.logger.info(query)

    cursor = collection.find(query)
    docs = list(cursor)

    # Sort the docs based on the 'recorded_on' field
    docs.sort(key=lambda x: x["recorded_on"])

    interval_duration = 30

    current_interval_start = datetime.fromisoformat(docs[0]["recorded_on"])
    current_interval_values = {}
    mean_values = []

    for record in docs:
        recorded_on = datetime.fromisoformat(record["recorded_on"])
        user = record["user"]

        # Calculate the rounded timestamp to the nearest 30 seconds
        rounded_timestamp = recorded_on - timedelta(
            seconds=recorded_on.second % interval_duration
        )

        # Check if the current record falls within the current interval
        if (user, rounded_timestamp) not in current_interval_values:
            current_interval_values[(user, rounded_timestamp)] = []

        current_interval_values[(user, rounded_timestamp)].append(record)

    # Calculate the mean values for each interval
    for interval, records in current_interval_values.items():
        user, rounded_timestamp = interval
        mean_heart_rate = sum(record["heart_rate"] for record in records) / len(records)
        mean_blood_oxygen = sum(record["blood_oxygen"] for record in records) / len(
            records
        )
        mean_values.append(
            {
                "recorded_on": rounded_timestamp.isoformat(),
                "user": user,
                "heart_rate": mean_heart_rate,
                "blood_oxygen": mean_blood_oxygen,
            }
        )

    return jsonify(mean_values)