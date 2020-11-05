from flask import Flask, request, render_template, redirect, send_from_directory, make_response
#from scrape import *


app = Flask(__name__)


@app.route('/')
def index():
    language = request.args.get('language')
  
    if language == 'en':
        return render_template('EN/index.html')
    else:
        return render_template('SV/index.html')

"""

@app.route("/get_counter")
def count():
    return str(get_count())

"""
@app.route('/companies')
def companies():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/companies.html')
    else:
        return render_template('SV/companies.html')

@app.route('/event')
@app.route('/events')
def events():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/events.html')
    else:
        return render_template('SV/events.html')

@app.route('/sittningen')
def sittningen():
    return redirect(
        'https://docs.google.com/forms/d/e/1FAIpQLSerDQ213eHNUAp8CYKFohniv17-hb9W0QT9qMQtkK09ZvVaig/viewform',
        code=302)

@app.route('/karta')
@app.route('/visitors')
def visitors():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/visitors.html')
    else:
        return render_template('SV/visitors.html')


@app.route('/contact')
def contact():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/contact.html')
    else:
        return render_template('SV/contact.html')


@app.route('/faq')
def faq():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/faq.html')
    else:
        return render_template('SV/faq.html')


@app.route('/huvudsponsor')
def huvudsponsor():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/huvudsponsor.html')
    else:
        return render_template('SV/huvudsponsor.html')

@app.route('/katalog')
@app.route('/katalog2019')
def katalog2019():
    return redirect(
        'https://static.datasektionen.se/naringsliv/d-dagen/katalog_2019',
        code=302)

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
        'https://docs.google.com/forms/d/e/1FAIpQLSe4vMqA_BJcwH8haK79M0WyVDtGGebiSF-DR1pTmXgvFez6zw/viewform',
        code=302)


@app.route('/industry')
def industry():
    return redirect(
        'https://docs.google.com/forms/d/e/1FAIpQLSdjSG917dUM8OlFXhPNqb_XwF7hAEdZEjhckz2QcWK8kwJCJA/viewform',
        code=302)


@app.route("/survey")
def survey():
    return redirect('https://forms.gle/aFVS3WFJcHW1NuJq9', code=302)


@app.route("/fairform")
def fairform():
    return redirect('https://docs.google.com/forms/d/e/1FAIpQLSdNFAajJVoABRuuevItMI4BYtz_pGgfv0NUNATKVpmk8FeStw'
                    '/viewform?usp=sf_link', code=302)


@app.route("/adform")
def adform():
    return redirect('https://docs.google.com/forms/d/e/1FAIpQLSf6nzrK90GzsuttVVK5O0iR9Kzls8MQy3t6fnGtHyVnhgND6A'
                    '/viewform?usp=sf_link', code=302)


@app.route("/claimbanquet")
def claim_banquet_tickets():
    return redirect('https://forms.gle/AmCwxs8rRSAuSNSZ9', code=302)


@app.route("/2020")
def interest_ddagen2020():
    """ Redirect to application of interest for D-Dagen 2020 in swedish """
    return redirect('https://forms.gle/pMMGNaQXVWYtAGga7', code=302)


@app.route("/2020en")
def interest_ddagen2020en():
    """ Redirect to application of interest for D-Dagen 2020 in english """
    return redirect('https://forms.gle/YHN4tJQxKvKMqHaZ7', code=302)

@app.route("/competition-true-false")
def comp_true_false():
    return redirect('https://forms.gle/39kpBCiX6nBBv4SW7', code=302)

@app.route("/competition-ericsson")
def comp_ericsson():
    return redirect('https://www.facebook.com/kongligddagen/posts/1430321623820394', code=302)

@app.route("/competition-chat")
def comp_chat():
    return redirect('https://forms.gle/tYZay2SS6E6obRP26', code=302)

@app.route("/goodiebag")
def goodiebag():
    return redirect('https://forms.gle/rSDaiVnUYwNu3DKo9', code=302)

@app.route("/map", methods=["GET"])
def map():
        return send_from_directory("static/map", "map.html")

@app.route("/static/map/favicon.ico")
def favicon():
        return send_from_directory('static/icons', 'favicon.ico')

@app.route("/sok")
def sok():
     """ Redirect to application of working at the fair for D-Dagen 2020"""
     return redirect('https://docs.google.com/forms/d/e/1FAIpQLSd9sB8SIFN_X1XlkoLHE2mem8HFgryaY8wBFLb29_fBQV7C9g/viewform?usp=sf_link', code=302)


@app.route('/apply')
def apply():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/apply.html')
    else:
        return render_template('SV/apply.html')

### Redirects to event forms ###
@app.route("/cvevent")
def cvevent():
    """ Redirect to application for CV event with Sveriges Ingenjörer (lunch lecture)"""
    return redirect('https://forms.gle/6dJ7aHafJDWeJ1MN9', code=302)

@app.route("/yelp")
def yelp():
    """ Redirect to application for Yelp lunch lecture"""
    return redirect('https://forms.gle/YrBmj5p7UoUTgGLp6', code=302)

@app.route("/kontaktsamtal")
def kontaktsamtal():
    """ Redirect to application for Yelp lunch lecture"""
    return redirect('https://forms.gle/5GwZmujpfDivBAXk6', code=302)

@app.route("/epc")
def epc():
    """ Redirect to application for Yelp lunch lecture"""
    return redirect('https://forms.gle/61owvsn7ceWZ6TdZ8', code=302)

### Error handlers ###

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
