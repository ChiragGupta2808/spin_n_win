from flask import Flask, Response, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db = MongoEngine(app)

@app.route('/spin_form', methods=['POST'])
def spin_api():
    content = request.get_json()
    name = content['name']
    mobile = content['mobile']
    email = content['email']
    if name and mobile and email:
        return jsonify({"success": 1, "message": "Data Submitted", "data": {}})
    else:
        return jsonify({"success": 2, "message": "Fill details", "data": {}})

if __name__ == "__main__":
	app.run(debug=True)
