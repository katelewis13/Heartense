from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/sensor/data', methods=['GET'])
def dummyData():

    data = [
        {
            "timestamp": "2023-05-31T12:30:00",
            "Bryce": {
                "heart_rate": 79.1,
                "blood_oxygen": 94.0
            },
            "Kate": {
                "heart_rate": 96.1,
                "blood_oxygen": 96.7
            },
            "Aidyn": {
                "heart_rate": 96.6,
                "blood_oxygen": 97.9
            },
            "Yagumi": {
                "heart_rate": 92.2,
                "blood_oxygen": 90.9
            },
            "Varad": {
                "heart_rate": 70.0,
                "blood_oxygen": 91.1
            }
        },
        {
            "timestamp": "2023-05-31T12:30:30",
            "Bryce": {
                "heart_rate": 71.8,
                "blood_oxygen": 97.2
            },
            "Kate": {
                "heart_rate": 92.3,
                "blood_oxygen": 96.0
            },
            "Aidyn": {
                "heart_rate": 90.7,
                "blood_oxygen": 95.5
            },
            "Yagumi": {
                "heart_rate": 85.7,
                "blood_oxygen": 96.9
            },
            "Varad": {
                "heart_rate": 74.5,
                "blood_oxygen": 90.5
            }
        },
        {
            "timestamp": "2023-05-31T12:31:00",
            "Bryce": {
                "heart_rate": 72.7,
                "blood_oxygen": 97.7
            },
            "Kate": {
                "heart_rate": 91.8,
                "blood_oxygen": 93.8
            },
            "Aidyn": {
                "heart_rate": 97.3,
                "blood_oxygen": 95.5
            },
            "Yagumi": {
                "heart_rate": 91.2,
                "blood_oxygen": 90.7
            },
            "Varad": {
                "heart_rate": 67.8,
                "blood_oxygen": 94.6
            }
        },
        {
            "timestamp": "2023-05-31T12:31:30",
            "Bryce": {
                "heart_rate": 68.7,
                "blood_oxygen": 91.0
            },
            "Kate": {
                "heart_rate": 94.5,
                "blood_oxygen": 94.4
            },
            "Aidyn": {
                "heart_rate": 91.4,
                "blood_oxygen": 91.6
            },
            "Yagumi": {
                "heart_rate": 92.4,
                "blood_oxygen": 95.0
            },
            "Varad": {
                "heart_rate": 73.5,
                "blood_oxygen": 92.5
            }
        },
        {
            "timestamp": "2023-05-31T12:32:00",
            "Bryce": {
                "heart_rate": 65.5,
                "blood_oxygen": 91.6
            },
            "Kate": {
                "heart_rate": 93.4,
                "blood_oxygen": 94.0
            },
            "Aidyn": {
                "heart_rate": 98.6,
                "blood_oxygen": 99.5
            },
            "Yagumi": {
                "heart_rate": 97.0,
                "blood_oxygen": 93.7
            },
            "Varad": {
                "heart_rate": 70.2,
                "blood_oxygen": 98.7
            }
        },
        {
            "timestamp": "2023-05-31T12:32:30",
            "Bryce": {
                "heart_rate": 69.2,
                "blood_oxygen": 96.5
            },
            "Kate": {
                "heart_rate": 88.5,
                "blood_oxygen": 97.9
            },
            "Aidyn": {
                "heart_rate": 98.0,
                "blood_oxygen": 100.0
            },
            "Yagumi": {
                "heart_rate": 100,
                "blood_oxygen": 99.2
            },
            "Varad": {
                "heart_rate": 65.8,
                "blood_oxygen": 91.6
            }
        },
        {
            "timestamp": "2023-05-31T12:33:00",
            "Bryce": {
                "heart_rate": 70.4,
                "blood_oxygen": 97.7
            },
            "Kate": {
                "heart_rate": 93.3,
                "blood_oxygen": 94.7
            },
            "Aidyn": {
                "heart_rate": 100,
                "blood_oxygen": 93.4
            },
            "Yagumi": {
                "heart_rate": 100,
                "blood_oxygen": 94.0
            },
            "Varad": {
                "heart_rate": 60.4,
                "blood_oxygen": 94.7
            }
        },
        {
            "timestamp": "2023-05-31T12:33:30",
            "Bryce": {
                "heart_rate": 75.5,
                "blood_oxygen": 92.6
            },
            "Kate": {
                "heart_rate": 84.5,
                "blood_oxygen": 97.4
            },
            "Aidyn": {
                "heart_rate": 93.8,
                "blood_oxygen": 96.8
            },
            "Yagumi": {
                "heart_rate": 99.9,
                "blood_oxygen": 91.2
            },
            "Varad": {
                "heart_rate": 64.8,
                "blood_oxygen": 92.1
            }
        },
        {
            "timestamp": "2023-05-31T12:34:00",
            "Bryce": {
                "heart_rate": 78.7,
                "blood_oxygen": 99.0
            },
            "Kate": {
                "heart_rate": 92.6,
                "blood_oxygen": 96.4
            },
            "Aidyn": {
                "heart_rate": 99.0,
                "blood_oxygen": 96.2
            },
            "Yagumi": {
                "heart_rate": 100,
                "blood_oxygen": 91.3
            },
            "Varad": {
                "heart_rate": 70.9,
                "blood_oxygen": 93.5
            }
        },
        {
            "timestamp": "2023-05-31T12:34:30",
            "Bryce": {
                "heart_rate": 81.1,
                "blood_oxygen": 90.6
            },
            "Kate": {
                "heart_rate": 94.1,
                "blood_oxygen": 98.5
            },
            "Aidyn": {
                "heart_rate": 98.8,
                "blood_oxygen": 98.1
            },
            "Yagumi": {
                "heart_rate": 94.6,
                "blood_oxygen": 98.7
            },
            "Varad": {
                "heart_rate": 73.1,
                "blood_oxygen": 94.9
            }
        }
    ]
    return jsonify(data), 200

@app.route('/api/actuator/colour', methods=['GET'])
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

@app.route('/api/actuator/colour', methods=['POST'])
def colour():
    person = request.json.get('key')
    colour = request.json.get('value')

    if colour is None or person is None:
        return jsonify({'error': 'Missing key or value'}), 400


    return jsonify({'message': 'Setting updated'}), 200