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
  exhibitorSettings: {
    header: "Profilinställningar",
    fields: {
      invoiceEmail: "Fakturerings-E-post",
      description: "Företagsbeskrivning",
      extraChairs: "Extra stolar",
      extraTables: "Extra bord",
      extraDrinkCoupons: "Extra barbongar",
      extraRepresentativeSpots: "Extra representantplatser",
      totalBanquetTicketsWanted: "Sittningsbiljetter önskade",
      contactName: "Namn",
      contactEmail: "E-postadress",
      contactPhone: "Telefonnummer",
      contactRole: "Roll",
      saveContact: "Spara",
      removeContact: "Ta bort",
      allergyValue: "Specifikation",
      allergyComment: "Kommentar",
    },
    fieldsAddContact: {
      id: "ID",
      name: "Namn",
      phone: "Telefonnummer",
      email: "Meljadress",
      role: "Arbetsroll",
    },
    fieldsAddPreferences: {
      name: "Namn",
      preferences: "Preferenser",
      comment: "Övrigt",
    },
    contacts: "Kontakter",
    representativesAllergies: "Matspecifikationer företagsrepresentanter",
    banquetAllergies: "Matspecifikationer sittning",
    editAllergy: "Redigera",
    removeAllergy: "Ta bort",
    tooManyAllergies:
      "Du har lagt till fler matspecifikationer än antalet platser!",
    table: {
      row1: {
        title: "Om Företaget",
        section1: {
          header: "Allmän Info",
          description: "Beskrivning",
          placeholderText: "Om oss",
          logo: "Logga",
          logoWhite: "Vit Logga",
          logoColour: "Logga m. färg",
          or: "eller",
        },
        section2: {
          header: "Jobberbjudanden",
          year: {
            one: "År 1",
            two: "År 2",
            three: "År 3",
            four: "År 4",
            five: "År 5",
          },
          jobs: {
            summer: "Sommarjobb",
            internship: "Internship",
            partTime: "Deltidsjobb",
          },
          other: {
            thesis: "Examensarbete",
            fullTime: "Heltidsjobb",
            trainee: "Traineeprogram",
          },
          save: "Spara",
        },
        section3: {
          header: "Kontaktpersoner",
          save: "Spara",
          add: "Lägg Till",
          delete: "Radera",
          alerts: {
            errorDeleteUserWithoutID:
              "Kan inte identifiera användaren som ska raderas",
            errorDeleteSelf: "Du kan inte radera dig själv",
            errorDuplicateEmail: "Mejladressen finns redan",
          },
        },
        imageTypeNotSupported:
          "Det gick inte att ladda upp filen: Bildformatet stöds inte.",
        maxImageWarning: (imageSize: string, maxImageSize: string) =>
          `Det gick inte att ladda upp filen: Filen är för stor (${imageSize}MB). Max filstorlek: ${maxImageSize}MB.`,
      },
      row2: {
        title: "Ert Paket Och Extra Beställningar",
        packages: {
          base: "Bas",
          sponsor: "Sponsor",
          headhunter: "Head Hunter",
          premium: "Premium",
        },
        section1: {
          header: "Paket",
          info: "För mer info kring de olika paketen",
          catalogue: "Katalog",
        },
        section2: {
          header: "Extrabeställningar",
          titles: {
            first: "I ert paket ingår",
            second: "Tillval",
            third: "Totalt",
          },
          drinkCoupons: "Barbongar",
          tables: "Bord",
          chairs: "Stolar",
          representatives: "Representanter",
          sitting: "Sittningsbiljetter",
          warning: "Sista datum för beställning ",
          disabledButtonMessages: {
            representatives:
              "Ta bort matpreferenser för representanter för att minska antalet",
            banquet:
              "Ta bort matpreferenser för sittningen för att minska antalet",
          },
          save: "Spara",
        },
      },
      row3: {
        title: "Matpreferenser",
        section1: {
          header: "Under Mässan",
          paragraphOne:
            "Dessa matpreferenser används för frukosten och lunchen under mässan.",
          paragraphTwo: "Ni ändrar antalet i extra beställningar",
        },
        section2: {
          header: "Sittning",
          paragraphOne:
            "Dessa matpreferenser används för sittningen efter mässan.",
          paragraphTwo: "Ni ändrar antalet i extra beställningar",
        },
        preferencesHeader: "Preferenser (vegetariskt är standard)",
        options: {
          vegetarian: "Vegansk",
          lactoseFree: "Laktosfri",
          glutenFree: "Glutenfri",
          meat: "Kött",
        },
        alerts: {
          errorDeletePreferenceWithoutID:
            "Kan inte identifiera matpreferensen som ska raderas",
          errorEmptyValueArray: "Du måste välja ett alternativ",
          errorAddingMorePreferencesThanAllowed: (max: number) =>
            `Du har nått det maximala antalet (${max}) preferenser som du har tilldelats`,
        },
      },
    },
  },
  login: {
    title: "Logga in",
    email: "E-post",
    emailText: "E-postadressen du angav när du gjorde din intresseanmälan",
    confirm: "Logga in",
    confirmationCode: "Bekräftelsekod",
    confirmationCodeText1: "Vi har skickat en kod till din e-postadress <",
    confirmationCodeText2:
      "> om den är registrerad i vårt system. Om du inte hittar mailet, dubbelkolla att e-postadressen är korrekt samt se till att kolla i skräpposten!",
    emailSubject: "D-Dagen - Logga in",
    emailBody: (code: string, link: string) => `
      <p>För att slutföra inloggningen till D-Dagen, gå till följande länk:</p>
      <p> </p>
      <p>${link}</p>
      <p> </p>
      <p>eller ange koden ${code} på inloggningssidan.</p>
      <p>Om du inte försökt logga in kan du ignorera detta mail.</p>
    `,
  },
  companyForm: {
    title: "Intresseanmälan",
    description:
      "Fyll i formuläret för att registrera ert företag för D-Dagen 2023. OBS! En intresseanmälan är inte bindande.",
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
    textContinuation:
      "Glöm inte att kolla skräpposten om du inte fått bekräftelsemailet.",
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
    contact: "Kontakt",
    exhibitorSettings: "Inställningar",
    login: "Logga in",
    logout: "Logga ut",
    catalog: "Katalog",
  },
  footer: {
    header:
      "Arrangeras av Konglig Datasektionen vid Kungliga Tekniska Högskolan",
    about:
      "Konglig Datasektionen är en ideell studentsektion under Tekniska Högskolans Studentkår som finns till för att alla studenter som läser datateknik på KTH ska få en så bra och givande studietid som möjligt",
    contactHeader: "Kontakt",
    responsible: "D-Dagenansvariga",
    salesGroup: "Säljgruppen",
    sponsorText: "Huvudsponsor för D-Dagen 2023",
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
    table1text1:
      "D-Dagen är den årliga karriärmässan som anordnas av Datasektionen på Kungliga Tekniska Högskolan. D-Dagen är numera Nordens största karriärmässa inom IT.",
    table1text2: "Årets D-Dagen äger rum torsdag den 12:e oktober.",
    table1text3: "D-Dagen hålls i vårt kårhus Nymble, som ligger på KTH.",
    table2row1: "KAN VÅRT FÖRETAG FÅ MER EXPONERING MOT STUDENTER?",
    table2row2:
      "KAN VÅRT FÖRETAG MARKNADSFÖRA JOBBERBJUDANDEN OCH LIKNANDE VIA D-DAGEN?",
    table2text1:
      "Absolut, vi har flera olika paket för att ni ska kunna nå ut till fler studenter, kontakta <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a> för mer info.",
    table2text2:
      "Ja, det primära syftet med D-Dagen är att marknadsföra karriärmöjligheter som jobberbjudanden, traineeprogram, sommarpraktikplatser och liknande till våra studenter.",
    table3row1: "HUR ANMÄLER VI OSS TILL MÄSSAN?",
    table3row2: "VAD ÄR SISTA DATUMET FÖR ATT GÖRA EN INTRESSEANMÄLAN?",
    table3row3: "HUR BLIR VI PARTNER?",
    table3row4: "VI VILL HA MER INFORMATION, VART VÄNDER VI OSS?",
    table3row5: "ÄR NI ETT STARTUP?",
    table3text1:
      "Ni får göra en <a href='https://ddagen.se/företagsanmälan' target='blank' className='underline text-cerise'>  intresseanmälan</a> eller kontakta våra säljare på <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text2:
      "Eftersom vi har ett begränsat antal platser på vår mässa rekommenderar vi att ni gör en icke-bindande intresseanmälan. För att göra detta, vänligen klicka här: <a href='https://ddagen.se/en/företagsanmälan' target='blank' className='underline text-cerise'> Anmälan </a>.",
    table3text3:
      "Om ni är intresserade av någon typ av större partnerskap kontakta <a className='text-cerise' href='mailto:ansvarig@ddagen.se'>ansvarig@ddagen.se</a>.",
    table3text4:
      "Om den information du söker inte finns på vår hemsida, kontakta våra säljare på <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text5:
      "Kontakta oss på <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table4row1:
      "VILKEN TYP AV EVENEMANG KAN VÅRT FÖRETAG ANORDNA TILLSAMMANS MED D-DAGEN?",
    table4text1:
      "Vi samarbetar gärna med er för att organisera evenemang före och efter D-Dagen! Oavsett om ni är intresserade av lunchföreläsningar, hackathons eller något helt annat är ni välkomna att dela era idéer med oss. För mer information kontakta vår sponsoransvarige på <a className='text-cerise' href='mailto:alexandre.moch@ddagen.se'>alexandre.moch@ddagen.se</a>.",
    productCatalog: "PRODUKTKATALOG",
    header: "FÖRETAG FAQ",
    catalogPath: "/downloadables/Product_Catalog_sv.pdf",
  },
  contact: {
    header: "Kontakt",
    subheader1: "Kontakta oss",
    subheader2: "Projektansvariga",
    p1: "Om ni har några egna förslag på evenemang eller aktiviteter ni vill anordna för studenterna på Konglig Datasektionen, eller om ni har några andra frågor eller funderingar om företagspaket är det bara att höra av er till oss på...",
    p2: "För mer information och övriga frågor till ansvariga för D-Dagen kontakta oss på...",
    salesHeader: "Säljgruppen",
    bossesHeader: "Ansvariga",
    roles: [
      "D-DAGENANSVARIG",
      "D-DAGENANSVARIG",
      "PR-ANSVARIG",
      "MÄSSANSVARIG",
      "SÄLJANSVARIG",
      "EKONOMIANSVARIG",
    ],
  },
  url: {
    forCompany: "https://ddagen.se/förföretag",
    companyForm: "https://ddagen.se/företagsanmälan",
  },
  packages: {
    name: {
      base: "Baspaketet",
      sponsor: "Sponsorpaketet",
      headhunter: "Headhunterpaketet",
      premium: "Premiumpaketet",
      main: "Huvudsponsor",
    },
    boothSpace: "monteryta",
  },
  error: {
    exhibitorRegistration:
      "Något gick fel! Försök igen eller skicka istället ett mail till",
    exhibitorRegistrationEmail:
      "Din anmälan har registrerats, men vi kunde inte skicka ett konfirmationsmail till dig.",
    duplicateEmail:
      "Den här mailadressen är redan kopplad till en registrering",
    invalidOrganizationNumberLength:
      "Organisationsnumret måste vara 10 siffror",
    invalidOrganizationNumberChecksum:
      "Felaktig kontrollsiffra, kontrollera att du skrivit rätt",
    userNotFound: "Det finns inget konto med den här mailadressen",
    emailNotSent: "Ett fel uppstod när vi försökte skicka ett mail till dig",
    invalidConfirmationCode:
      "Bekräftelsekoden är felaktig eller har gått ut, var god försök igen",
    cannotDeleteSelf: "Du kan inte ta bort ditt eget konto",
    unknown: "Ett okänt fel uppstod",
  },
  success: {
    save: "Ändringarna du gjorde har sparats",
  },
  catalog: {
    header: "PRODUKTKATALOG",
    premiumPacket: [
      "Ett helt rum istället för monter",
      "Exponering på hemsidan",
      "1 st ståbord",
      "4 st representantplatser (frukost & lunch ingår)",
      "4 st sittningsbiljetter",
      "30st dryckesbiljetter (värde ca 50 kr styck)",
      "El & Wifi",
      "Loungetillgång",
      "Tillgång till företagsvärd",
      "Förvaring & mottagning av leverans",
      "Exponering i broschyr",
      "Exponering på goodie bag ",
      "Sponsrat inlägg på sociala medier",
      "En heldag med kontaktsamtal",
      "Marknadsföring av kontaktsamtal",
    ],
    headhHunterPacket: [
      "8 m² monteryta och centralt på mässan",
      "Exponering på hemsidan",
      "1 st ståbord",
      "4 st representantplatser (frukost & lunch ingår)",
      "2 st sittningsbiljetter",
      "20st dryckesbiljetter (värde ca 50 kr styck)",
      "El & Wifi",
      "Loungetillgång",
      "Tillgång till företagsvärd",
      "Förvaring & mottagning av leverans",
      "Exponering i broschyr",
      "Exponering på goodie bag ",
      "Sponsrat inlägg på sociala medier",
      "En halvdag med kontaktsamtal",
      "Marknadsföring av kontaktsamtal",
    ],
    sponsorPacket: [
      "5 m² monteryta och centralt på mässan",
      "Exponering på hemsidan",
      "1 st ståbord",
      "2 st representantplatser (frukost & lunch ingår)",
      "2 st sittningsbiljetter",
      "10st dryckesbiljetter (värde ca 50 kr styck)",
      "El & Wifi",
      "Loungetillgång",
      "Tillgång till företagsvärd",
      "Förvaring & mottagning av leverans",
      "Exponering i broschyr",
      "Exponering på goodie bag ",
      "Sponsrat inlägg på sociala medier",
    ],
    basePacket: [
      "5 m² monteryta och centralt på mässan",
      "Exponering på hemsidan",
      "1 st ståbord",
      "2 st representantplatser (frukost & lunch ingår)",
      "2 st sittningsbiljetter",
      "10st dryckesbiljetter (värde ca 50 kr styck)",
      "El & Wifi",
      "Loungetillgång",
      "Tillgång till företagsvärd",
      "Förvaring & mottagning av leverans",
    ],
    packetType: [
      "BASPAKETET",
      "SPONSORPAKETET",
      "HEAD-HUNTERPAKETET",
      "PREMIUMPAKETET",
    ],
    info: ["", "BEGRÄNSAT ANTAL", "BEGRÄNSAT ANTAL", "BEGRÄNSAT ANTAL"],
    subheader: "FRÅGOR, TANKAR, & IDEER?",
    paragraph:
      "Tveka inte att höra av dig om du har några frågor angående våra produkter eller har några funderingar.",
  },
  event: {
    paragraph1:
      "Lunchföreläsningar är redan ett populärt koncept bland studenterna och brukar anordnas på campus. Föreläsningarna ger er en möjlighet att exempelvis prata om ert företag, en viss produkt...",
    paragraph2:
      "Ett annat förslag är att anordna en slags After-work där studenterna får möjlighet att besöka er arbetsplats samt umgås och mingla med era medarbetare. Detta ger studenterna en god ...",
    paragraph3:
      "Här får ni en möjlighet att besöka vårt campus och mingla med oss studenter i vår fina sektionslokal META. Under själva puben kan en rad olika aktiviteter genomföras, exempelvis quiz ...",
    paragraph4:
      "Detta liknar After-work-konceptet lite grann och kan även kombineras med det. En case kväll ger er en god möjlighet att testa studenterna och faktiskt se vad vi går för, samt ger studenterna en rolig ...",
    fullParagraph1:
      "Lunchföreläsningar är redan ett populärt koncept bland studenterna och brukar anordnas på campus. Föreläsningarna ger er en möjlighet att exempelvis prata om ert företag, en viss produkt eller idé, eller vilken annan visdom som helst som ni vill dela med er av. I priset ingår lokal, mat till studenter samt PR för eventet. I år kommer lunchföreläsningarna runt D-Dagen hållas i samband med Datasektionens 40-årsjubileum, vilket betyder att ni dessutom kommer vara med på deras sociala medier och hemsida.",
    fullParagraph2:
      "Ett annat förslag är att anordna en slags After-work där studenterna får möjlighet att besöka er arbetsplats samt umgås och mingla med era medarbetare. Detta ger studenterna en god möjlighet att få en känsla av kulturen på arbetsplatsen samt prata med anställda om hur det är att jobba hos er. Denna typ av event brukar vara väldigt uppskattade av studenterna.",
    fullParagraph3:
      "Här får ni en möjlighet att besöka vårt campus och mingla med oss studenter i vår fina sektionslokal META. Under själva puben kan en rad olika aktiviteter genomföras, exempelvis quiz, brädspel eller något annat (låt fantasin flöda). I priset ingår mat och barbongar, det vill säga dryckesbiljetter ni kan dela ut till studenter. Även denna pub kommer genomföras i ett samarbete med Datasektionens 40-årsjubileum.",
    fullParagraph4:
      "Detta liknar After-work-konceptet lite grann och kan även kombineras med det. En case kväll ger er en god möjlighet att testa studenterna och faktiskt se vad vi går för, samt ger studenterna en rolig utmaning, och beroende på uppgiften kan det också ge oss en viss känsla för hur det är att jobba med programmering.  Case kvällen kommer äga rum veckan efter D-dagen med PR för att nå ut till intresserade datateknikstudenter. Vi ansvarar för lokalen som kan anpassas efter hur många studenter som ni vill ska delta på eventet.",
    header1: "Lunchföreläsning",
    header2: "Afterwork/Kontorbesök",
    header3: "Sponsrad Pub",
    header4: "Casekväll",
    subheader: "Pris: ",
    extra: "Läs mer",
  },
  admin: {
    login: {
      title: "Logga In",
      username: "Användarnamn",
      password: "Lösenord",
    },
    sales: {
      header: {
        title: "Utställare",
        name: "Namn",
        logoWhite: "Vit Logga",
        logoColour: "Logga m. färg",
        description: "Beskrivning",
        package: "Paket",
        extras: {
          name: "Tillägg",
          chairs: "Stolar",
          tables: "Bord",
          drinkCoupons: "Barbongar",
          representativeSpots: "Representantplatser",
          banquetTickets: "Sittningsbiljette",
        },
      },
    },
  },
  aboutUs:{
    header: "Om Oss",
    subHeader: "Möt Projektgruppen 2023",
    paragraph1: "D-Dagen är en årlig företagsmässa som anordnas av Datasektionen på KTH. På D-Dagen har företag möjlighet att möta och interagera med potentiella framtida anställda från KTH. Samtidigt erbjuder vi våra studenter en chans att lära sig mer om karriärmöjligheter, nätverka och delta i föreläsningar och andra företagsevent.",
    paragraph2: "D-Dagen startade 2015, då med 35 närvarande företag. Året efter flyttade mässan in i kårhuset Nymble, vilket har varit lokalen för efterföljande upplagor av D-Dagen. Mässan har också vuxit varje år, bortsett från pandemi-året 2020.",
    paragraph3: "I år satsar vi på att ha över 100 företag närvarande. Vi räknar också med att 3000 studenter besöker mässan. Med tiden har D-Dagen växt till mycket mer än bara en mässdag. Veckorna inför mässan ger vi företag chansen att hålla lunchföreläsningar och andra event tillsammans med våra studenter. På kvällen efter mässan anordnar vi en större sittning där studenter och företagsrepresentanter kan prata på ett mer avslappnat vis.",
    info1: "Vad är D-Dagen",
    info2: "D-Dagen förr",
    info3: "D-Dagen idag",
    prTeamRoles: [
      ["Systemutvecklare", "Social Medier-Ansvarig", "PR-Ansvarig"],
      ["Art Director", "Webbutvecklare", "Tryckansvarig"],
      ["Systemutvecklare", "Art Director"]
    ],
    salesTeamRoles: [
      ["Säljare", "Säljare", "Säljansvarig"],
      ["Sponsansvarig", "Säljare", "Säljare"],
      ["Säljare"]
    ],
    massTeamRoles: [
      ["Mäss-Ansvarig", "Logistik-Ansvarig", "Lokal-Ansvarig"],
      ["Fest-Ansvarig", "Lounge-Ansvarig", "Personal-Ansvarig"]
    ],
    ecoTeamRoles: [
      ["Vice Ekonomiansvarig", "Ekonomiansvarig"]
    ],
    ddaRoles: [
      ["DDA", "DDA"]
    ],
    teamNames: ["PR-Gruppen", "Säljgruppen", "Mässgruppen", "Ekonomiansvariga", "D-Dagenansvariga"],
  },
};
