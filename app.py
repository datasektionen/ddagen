import flask
from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def index():
	return flask.render_template("index.html")

@app.route("/sok")
def epc():
	return flask.redirect("https://docs.google.com/forms/d/e/1FAIpQLSeWdTma7qprNi-emaCIejwYhTpiSxHldbE7y_Yc_c0ri6S0Gg/viewform", code=302)

@app.route("/visma")
def visma():
	return flask.redirect("https://goo.gl/forms/fvXTY7HovErr8WxA2", code=302)

@app.route("/sittningen")
def sittning():
	return flask.redirect("https://docs.google.com/forms/d/e/1FAIpQLSdwurt5xIhaUo6Tr6vfd6wmz1GgEj-nZggcrRYMkxxekqyLcA/viewform", code=302)

@app.route("/yelp")
def yelp():
	return flask.redirect("https://goo.gl/forms/1WyVIE4BSL1RfQhh2", code=302)

@app.route("/katalog")
def kat():
	return flask.redirect(flask.url_for('static', filename='katalogen.pdf'), code=302)

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)