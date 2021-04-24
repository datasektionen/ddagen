from flask import Flask, request, render_template, redirect, send_from_directory, make_response
#from scrape import *

app = Flask(__name__)

"""
@app.route("/get_counter")
def count():
    return str(get_count())
"""

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

# Huvudsponsor (Remove) 
@app.route('/huvudsponsor')
def huvudsponsor():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/huvudsponsor.html')
    else:
        return render_template('SV/huvudsponsor.html')

# Sök d-dagen (remove)
@app.route('/apply')
def apply():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/apply.html')
    else:
        return render_template('SV/apply.html')

# Events (Remove)
@app.route('/event')
@app.route('/events')
def events():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/events.html')
    else:
        return render_template('SV/events.html')

# Visitors (Remove)
@app.route('/karta')
@app.route('/visitors')
def visitors():
    language = request.args.get('language')
    if language == 'en':
        return render_template('EN/visitors.html')
    else:
        return render_template('SV/visitors.html')


# Formulär
#####################################
# Redirect to application of working at the fair for D-Dagen 2021
@app.route("/sok")
def sok():
     return redirect('https://forms.gle/cuoUwgQtcyJiZ79b8', code=302)

# Company Forms
# Redirect to application of interest for D-Dagen 2021 in swedish
@app.route("/2021")
@app.route("/2021en")
@app.route("/intresseanmalan")
def interest_ddagenintresseanmalan():
    return redirect('https://forms.gle/JtG9WcqH9BkGveHT7', code=302)


# This is redirect for the map
#####################################
@app.route("/map", methods=["GET"])
def map():
        return send_from_directory("static/map", "map.html")

@app.route("/static/map/favicon.ico")
def favicon():
        return send_from_directory('static/icons', 'favicon.ico')


# Kataloger
#####################################
@app.route('/katalog')
@app.route('/katalog2019')
def katalog2019():
    return redirect('https://static.datasektionen.se/naringsliv/d-dagen/katalog_2019', code=302)

@app.route('/katalog2018')
def katalog2018():
    return redirect('https://static.datasektionen.se/naringsliv/d-dagen/katalog_2018', code=302)

@app.route('/katalog2017')
def katalog2017():
    return redirect('https://static.datasektionen.se/naringsliv/d-dagen/katalog_2017', code=302)

@app.route('/katalog2016')
def katalog2016():
    return redirect('https://static.datasektionen.se/naringsliv/d-dagen/katalog_2016', code=302)

@app.route('/katalog2015')
def katalog2015():
    return redirect('https://static.datasektionen.se/naringsliv/d-dagen/katalog_2015', code=302)


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
