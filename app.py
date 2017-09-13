import flask
from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def index():
	return flask.render_template("index.html")

@app.route("/epc")
def epc():
	return flask.redirect("https://goo.gl/forms/yaSxeVi0EoFXYtYj1", code=302)

@app.route("/visma")
def visma():
	return flask.redirect("https://goo.gl/forms/fvXTY7HovErr8WxA2", code=302)

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)