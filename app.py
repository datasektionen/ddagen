import flask
from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def index():
	return flask.render_template("index.html")

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)