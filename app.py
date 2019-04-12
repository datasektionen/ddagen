from flask import Flask, request, render_template, redirect

app = Flask(__name__)


@app.route('/')
def index():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/index.html')
    else:
        return render_template('SV/index.html')


@app.route('/companies')
def companies():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/companies.html')
    else:
        return render_template('SV/companies.html')


@app.route('/visitors')
def visitors():
    # TODO Add visitors page
    return render_template('SV/index.html')


@app.route('/contact')
def contact():
    # TODO Add contact page
    return render_template('SV/contact.html')


@app.route('/faq')
def faq():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/faq.html')
    else:
        return render_template('SV/faq.html')


@app.route('/katalog2018')
def katalog2018():
    return redirect(
        'https://static.datasektionen.se/naringsliv/d-dagen/katalog_2018',
        code=302)


@app.route('/katalog2017')
def katalog2017():
    return redirect(
        'https://static.datasektionen.se/naringsliv/d-dagen/katalog_2017',
        code=302)


@app.route('/katalog2016')
def katalog2016():
    return redirect(
        'https://static.datasektionen.se/naringsliv/d-dagen/katalog_2016',
        code=302)


@app.route('/katalog2015')
def katalog2015():
    return redirect(
        'https://static.datasektionen.se/naringsliv/d-dagen/katalog_2015',
        code=302)


@app.route('/foretag')
def foretag():
    return redirect(
        'https://docs.google.com/forms/d/e/1FAIpQLSfqnMtyUMAc4IPxwAKdv5vKGR-PLam4XMqNwWQVyL9cl_Pt5w/closedform',
        code=302)


@app.route('/industry')
def industry():
    return redirect(
        'https://docs.google.com/forms/d/e/1FAIpQLSe_UJAnD-3Anweftecf3iOo_MBLLuLt1bBMHqI5bGNYFk90BQ/closedform',
        code=302)


@app.route("/survey")
def survey():
    return redirect('https://goo.gl/forms/TxOWfvzxPfI9IH3Y2', code=302)


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
