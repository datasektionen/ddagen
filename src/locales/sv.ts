export default {
  locale: "sv",
  titles: {
    home: "D-Dagen - Konglig Datasektionen",
  },
  about: "Om Oss",
  home: {
    introFirstBlock:
      "Nu är det återigen dags för D-dagen, Nordens största arbetsmarknads-dag för datateknikstudenter.",
    introSecondBlock:
      "Är du en student inom data eller IT och söker efter din framtida arbetsplats,  eller representerar du ett företag som letar talangfulla medarbetare? Då är D-dagen ett perfekt tillfälle för dig att träffa personer inom branschen och knyta värdefulla kontakter! Vi strävar mot att årets mässa ska bli den största hittills, med över 100 utställare och 3000 deltagare. ",
    introSignOff: "Hoppas vi ses!",
    introDDA: "Axel Johansson & Johan Abdi, D-dagenansvariga",
    representative: "Företagsrepresentant?",
    representativeDescription:
      "Vill du nå ut till tusentals civilingenjörs-studenter vid KTH? Som utställare på D-dagen har du möjlighet att göra just det! Klicka här nedanför för att läsa mer och göra en intresseanmälan.",
    representativeButton: "Intresseanmälan",
    stats: {
      firstPart: "100+ utställare",
      secondPart: "3000+ deltagare",
    },
  },
  forCompanies: {
    title: "För Företag",
    aboutFair: "Om mässan",
    fairText1:
      "D-Dagen är Datasektionens årliga arbetsmarknadsdag. Det är ett heldagsevent där företag och studenter verksamma inom data och IT får en möjlighet att knyta kontakter och lära känna varandra. Detta skapar goda möjligheter för en mer direkt och personlig kontakt mellan företagsrepresentanter och studenter.",
    fairText2:
      "I år hålls mässan 12e oktober i THS kårhus, Nymble, som ligger på Drottning Kristinas väg 15-19 på KTH Campus Valhallavägen. Under dagen kommer det finnas en lounge för utställare, och på kvällen anordnas en bankett för att avsluta dagen.",
    intrestedTitle: "Intresserad?",
    intrestedText:
      "Är du intresserad av att ställa ut på D-dagen och knyta kontakt med tusentals studenter inom Data och IT? Klicka här nedan för att göra en intresseanmälan!",
    formButton: "Intresseanmälan",
  },
  companyForm: {
    title: "Intresseanmälan",
    name: "Företagsnamn",
    organizationNumber: "Organisationsnummer",
    email: "Meljadress",
    contactPerson: "Kontaktperson",
    phoneNumber: "Telefonnummer",
    confirm: "Skicka",
    error:
      "Något gick fel! Försök igen eller skicka oss istället ett mail till",
    organizationNumberLength: "Organisationsnumret måste vara 10 siffror",
    organizationNumberChecksum:
      "Felaktig kontrollsiffra, kontrollera att du skrivit rätt",
  },
  postCompanyForm: {
    title: "Intresseanmälan bekräftad",
    subtitle: "Din anmälan har genomförts",
    text: "Bekräftelse på din anmälan har skickats på mail. Om du har några övriga frågor, kontakta oss på",
    contact: "Kontakta oss",
  },
  nav: {
    toContent: "Till innehåll",
    home: "Hem",
    forCompanies: "För företag",
    forStudents: "För studenter",
    about: "Om D-Dagen",
    companyForm: "Företagsanmälan",
    changeLanguage: "Ändra språk till engelska",
  },
  footer: {
    header:
      "Arrangeras av Konglig Datasektionen vid Kungliga Tekniska Högskolan",
    about:
      "Konglig Datasektionen är en ideell studentsektion under Tekniska Högskolans Studentkår som finns till för att alla studenter som läser datateknik på KTH ska få en så bra och givande studietid som möjligt",
    contactHeader: "Kontakt",
    responsible: "D-Dagenansvariga",
    salesGroup: "Säljgruppen",
  },
  email: {
    subject: "Bekräftelse på Företagsanmälan",
    body: (
      companyName: string,
      organizationNumber: string,
      email: string,
      contactPerson: string,
      phoneNumber: string
    ) => {
      return `
      <p>Hej!</p>
      <p>Vi kan härmed bekräfta att vi har mottagit er företagsanmälan. 
      Ni kommer bli kontaktade av en säljare med mer information om mässan.</p>

      <p>Här är detaljerna från er företagsanmälan:</p>
      <ul>
        <li>Företagsnamn: ${companyName}</li>
        <li>Organisationsnummer: ${organizationNumber}</li>
        <li>Mejladress: ${email}</li>
        <li>Kontaktperson: ${contactPerson}</li>
        <li>Telefonnummer: ${phoneNumber}</li>
      </ul>
      <p>Kontakta oss om någon av ovanstående uppgifter är felaktig.</p>
      <p>Tack för er registrering och vi ser fram emot en lyckad mässa.</p>

      <p>Best regards,</p>
      <p>X</p>`;
    },
  },
};
