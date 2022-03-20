// När denna "funktion" körs i kombination med "new" kommer den fungera som en 
// konstruktor och skapa ett nytt Person-objekt.
function Person(name, img, email, sv_title, en_title) {
    this.name = name;
    this.img = img;
    this.email = email;
    this.title = {
        sv: sv_title,
        en: en_title
    };
}

// För att lägga till/ta bort medlemmar är det bara att ändra i den här listan,
// inga ändringar i HTML-koden behöver göras.
var pageData = [
    {
        title: {sv: "Projektledare", en: "Project Managers"},
        persons: [
            new Person("Carl Chemnitz", "projektgruppen/chemnitz.jpg", "ansvarig@ddagen.se", "D-Dagenansvarig", "Project Leader"), 
            new Person("Kevin Wenström", "projektgruppen/wenstrom.jpg", "ansvarig@ddagen.se", "D-Dagenansvarig", "Project Leader")
        ]
    },
    {
        title: {sv: "Ekonomi", en: "Finance"},
        persons: [
            new Person("Felix Almay", "projektgruppen/almay.jpg", "ekonomi@ddagen.se", "Kassör", "Treasurer"),
            new Person("Axel Johansson", "projektgruppen/johansson.jpg", "v.ekonomi@ddagen.se", "Vice kassör", "Vice-Treasurer")
        ]
    },
    {
        title: {sv: "Sälj", en: "Sales"},
        persons: [
            new Person("Carl Peterson", "maskot-bilder/alpa02-säljansvarig.png", "carl.peterson@ddagen.se", "Säljare", "Sales Associate"),
            new Person("Karl Lindblad", "projektgruppen/lindblad.jpg", "karl.lindblad@ddagen.se", "Säljare", "Sales Associate"),
            new Person("Vilmer Jonsson", "projektgruppen/jonsson.jpg", "vilmer.jonsson@ddagen.se", "Säljare", "Sales Associate"),
            new Person("Johan Abdi", "maskot-bilder/alpa02-tryck-sponsor.png", "johan.abdi@ddagen.se", "Sponsansvarig", "Head of Sponsorship")
        ]
    },
    {
        title: {sv: "Mässa", en: "Fair"},
        persons: [
            new Person("Tobias Hansson", "maskot-bilder/alpa02-personalansvarig.png", "fair@ddagen.se", "Mässansvarig", "Head of Staff"),
            new Person("Emil Hultcrantz", "projektgruppen/hultcrantz.jpg", "facility@ddagen.se", "Lokalansvarig", "Head of Venue"),
            new Person("David Peilitz", "maskot-bilder/alpa02-logistik.png", "logistics@ddagen.se", "Logistikansvarig", "Head of Logistics"),
            new Person("Rafael Bechara", "maskot-bilder/alpa02-lounge.png", "lounge@ddagen.se", "Loungeansvarig", "Head of Lounge")
        ]
    },
    {
        title: {sv: "PR", en: "PR"},
        persons: [
            new Person("Mortada Nasser", "projektgruppen/nasser.jpg", "pr@ddagen.se", "PR-ansvarig", "Head of PR"),
            new Person("Gustav Ekner", "projektgruppen/ekner.jpg", "web@ddagen.se", "Webbansvarig", "Webmaster"),
            new Person("Joseph Karroum", "maskot-bilder/alpa02-grafik.png", "art@ddagen.se", "Art Director", "Art Director")
        ]
    },
    {
        title: {sv: "Fest", en: "Event"},
        persons: [
            new Person("Amanda Berg", "maskot-bilder/alpa02-fest.png", "event@ddagen.se", "Festansvarig", "Head of Events")
        ]
    }
];

var imgLocation = "/static/img/";

// HTML-kod för elementet som innehåller en hel grupp, t.ex. Säljgruppen:
var teamHTML = `
    <div class="uk-card uk-card-default uk-card-body">
        <h2></h2>
        <div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-4@s uk-text-center uk-flex-center" uk-grid>
        </div>
    </div>
`;

// HTML-kod för elementet som innehåller en person, t.ex. Säljansvarig:
var personHTML = `
    <div class="uk-card uk-card-default uk-card-body" style="padding: 30px;">
        <img class="uk-border-circle" width="200px" style="object-fit: scale-down; max-height: 200px;" alt="" uk-img>
        <h3 class="uk-margin-remove-bottom"></h3>
        <h4 class="uk-margin-small"></h4>
        <p class="uk-margin-remove-top"><p>
    </div>
`;

/**
 * Lägger till personerna definerade i listorna ovan till "Kontakta oss"-sidan.
 * 
 * @param lang "sv" eller "en" beroende på språk 
 */
 function addContactInfo(lang) {
    for (i = 0; i < pageData.length; i++) {
        var teamDiv = document.createElement("div");
        teamDiv.innerHTML = teamHTML.trim();
        var personContainer = teamDiv.children[0].children[1];

        for (j = 0; j < pageData[i].persons.length; j++) {
            var person = pageData[i].persons[j];
            var personDiv = document.createElement("div");
            personDiv.innerHTML = personHTML.trim();

            var img = personDiv.children[0].children[0];
            var name = personDiv.children[0].children[1];
            var title = personDiv.children[0].children[2];
            var email = personDiv.children[0].children[3];

            img.setAttribute("data-src", imgLocation + person.img);
            name.innerHTML = person.name;
            title.innerHTML = person.title[lang];
            email.innerHTML = "<a href='mailto:" + person.email + "'>" + person.email + "</a>";

            personContainer.appendChild(personDiv);
        }

        teamDiv.querySelector("h2").innerHTML = pageData[i].title[lang];

        document.getElementById("main-grid").appendChild(teamDiv);
    }
}