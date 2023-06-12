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
device_collection = db["Devices"]

app = Flask(__name__)
CORS(app)

@app.route('/api/sensor/data', methods=['GET'])
def getSensorData():
    
    today = datetime.now().date() - timedelta(days=1)

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
    

def hexToRgb(hexColour):
    hex_color = hexColour.lstrip('#')
    return [int(hex_color[i:i+2], 16) for i in (0, 2, 4)]


def rgb_to_hex(rgb):
    return "#{:02x}{:02x}{:02x}".format(*rgb)


@app.route('/api/actuator/colour', methods=['GET'])
def getColourData():
    results = device_collection.find({})
    docs = list(results)

    colourData = []
    for doc in docs:
        colourData.append({
            "name": doc["name"],
            "heart_rate_low": rgb_to_hex(doc["colourHeartLow"]),
            "heart_rate_high": rgb_to_hex(doc["colourHeartHigh"]),
            "blood_ox_low": rgb_to_hex(doc["colourOxLow"]),
            "blood_ox_high": rgb_to_hex(doc["colourOxHigh"])
        })

    return jsonify(colourData), 200


@app.route('/api/actuator/colour', methods=['POST'])
def updateColour():
    person = request.json.get('name')
    heart_rate_low = request.json.get('heart_rate_low')
    heart_rate_high = request.json.get('heart_rate_high')
    blood_ox_low = request.json.get('blood_oxygen_low')
    blood_ox_high = request.json.get('blood_oxygen_high')

    if person is None:
        return jsonify({'error': 'Missing key or value'}), 400

    updated_dict = {}

    if heart_rate_low is not None:
        updated_dict.update({ 'colourHeartLow': hexToRgb(heart_rate_low) })

    if heart_rate_high is not None:
        updated_dict.update({ 'colourHeartHigh': hexToRgb(heart_rate_high) })

    if blood_ox_low is not None:
        updated_dict.update({ 'colourOxLow': hexToRgb(blood_ox_low) })
    
    if blood_ox_high is not None:
        updated_dict.update({ 'colourOxHigh': hexToRgb(blood_ox_high) })

    if len(updated_dict) == 0:
        return jsonify({'error': 'Missing key or value'}), 400
        
    new_data = { "$set": updated_dict }
    device_collection.update_one({"name": person}, new_data)

    return jsonify({'message': 'Colour updated'}), 204

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)