// Skrivet på formatet [Namn, länk till bild från "static/img/", mail, Svensk titel, Engelsk titel]
// Scriptet körs när contact.html laddas in.

dda = [
    ["Carl Chemnitz", "maskot-bilder/alpa02-dda.png", "ansvarig@ddagen.se", "D-Dagenansvarig", "Project Leader"], 
    ["Kevin Wenström", "maskot-bilder/alpa02-dda.png", "ansvarig@ddagen.se", "D-Dagenansvarig", "Project Leader"]
];

fin = [
    ["Felix Almay", "maskot-bilder/alpa02-ekonomi.png", "ekonomi@ddagen.se", "Ekonomiansvarig", "Head of Finance"],
    ["Axel Johansson", "maskot-bilder/alpa02-ekonomi.png", "ekonomi@ddagen.se", "Vice ekonomiansvarig", "Finance"]
];

sales = [
    ["Carl Peterson", "maskot-bilder/alpa02-säljansvarig.png", "emmy@ddagen.se", "Säljansvarig", "Head of Sales"],
    ["Kalle Lindblad", "maskot-bilder/alpa02-sälj.png", "markus@ddagen.se", "Säljare", "Sales Associate"],
    ["Vilmer Jonsson", "maskot-bilder/alpa02-sälj.png", "ludvig@ddagen.se", "Säljare", "Sales Associate"]
];

events = [
    ["Amanda Berg", "maskot-bilder/alpa02-fest.png", "fest@ddagen.se", "Festansvarig", "Head of Events"]
];

fair = [
    ["Tobias Hansson", "maskot-bilder/alpa02-personalansvarig.png", "fair@ddagen.se", "Mässansvarig", "Head of Staff"],
    ["Emil Hultcrantz", "maskot-bilder/alpa02-lokalansvarig.png", "venue@ddagen.se", "Lokalansvarig", "Head of Venue"],
    ["David Peilitz", "maskot-bilder/alpa02-logistik.png", "logistics@ddagen.se", "Logistikansvarig", "Head of Logistics"],
    ["Rafael Bechara", "maskot-bilder/alpa02-lounge.png", "lounge@ddagen.se", "Loungeansvarig", "Head of Lounge"]
];

pr = [
    ["Mortada Nasser", "maskot-bilder/alpa02-pransvarig.png", "pr@ddagen.se", "PR-ansvarig", "Head of PR"],
    ["Gustav Ekner", "maskot-bilder/alpa02-webansvarig.png", "web@ddagen.se", "Webbansvarig", "Web Admin"],
    ["Joseph Karroum", "maskot-bilder/alpa02-grafik.png", "graphics@ddagen.se", "Art Director", "Art Director"],
    ["Johan Abdi", "maskot-bilder/alpa02-tryck-sponsor.png", "socialmedia@ddagen.se", "Sponsansvarig", "Head of Sponsorship"]
];

/**
 * Lägger till personerna definerade i listorna ovan till "Kontakta oss" sidan.
 * 
 * @param lang "swe" eller "eng" beroende på språk 
 */
function addContactInfo(lang) {
    try {        
        appendElem("dda", lang, dda[0]);
        appendElem("dda", lang, dda[1]);
        
        appendElem("fin", lang, fin[0]);
        appendElem("fin", lang, fin[1]);
        
        appendElem("sales", lang, sales[0]);
        appendElem("sales", lang, sales[1]);
        appendElem("sales", lang, sales[2]);
        
        appendElem("fair", lang, fair[0]);
        appendElem("fair", lang, fair[1]);
        appendElem("fair", lang, fair[2]);
        appendElem("fair", lang, fair[3]);
        
        appendElem("event", lang, events[0]);
        
        appendElem("pr", lang, pr[0]);
        appendElem("pr", lang, pr[1]);
        appendElem("pr", lang, pr[2]);
        appendElem("pr", lang, pr[3]);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Creates a html element of a person
 * 
 * @param person is a list with info about the person
 * @param titleLang is the language of the title, "swe" or "eng"
 * 
 * @returns a html element of a person
 */
function getElement(person, titleLang) {
    const elem = document.createElement("div");
    elem.className = "portrait-photo";
    
    var img = document.createElement("img");
    img.src = "static/img/" + person[1];

    const name = ctxtelem("h3", person[0]); 
    let titleID = 4;
    if (titleLang === "swe") {
        titleID = 3;
    } 
    const title = ctxtelem("h5", person[titleID]);         
    var mail = ctxtelem("a", person[2]);
    mail.href = "mailto:" +  person[2];

    elem.append(img);
    elem.append(name);
    elem.append(title);
    elem.append(mail);
    return elem;
}

/**
 * Creates a text element. e.g. <type>text</type>, <h1>title</h1>
 * 
 * @param type is the type of html element to create.
 * @param text is the text to put inside.
 * 
 * @returns a html element with text inside 
 */
function ctxtelem(type, text) {
    const elem = document.createElement(type);
    elem.append(document.createTextNode(text));
    return elem;
}

/**
 * Appends a person to specified div.
 * 
 * @param id is the id of the div to append the person to.
 * @param lang is the language to use
 * @param person is a list with the details
 */
function appendElem(id, lang, person) {
    document.getElementById(id).append(getElement(person, lang));
}