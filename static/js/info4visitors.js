// När denna "funktion" körs i kombination med "new" kommer den fungera som en 
// konstruktor och skapa ett nytt Company-objekt.
function Company(img, url) {
    this.img = img;
    this.url = url;
}

// För att lägga till/ta bort företag är det bara att ändra i den här listan,
// inga ändringar i HTML-koden behöver göras.
var regularCompanies = [
    new Company("companies2022/alecta.jpg", "https://www.alecta.se/"),
    new Company("companies2022/atlas_copco.svg", "https://www.atlascopco.com/sv-se"),
    new Company("companies2022/BITREFILL.png", "https://www.bitrefill.com/"),
    new Company("companies2022/decerno_logo.png", "https://www.decerno.se/"),
    new Company("companies2022/EQT.png", "https://eqtgroup.com/"),
    new Company("companies2022/hemnet.svg", "https://www.hemnet.se/"),
    new Company("companies2022/omicron.png", "https://www.omicron.se/public/sv.html"),
    new Company("companies2022/oracle.png", "https://www.oracle.com/se/index.html"),
    new Company("companies2022/SVT.png", "https://svt.se"),
    new Company("companies2022/tradera.png", "https://www.tradera.com/"),
    new Company("companies2022/vermiculus.jpg", "https://vermiculus.se/"),
    new Company("companies2022/xlent.jpg", "https://www.xlent.se/"),
    new Company("companies2022/fm.svg", "https://www.forsvarsmakten.se/sv/"),
    new Company("companies2022/Avalanche_Studios_Group.jpg", "https://avalanchestudios.com/"),
    new Company("companies2022/sweco.svg", "https://www.sweco.se/hallbarhet/"),
    new Company("companies2022/NASDAQ_Logo.svg", "https://www.nasdaq.com/"),
    new Company("companies2022/hiq.svg", "https://hiq.se/"),
    new Company("companies2022/ey.jpg", "https://www.ey.com/sv_se"),
    new Company("companies2022/AVL_Logo.jpg", "https://www.avl.com"),
    new Company("companies2022/storykit.jpg", "https://storykit.io"),
    new Company("companies2022/Astando.svg", "https://www.norconsultastando.se/"),
    new Company("companies2022/unionen.jpg", "https://www.unionen.se/"),
    new Company("companies2022/nexer.jpg", "http://www.nexertechtalent.com/"),
    new Company("companies2022/bonnier.svg", "https://www.bonniernews.se/"),
    new Company("companies2022/arriver.jpg", "https://www.arriver.com/"),
    new Company("companies2022/comsol.jpg", "https://www.comsol.com/"),
    new Company("companies2022/MetricioAB_medium.jpg", "https://metricio.se/"),
    new Company("companies2022/Nordnet_logo_stacked_black.jpg", "https://www.nordnet.se"),
    new Company("companies2022/bontouch.png", "https://www.bontouch.com/"),
    new Company("companies2022/yabs.png", "https://www.yabs.se/"),
    new Company("companies2022/omegapoint.png", "https://omegapoint.se"),
    new Company("companies2022/carmenta.svg", "https://carmenta.com"),
    new Company("companies2022/netinsight_logo_tran.jpg", "https://netinsight.net/"),
    new Company("companies2022/Trafikverket.png", "https://www.trafikverket.se/"),
    new Company("companies2022/syntronic.svg", "https://syntronic.com/"),
    new Company("companies2022/Polisen.svg", "https://polisen.se/"),
    new Company("companies2022/sana.png", "https://www.sanalabs.com/"),
    new Company("companies2022/challengermode.jpg", "https://www.challengermode.com/?lang=sv"),
    new Company("companies2022/sellpy_logo_black.png", "https://www.sellpy.se/"),
    new Company("companies2022/randomforest.png", "https://www.randomforest.se/"),
    new Company("companies2022/netlight.svg", "https://www.netlight.com/"),
    new Company("companies2022/sentor.png", "https://www.sentor.se"),
    new Company("companies2022/subset.png", "https://www.subset.se/"),
    new Company("companies2022/megger.svg", "https://se.megger.com/"),
    new Company("companies2022/scania-wordmark.svg", "https://scania.se"),
    new Company("companies2022/msab.jpeg", "https://www.msab.com/"),
    new Company("companies2022/fra.png", "https://www.fra.se/"),
    new Company("companies2022/svenska_kraftnat.svg", "https://www.svk.se/"),
    new Company("companies2022/digpro.png", "https://digpro.com/sv/"),
    new Company("companies2022/netcompany.png", "https://www.netcompany.com/"),
    new Company("companies2022/Schibsted.svg", "https://schibsted.com/"),
    new Company("companies2022/soderberg.svg", "https://www.soderbergpartners.se/"),
    new Company("companies2022/SkatteverketLogo.png", "https://www.skatteverket.se/"),
    new Company("companies2022/saab.png", "https://www.saab.com/"),
    new Company("companies2022/SAVR-logotyp-kopia.png", "https://savr.com/"),
    new Company("companies2022/tobii.webp", "https://www.tobii.com/sv/"),
    new Company("companies2022/keyfactor.webp", "https://www.keyfactor.com/"),
    new Company("companies2022/sopra-steria_0.jpeg", "https://www.soprasteria.se"),
    new Company("companies2022/mnemonic-logo-dark-payoff-web.png", "https://www.mnemonic.io/"),
    new Company("companies2022/scila-logo-print_150_37-copy-1.png", "https://scila.se/"),
    new Company("companies2022/visma.jpg", "https://www.visma.se/"),
    new Company("companies2022/SWEDBANK.png", "https://www.swedbank.se/"),
    new Company("companies2022/Modular_Finance.png", "https://www.modularfinance.se/?l=sv"),
    new Company("companies2022/SoftOne-logo-margin-340x107px.png", "https://www.softone.se/"),
    new Company("companies2022/sogeti.svg", "https://www.sogeti.se/"),
    new Company("companies2022/Treasury_Systems.png", "https://treasurysystems.com/"),
    new Company("companies2022/agio.png", "https://agio.se/"),
    new Company("companies2022/zwap_RGB_plume.svg", "https://www.zwapgrid.com"),
    new Company("companies2022/prevas.svg", "https://www.prevas.se/"),
    new Company("companies2022/alecta.jpg", "https://www.alecta.se/"),
    new Company("companies2022/ef-logo.jpg", "https://www.ef.se"),
    new Company("companies2022/enfo-logo.png", "https://www.enfo.se/"),
    new Company("companies2022/ida.png", "https://idainfront.se/"),
    new Company("companies2022/volumental.svg", "https://volumental.com/"),
    new Company("companies2022/monitor.png", "https://www.monitorerp.com/sv"),
    new Company("companies2022/Charge-Amps.png", "https://chargeamps.com/sv/"),
    new Company("companies2022/valcon.svg", "https://valcon.com/"),
    new Company("companies2022/sapo.svg", "https://sakerhetspolisen.se/"),
    new Company("companies2022/columbia.webp", "https://www.columbiaroad.com/"),
    new Company("companies2022/Ericsson-Logo.png", "https://www.ericsson.com/"),
    new Company("companies2022/capgemini.svg", "https://www.capgemini.com/"),
];

var imgLocation = "/static/img/";

// HTML-kod för elementet som innehåller ett företag:
var companyHTML = `
    <div class="uk-card" style="height: 120px;">
        <a class="uk-position-center" target="_blank">
            <img class="company" width="200px" alt="" uk-img>
        </a>
    </div>
`;

/**
 * Lägger till företagen definerade i listorna ovan till "Kontakta oss"-sidan.
 */
 function addCompanyInfo() {
    for (i = 0; i < regularCompanies.length; i++) {
        var company = regularCompanies[i];
        var companyDiv = document.createElement("div");
        companyDiv.innerHTML = companyHTML.trim();

        var url = companyDiv.children[0].children[0];
        var img = companyDiv.children[0].children[0].children[0];

        url.setAttribute("href", company.url);
        img.setAttribute("data-src", imgLocation + company.img);

        document.getElementById("regular-companies").appendChild(companyDiv);
    }
}

// from https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
function isTouchDevice() {
    return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}

if (!isTouchDevice()) {
    document.getElementById("desktop-url").setAttribute("href", "https://basalt.se/");
}
