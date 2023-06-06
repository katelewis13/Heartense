from flask import Flask, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)


@app.route('/')
@cross_origin()
def test():
    return jsonify({'message': 'Hello, World!'}), 200