from flask import Flask, request, render_template, redirect

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/foretag')
def foretag():
    return redirect('https://docs.google.com/forms/d/e/1FAIpQLSfqnMtyUMAc4IPxwAKdv5vKGR-PLam4XMqNwWQVyL9cl_Pt5w/closedform', code=302)

@app.route('/industry')
def industry():
    return redirect('https://docs.google.com/forms/d/e/1FAIpQLSe_UJAnD-3Anweftecf3iOo_MBLLuLt1bBMHqI5bGNYFk90BQ/closedform', code=302)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
