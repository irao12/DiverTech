from flask import Flask, request, jsonify
from scrape import get_default_jobs, get_jobs

app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World", 201


@app.route("/opportunities", methods=["GET"])
def returnDefaultOpportunities():
    if (request.method == "GET"):
        obtainedOpportunities = get_default_jobs()
        result = jsonify(obtainedOpportunities)
        return result, 201


@app.route("/opportunities/search", methods=["GET"])
def returnListings():
    if (request.method == "GET"):
        data = request.json
        obtainedListings = get_jobs([])
        result = jsonify({'content': obtainedListings})
        print(result)
        return result, 201


if __name__ == '__main__':
    app.run(debug=True)
