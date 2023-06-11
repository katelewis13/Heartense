from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/sensor/data', methods=['GET'])
def dummyData():

    data = [
        {
            "recorded_on": "2023-05-31T12:30:00",
            "Bryce": 79.1,
            "Kate": 96.1,
            "Aidyn": 96.6,
            "Yagumi": 92.2,
            "Varad": 70.0
        },
        {
            "recorded_on": "2023-05-31T12:30:30",
            "Bryce": 71.8,
            "Kate": 92.3,
            "Aidyn": 90.7,
            "Yagumi": 85.7,
            "Varad": 74.5
        },
        {
            "recorded_on": "2023-05-31T12:31:00",
            "Bryce": 72.7,
            "Kate": 91.8,
            "Aidyn": 97.3,
            "Yagumi": 91.2,
            "Varad": 67.8
        },
        {
            "recorded_on": "2023-05-31T12:31:30",
            "Bryce": 68.7,
            "Kate": 94.5,
            "Aidyn": 91.4,
            "Yagumi": 92.4,
            "Varad": 73.5
        },
        {
            "recorded_on": "2023-05-31T12:32:00",
            "Bryce": 65.5,
            "Kate": 93.4,
            "Aidyn": 98.6,
            "Yagumi": 97.0,
            "Varad": 70.2
        },
        {
            "recorded_on": "2023-05-31T12:32:30",
            "Bryce": 69.2,
            "Kate": 88.5,
            "Aidyn": 98.0,
            "Yagumi": 100,
            "Varad": 65.8
        },
        {
            "recorded_on": "2023-05-31T12:33:00",
            "Bryce": 70.4,
            "Kate": 93.3,
            "Aidyn": 100,
            "Yagumi": 100,
            "Varad": 60.4
        },
        {
            "recorded_on": "2023-05-31T12:33:30",
            "Bryce": 75.5,
            "Kate": 84.5,
            "Aidyn": 93.8,
            "Yagumi": 99.9,
            "Varad": 64.8
        },
        {
            "recorded_on": "2023-05-31T12:34:00",
            "Bryce": 78.7,
            "Kate": 92.6,
            "Aidyn": 99.0,
            "Yagumi": 100,
            "Varad": 70.9
        },
        {
            "recorded_on": "2023-05-31T12:34:30",
            "Bryce": 81.1,
            "Kate": 94.1,
            "Aidyn": 98.8,
            "Yagumi": 94.6,
            "Varad": 73.1
        }
    ]
    return jsonify(data), 200

@app.route('/actuator/colour', methods=['GET'])
def dummyColourData():
    data = [
        {
            "Bryce": {
                "colourHeartHigh":[123, 213, 115],
                "colourHeartLow":[123, 213, 115],
                "colourOxHigh":[123, 213, 115],
                "colourOxLow":[123, 213, 115],
                },
            "Kate": {
                "colourHeartHigh":[123, 213, 115],
                "colourHeartLow":[123, 213, 115],
                "colourOxHigh":[123, 213, 115],
                "colourOxLow":[123, 213, 115],
                },
            "Aidyn": {
                "colourHeartHigh":[123, 213, 115],
                "colourHeartLow":[123, 213, 115],
                "colourOxHigh":[123, 213, 115],
                "colourOxLow":[123, 213, 115],
                },
            "Yagumi": {
                "colourHeartHigh":[123, 213, 115],
                "colourHeartLow":[123, 213, 115],
                "colourOxHigh":[123, 213, 115],
                "colourOxLow":[123, 213, 115],
                },
            "Varad": {
                "colourHeartHigh":[123, 213, 115],
                "colourHeartLow":[123, 213, 115],
                "colourOxHigh":[123, 213, 115],
                "colourOxLow":[123, 213, 115],
                }
        }]
    return jsonify(data), 200

@app.route('/actuator/colour', methods=['POST'])
def colour():
    person = request.json.get('key')
    colour = request.json.get('value')

    if colour is None or person is None:
        return jsonify({'error': 'Missing key or value'}), 400


    return jsonify({'message': 'Setting updated'}), 200