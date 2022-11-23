from flask import Flask, request, render_template, redirect, send_from_directory, make_response, url_for
from werkzeug.routing import BaseConverter

# To add/modify entries in the top navigation bar, modify these two functions: getPagesSv and getPagesEn.
# The info will be used in layout.html to generate desktop and mobile navbars automatically.

def getPagesSv():
    return [
        ["Start", url_for('.index'), "nav-start"],
        ["Företag", url_for('info4visitors'), "nav-companies"],
        #["Event", url_for('event'), "nav-event"],
        ["Kontakta oss", url_for('contact'), "nav-contact"],
        ["Tidigare mässor", url_for('about'), "nav-about"]
    ]

def getPagesEn():
    return [
        ["Start", url_for('.index', language='en'), "nav-start"],
        ["Companies", url_for('info4visitors', language='en'), "nav-companies"],
        #["Events", url_for('event', language='en'), "nav-event"],
        ["Contact Us", url_for('contact', language='en'), "nav-contact"],
        ["Previous Fairs", url_for('about', language='en'), "nav-about"]
    ]

def getLangSv(request):
    return [
        "Svenska ",
        url_for(request.endpoint, language='sv') if request.endpoint else url_for('.index', language='sv'),
        url_for('static', filename='img/assets//flag_swe.svg')
    ]

def getLangEn(request):
    return [
        "English ",
        url_for(request.endpoint, language='en') if request.endpoint else url_for('.index', language='en'),
        url_for('static', filename='img/assets//flag_eng.svg')
    ]

app = Flask(__name__)

# This is to make regex legal in the url
class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]

app.url_map.converters['regex'] = RegexConverter

# Pages
#####################################
# Home
@app.route('/')
def index():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/index.html', pages=getPagesEn(), lang=getLangSv(request))
    else:
        return render_template('SV/index.html', pages=getPagesSv(), lang=getLangEn(request))

# Info for companies (packages, etc)
@app.route('/info4companies')
def info4companies():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/info4companies.html', pages=getPagesEn(), lang=getLangSv(request))
    else:
        return render_template('SV/info4companies.html', pages=getPagesSv(), lang=getLangEn(request))

# Info for visitors (list of companies, etc)
@app.route('/info4visitors')
def info4visitors():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/info4visitors.html', pages=getPagesEn(), lang=getLangSv(request))
    else:
        return render_template('SV/info4visitors.html', pages=getPagesSv(), lang=getLangEn(request))

# Contact
@app.route('/contact')
def contact():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/contact.html', pages=getPagesEn(), lang=getLangSv(request))
    else:
        return render_template('SV/contact.html', pages=getPagesSv(), lang=getLangEn(request))

# About
@app.route('/about')
def about():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/about.html', pages=getPagesEn(), lang=getLangSv(request))
    else:
        return render_template('SV/about.html', pages=getPagesSv(), lang=getLangEn(request))

# Event
#@app.route('/event')
#def event():
#    language = request.args.get('language')
#    if language == 'en':
#        return render_template('EN/event.html', pages=getPagesEn(), lang=getLangSv(request))
#    else:
#        return render_template('SV/event.html', pages=getPagesSv(), lang=getLangEn(request))

# Sök
@app.route('/2023')
@app.route('/Sök')
@app.route('/Sok')
@app.route('/sök')
@app.route('/sok')
def sok():
    return render_template('SV/sok.html', pages=getPagesSv(), lang=getLangEn(request))

# Forms
#####################################
# Redirect to application of working at the fair for D-Dagen 2022
# This regex is wrong since it matches any of the characthers in
# the array 3 times. It should be [Ss][OoÖö][Kk], but since it 
# dosen't matter the more links it matches on the better. 
#@app.route('/<regex("[SOÖKsoök]{3,3}"):link>/')
#def sok(link):
#    return redirect('https://forms.gle/67pCFajCSgnWhdvN6', code=302)

# Redirect to ticket form for then banket
@app.route('/sittning')
def sittning():
    return redirect('https://forms.gle/8zoFQSNXsXmHemU57', code=302)

# Redirect to ticket form for then banket
@app.route('/foto')
def foto():
    return redirect('https://forms.gle/GAh9wmkuAqEGkqF67', code=302)

# Company Forms
# Redirect to application of interest for D-Dagen 2022 in swedish
@app.route("/intresseanmalan")
def interest_ddagenintresseanmalan():
    return redirect('https://docs.google.com/forms/d/e/1FAIpQLSdHSky4KmmDbMzPjUKk6wpkiHkkysjnqRRlQ6jKzl4f7IKgUA/viewform', code=302)

# Links for apps
#####################################
# This is redirect for the map
@app.route('/karta')
@app.route('/faq')
@app.route("/map", methods=["GET"])
def map():
    return send_from_directory("static/map", "index.html")

# Redirect to the clicker app.
@app.route("/clicker", methods=["GET"])
def clicker():
    return redirect('https://clicker.ddagen.se', code=302)

#@app.route("/karta", methods=["GET"])
#def karta():
#    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/karta', code=302)


# Kataloger
#####################################
@app.route('/katalog')
@app.route('/katalog2022')
def katalog2022():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2022', code=302)

@app.route('/katalog2021')
def katalog2021():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2021', code=302)

@app.route('/katalog2020')
def katalog2020():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2020', code=302)

@app.route('/katalog2019')
def katalog2019():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2019', code=302)

# Because of request from member of Datasektionen, this should link to the PUBLIC version of the cataloge,
# in which the name of one project member is edited out.
@app.route('/katalog2018')
def katalog2018():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2018_public', code=302)

@app.route('/katalog2017')
def katalog2017():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2017', code=302)

# Because of request from member of Datasektionen, this should link to the PUBLIC version of the cataloge,
# in which the name of one project member is edited out.
@app.route('/katalog2016')
def katalog2016():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2016_public', code=302)

@app.route('/katalog2015')
def katalog2015():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2015', code=302)

# Error handlers
#####################################
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
