// När denna "funktion" körs i kombination med "new" kommer den fungera som en 
// konstruktor och skapa ett nytt Company-objekt.
function Company(img, url) {
    this.img = img;
    this.url = url;
}

var bottomSponsors = [
    new Company("sponsors2022/logo-alecta.svg", "https://www.alecta.se/"),
    new Company("sponsors2022/atlas.svg", "https://www.atlascopco.com/sv-se"),
    new Company("sponsors2022/bitrefill.svg", "https://www.bitrefill.com/"),
    new Company("companies2022/decerno_logo.png", "https://www.decerno.se/"),
    new Company("companies2022/EQT.png", "https://eqtgroup.com/"),
    new Company("sponsors2022/Hemnet_Logo_Dark_Background_RGB.svg", "https://www.hemnet.se/"),
    new Company("companies2022/omicron.png", "https://www.omicron.se/public/sv.html"),
    new Company("sponsors2022/oracle.svg", "https://www.oracle.com/se/index.html"),
    new Company("sponsors2022/SVT.png", "https://svt.se"),
    new Company("sponsors2022/Tradera.svg", "https://www.tradera.com/"),
    new Company("sponsors2022/vermiculus.svg", "https://vermiculus.se/"),
    new Company("sponsors2022/xlent-logo-orange-white.svg", "https://www.xlent.se/"),
]

var imgLocation = "/static/img/";

// HTML-kod för elementet som innehåller ett företag:
var sponsorHTML = `
    <div class="uk-card" style="height: 50px;">
        <a class="uk-position-center" target="_blank">
            <img class="company" width="200px" alt="" uk-img>
        </a>
    </div>
`;

/**
 * Lägger till företagen definerade i listorna ovan till "Kontakta oss"-sidan.
 */
 function addCompanyInfoBottom() {
    for (i = 0; i < bottomSponsors.length; i++) {
        var company = bottomSponsors[i];
        var companyDiv = document.createElement("div");
        companyDiv.innerHTML = sponsorHTML.trim();

        var url = companyDiv.children[0].children[0];
        var img = companyDiv.children[0].children[0].children[0];

        url.setAttribute("href", company.url);
        img.setAttribute("data-src", imgLocation + company.img);

        document.getElementById("bottom-sponsors").appendChild(companyDiv);
    }
}