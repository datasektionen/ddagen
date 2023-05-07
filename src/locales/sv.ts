export default {
  locale: "sv" as const,
  titles: {
    home: "D-Dagen - Konglig Datasektionen",
  },
  about: "Om Oss",
  home: {
    introFirstBlock:
      "Nu är det återigen dags för D-Dagen, Nordens största arbetsmarknads-dag för datateknikstudenter.",
    introSecondBlock:
      "Är du en student inom data eller IT och söker efter din framtida arbetsplats,  eller representerar du ett företag som letar talangfulla medarbetare? Då är D-Dagen ett perfekt tillfälle för dig att träffa personer inom branschen och knyta värdefulla kontakter! Vi strävar mot att årets mässa ska bli den största hittills, med över 100 utställare och 3000 deltagare. ",
    introSignOff: "Hoppas vi ses!",
    introDDA: "Axel Johansson & Johan Abdi, D-Dagenansvariga",
    representative: "Företagsrepresentant?",
    representativeDescription:
      "Vill du nå ut till tusentals civilingenjörs-studenter vid KTH? Som utställare på D-Dagen har du möjlighet att göra just det! Klicka här nedanför för att läsa mer och göra en intresseanmälan.",
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
    interestedTitle: "Intresserad?",
    interestedText:
      "Är du intresserad av att ställa ut på D-Dagen och knyta kontakt med tusentals studenter inom Data och IT? Klicka här nedan för att göra en intresseanmälan!",
    formButton: "Intresseanmälan",
  },
  companyForm: {
    title: "Intresseanmälan",
    description: "Fyll i formuläret för att registrera ert företag för D-Dagen 2023. OBS! En intresseanmälan är inte bindande.",
    fields: {
      name: "Företagsnamn",
      organizationNumber: "Organisationsnummer",
      email: "Meljadress",
      contactPerson: "Kontaktperson",
      phoneNumber: "Telefonnummer",
    },
    confirm: "Skicka",
    ignoreError: "Gå vidare ändå",
  },
  postCompanyForm: {
    title: "Intresseanmälan bekräftad",
    subtitle: "Din anmälan har genomförts",
    text: "Bekräftelse på din anmälan har skickats på mail. Om du har några övriga frågor, kontakta oss på",
    textContinuation: "Glöm inte att kolla skräpposten om du inte fått bekräftelsemailet.",
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
    login: "Logga in",
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
    ) => `
      <p>Hej!</p>
      <p>Vi har nu tagit emot er intresseanmälan om att vara utställare på
      D-Dagen 2023! Vi kommer kontakta er under våren och meddela om ni har
      fått plats eller inte. Ni kan förvänta er att höra från oss senast den
      8:e juni.</p>

      <p>Här är detaljerna från er företagsanmälan:</p>
      <ul>
        <li>Företagsnamn: ${companyName}</li>
        <li>Organisationsnummer: ${organizationNumber}</li>
        <li>Mejladress: ${email}</li>
        <li>Kontaktperson: ${contactPerson}</li>
        <li>Telefonnummer: ${phoneNumber}</li>
      </ul>
      <p>Om någon av informationen ovan inte stämmer eller om ni har andra
      frågor, tveka inte att kontakta vårt säljteam på sales@ddagen.se.</p>
      <p>Tack för er intresseanmälan, hoppas ni är lika taggade som oss på
      D-Dagen 2023!</p>

      <p>Med vänliga hälsningar,</p>
      <p>D-Dagens projektgrupp</p>
    `,
  },
  faq: {
    box1: "OM D-DAGEN",
    box2: "MARKNADSFÖRING",
    box3: "ALLMÄNT",
    box4: "EVENEMANG",
    table1row1: "VAD ÄR D-DAGEN?",
    table1row2: "NÄR ÄR ÅRETS D-DAGEN?",
    table1row3: "VAR ÄR D-DAGEN?",
    table1text1: "D-Dagen är den årliga karriärmässan som anordnas av Datasektionen på Kungliga Tekniska Högskolan. D-Dagen är numera Nordens största karriärmässa inom IT.",
    table1text2: "Årets D-Dagen äger rum torsdag den 12:e oktober.",
    table1text3: "D-Dagen hålls i vårt kårhus Nymble, som ligger på KTH.",
    table2row1: "KAN VÅRT FÖRETAG FÅ MER EXPONERING MOT STUDENTER?",
    table2row2: "KAN VÅRT FÖRETAG MARKNADSFÖRA JOBBERBJUDANDEN OCH LIKNANDE VIA D-DAGEN?",
    table2text1: "Absolut, vi har flera olika paket för att ni ska kunna nå ut till fler studenter, kontakta <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a> för mer info.",
    table2text2: "Ja, det primära syftet med D-Dagen är att marknadsföra karriärmöjligheter som jobberbjudanden, traineeprogram, sommarpraktikplatser och liknande till våra studenter.",
    table3row1: "HUR ANMÄLER VI OSS TILL MÄSSAN?",
    table3row2: "VAD ÄR SISTA DATUMET FÖR ATT GÖRA EN INTRESSEANMÄLAN?",
    table3row3: "HUR BLIR VI PARTNER?",
    table3row4: "VI VILL HA MER INFORMATION, VART VÄNDER VI OSS?",
    table3row5: "ÄR NI ETT STARTUP?",
    table3text1: "Ni får göra en intresseanmälan på <a href='https://ddagen.se/en/förföretag' target='blank' className='underline text-cerise'>  https://ddagen.se/en/förföretag </a> eller kontakta våra säljare på <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text2: "Eftersom vi har ett begränsat antal platser på vår mässa rekommenderar vi att ni gör en icke-bindande intresseanmälan på <a href='https://ddagen.se/en/företagsanmälan' target='blank' className='underline text-cerise'>  https://ddagen.se/en/förföretagsanmälan </a>.",
    table3text3: "Om ni är intresserade av någon typ av större partnerskap kontakta <a className='text-cerise' href='mailto:ansvarig@ddagen.se'>ansvarig@ddagen.se</a>.",
    table3text4: "Om den information du söker inte finns på vår hemsida, kontakta våra säljare på <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text5: "Kontakta oss på <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table4row1: "VILKEN TYP AV EVENEMANG KAN VÅRT FÖRETAG ANORDNA TILLSAMMANS MED D-DAGEN?",
    table4text1: "Vi samarbetar gärna med er för att organisera evenemang före och efter D-Dagen! Oavsett om ni är intresserade av lunchföreläsningar, hackathons eller något helt annat är ni välkomna att dela era idéer med oss. För mer information kontakta vår sponsoransvarige på <a className='text-cerise' href='mailto:alexandre.moch@ddagen.se'>alexandre.moch@ddagen.se</a>.",
    productCatalog: "PRODUKTKATALOG",
    header: "FÖRETAG",
    catalogPath: "/downloadables/Product_Catalog_sv.pdf",
  },
  url: {
    forCompany: "https://ddagen.se/förföretag",
    companyForm: "https://ddagen.se/företagsanmälan"
  },
  error: {
    exhibitorRegistration: "Något gick fel! Försök igen eller skicka istället ett mail till",
    exhibitorRegistrationEmail:
      "Din anmälan har registrerats, men vi kunde inte skicka ett konfirmationsmail till dig.",
    duplicateEmail: "Det finns redan ett registrerat företag med den här mailadressen",
    invalidOrganizationNumberLength: "Organisationsnumret måste vara 10 siffror",
    invalidOrganizationNumberChecksum:
      "Felaktig kontrollsiffra, kontrollera att du skrivit rätt",
  },
  catalog:{
    header:"PRODUKTKATALOG",
    premiumPacket: [
      "Ett helt rum istället för monter", "Exponering på hemsidan", "1 st ståbord", 
      "2 st representantplatser (frukost & lunch ingår)", "4 st sittningsbiljetter", "30st dryckesbiljetter (värde ca 50 kr styck)",
      "El & Wifi", "Loungetillgång", "Tillgång till företagsvärd", "Förvaring & mottagning av leverans", "Exponering i broschyr", 
      "Exponering på goodie bag ", "Sponsrat inlägg på sociala medier",
       "En heldag med kontaktsamtal", "Marknadsföring av kontaktsamtal",],
    headhHunterPacket: [
      "8 m2 monteryta och central placering på mässan", "Exponering på hemsidan", "1 st ståbord", 
      "2 st representantplatser (frukost & lunch ingår)", "2 st sittningsbiljetter", "20st dryckesbiljetter (värde ca 50 kr styck)",
      "El & Wifi", "Loungetillgång", "Tillgång till företagsvärd", "Förvaring & mottagning av leverans", "Exponering i broschyr", 
      "Exponering på goodie bag ", "Sponsrat inlägg på sociala medier",
       "En halvdag med kontaktsamtal", "Marknadsföring av kontaktsamtal",],
    sponsorPacket: [
      "5 m2 monteryta och central placering på mässan", "Exponering på hemsidan", "1 st ståbord", 
      "2 st representantplatser (frukost & lunch ingår)", "2 st sittningsbiljetter", "10st dryckesbiljetter (värde ca 50 kr styck)",
      "El & Wifi", "Loungetillgång", "Tillgång till företagsvärd", "Förvaring & mottagning av leverans", "Exponering i broschyr", 
      "Exponering på goodie bag ", "Sponsrat inlägg på sociala medier",],
    basePacket: [
      "5 m2 monteryta och central placering på mässan", "Exponering på hemsidan", "1 st ståbord", 
      "2 st representantplatser (frukost & lunch ingår)", "2 st sittningsbiljetter", "10st dryckesbiljetter (värde ca 50 kr styck)",
      "El & Wifi", "Loungetillgång", "Tillgång till företagsvärd", "Förvaring & mottagning av leverans",],
    packetType:["BASPAKETET", "SPONSORPAKETET", "HEAD-HUNTERPAKETET", "PREMIUMPAKETET"],
    info: ["", "BEGRÄNSAT ANTAL", "BEGRÄNSAT ANTAL", "BEGRÄNSAT ANTAL"],
    subheader:"FRÅGOR, TANKAR, & IDEER?",
    paragraph: "Tveka inte att höra av dig om du har några frågor angående våra produkter eller har några funderingar."
    
  }
};
