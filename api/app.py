from flask import Flask, request, jsonify
from scrape import get_default_jobs, get_jobs_indeed
from urllib.parse import unquote


app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World", 201


@app.route("/opportunities", methods=["GET"])
def returnDefaultOpportunities():
    # convert the args to a dictionary
    # args contains the query parameters
    args = request.args.to_dict()
    search = args["search"]
    page = args["page"]

    if (request.method == "GET"):
        obtainedOpportunities = None
        # if no search query was entered, get default jobs
        if (search == ""):
            obtainedOpportunities = get_default_jobs()
        # otherwise, search using the query parameters
        else:
            # decode from URL, separate the terms, and get jobs using the terms
            search_string = unquote(search)
            search_terms = search_string.split(" ")
            obtainedOpportunities = get_jobs_indeed(search_terms, page)
        result = jsonify(obtainedOpportunities)
        return result, 201


if __name__ == '__main__':
    app.run(debug=True)
