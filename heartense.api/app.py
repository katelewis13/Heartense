import os
from datetime import datetime, timedelta

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd

host = MongoClient(os.environ.get("MONGO_HOST"))
db = host[os.environ.get("MONGO_DB")]
collection = db[os.environ.get("MONGO_COLLECTION")]

app = Flask(__name__)
CORS(app)


@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({"message": "Hello, World!"}), 200


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
