from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def test():
    return jsonify({'message': 'Hello, World!'}), 200