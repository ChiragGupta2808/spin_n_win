from flask import Flask, Response, request, jsonify, render_template
from flask_mongoengine import MongoEngine
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# mongodb+srv://Chiragmakes360:<Chirag@makes360>@cluster0.i4sxa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

db = MongoEngine(app)

@app.route('/', methods=['GET'])
def spin():
   return render_template('spinner.html')

@app.route('/spin-form', methods=['POST'])
def spin_api():
    content = request.get_json()
    name = content['name']
    mobile = content['mobile']
    email = content['email']
    if name and mobile and email:
        return jsonify({"success": 1, "message": "Data Submitted", "data": {}})
    return jsonify({"success": 0, "message": "Fill details", "data": {}})

if __name__ == "__main__":
	app.run(debug=True)
