from flask import Flask, request, render_template, redirect, send_from_directory, make_response
from werkzeug.routing import BaseConverter

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
        return render_template('EN/index.html')
    else:
        return render_template('SV/index.html')

# Companies
@app.route('/companies')
def companies():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/companies.html')
    else:
        return render_template('SV/companies.html')

# Contact
@app.route('/contact')
def contact():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/contact.html')
    else:
        return render_template('SV/contact.html')

# FAQ
@app.route('/faq')
def faq():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/faq.html')
    else:
        return render_template('SV/faq.html')

# Visitors
@app.route('/visitors')
def visitors():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/visitors.html')
    else:
        return render_template('SV/visitors.html')

# Forms
#####################################
# Redirect to application of working at the fair for D-Dagen 2021
# This regex is wrong since it matches any of the characthers in
# the array 3 times. It should be [Ss][OoÖö][Kk], but since it 
# dosen't matter the more links it matches on the better. 
@app.route('/<regex("[SOÖKsoök]{3,3}"):link>/')
def sok(link):
    return redirect('https://forms.gle/huKbwntFe37EpJMr5', code=302)

# Redirect to ticket form for then banket
@app.route('/sittning')
def sittning():
    return redirect('https://forms.gle/UGbrFsL46wTEHcbWA', code=302)

# Company Forms
# Redirect to application of interest for D-Dagen 2021 in swedish
@app.route("/2021")
@app.route("/2021en")
@app.route("/intresseanmalan")
def interest_ddagenintresseanmalan():
    return redirect('https://forms.gle/JtG9WcqH9BkGveHT7', code=302)

# Start-Up Forms
# Redirect to application of interest for D-Dagen 2021
@app.route("/startup")
def interest_ddagenstartup():
    return redirect('https://forms.gle/vMPQyhLFumnceu666', code=302)

# Lunchseminars 2021
@app.route('/lfscania')
def lfscania():
    return redirect('https://forms.gle/RbmKCJCfTeWN6L2Z8', code=302)
@app.route('/lfskatteverket')
def lfskatteverket():
    return redirect('https://forms.gle/wHNkCupyJdsopAAs6', code=302)
@app.route('/lftietoevry')
def lftietoevry():
    return redirect('https://forms.gle/mbRAXu9Yt4SJugJ69', code=302)
@app.route('/lftink')
def lftink():
    return redirect('https://forms.gle/z4NYd3DpQeHJqjLr6', code=302)


# Links for apps
#####################################
# This is redirect for the map
@app.route("/map", methods=["GET"])
def map():
    return send_from_directory("static/map", "map.html")

# Redirect to the clicker app.
@app.route("/clicker", methods=["GET"])
def clicker():
    return send_from_directory('static/clicker', 'clicker.html')

@app.route("/karta", methods=["GET"])
def karta():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/karta', code=302)


# Kataloger
#####################################
@app.route('/katalog')
@app.route('/katalog2021')
def katalog2021():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2021', code=302)

@app.route('/katalog2020')
def katalog2020():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2020', code=302)

@app.route('/katalog2019')
def katalog2019():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2019', code=302)

@app.route('/katalog2018')
def katalog2018():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2018', code=302)

@app.route('/katalog2017')
def katalog2017():
    return redirect('https://dsekt-assets.s3.amazonaws.com/naringsliv/d-dagen/katalog_2017', code=302)

# Someone didn't want /katalog2016 to be indexed by google

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
