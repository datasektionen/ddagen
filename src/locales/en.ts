export default {
  locale: "en" as const,
  titles: {
    home: "D-Dagen - Konglig Datasektionen",
  },
  about: "About Us",
  home: {
    introFirstBlock:
      "It’s once again time for D-Dagen, the largest job fair for Computer Science students in the Nordics.",
    introSecondBlock:
      "Are you studying Computer Science or IT and looking for your future work place, or do you represent a company and are looking for talented co-workers? In that case, D-Dagen is the perfect opportunity for you to meet people from the industry and expand your network with valuable contacts! We’re striving to make this year's fair the largest so far, with over 100 exhibitors and 3000 participants.",
    introSignOff: "Looking forward to meeting you!",
    introDDA: "Axel Johansson & Johan Abdi, Project Managers",
    representative: "Company Representative?",
    representativeDescription:
      "Do you want to reach thousands of Computer Science Engineering students at KTH? As an exhibitor at D-Dagen you have the opportunity to do so! Click the button below to read more and make an application of interest .",
    representativeButton: "Interest Registration",
    stats: {
      firstPart: "100+ exhibitors",
      secondPart: "3000+ participants",
    },
  },
  forCompanies: {
    title: "For Companies",
    aboutFair: "About the fair",
    fairText1:
      "D-Dagen is the Computer Science Chapter’s annual career fair. It is an all-day event where companies and students studying computer science and IT get the opportunity to connect and get to know each other. This creates good opportunities for a more direct and personal contact between company representatives and students.",
    fairText2:
      "This year the fair is held on October 12th in the THS student union building, Nymble, which is located at Drottning Kristinas väg 15-19 on the KTH Campus Valhallavägen. During the day there will be a lounge for exhibitors, and in the evening a banquet will be organized to end the day.",
    interestedTitle: "Interested?",
    interestedText:
      "Are you interested in exhibiting on D-Dagen and connecting with thousands of students in Computer Science and IT? Click below to sign up!",
    formButton: "Sign up",
  },
  forStudents: {
    title: "For Students",
    aboutFair: "About the fair",
    fairText1:
      "D-Dagen is the Computer Science Chapter’s annual career fair. It is an all-day event where companies and students studying computer science and IT get the opportunity to connect and get to know each other. This creates good opportunities for a more direct and personal contact between company representatives and students.",
    fairText2:
      "This year, the fair is held on October 12th in the THS student union building, Nymble, which is located at Drottning Kristinas väg 15 and in KTH Entré which is located at Drottning Kristinas väg 4. Other than the fair, D-Dagen is also having a recruitment pub before the fair where we recruit event staff and lunch lectures with FRA (28/9) and SAAB (9/10) together with dJubileet. Additionally, students will be able to have more meetings with exhibitors through company meetings in order to get more of a connection with that company.",
    companyMeetings: "Company Meetings",
    companyMeetingsText:
      "This year is also the first year where we will offer company meetings for students, which means that you will be able to discuss future job opportunities in a private room with representatives from selected companies. Sign up on the link below:",
    companyMeetingsButton: "Company Meetings",
  },
  exhibitorSettings: {
    header: "Profile Settings",
    fields: {
      invoiceEmail: "Invoce email",
      description: "Company description",
      extraChairs: "Extra chairs",
      extraTables: "Extra tables",
      extraDrinkCoupons: "Extra drink coupons",
      extraRepresentativeSpots: "Extra representative spots",
      totalBanquetTicketsWanted: "Total banquet tickets wanted",
      contactName: "Name",
      contactEmail: "Email",
      contactPhone: "Phone number",
      contactRole: "Role",
      saveContact: "Save",
      removeContact: "Remove",
      allergyValue: "Specification",
      allergyComment: "Comment",
    },
    fieldsAddContact: {
      id: "ID",
      name: "Name",
      phone: "Phone Number",
      email: "Email Address",
      role: "Role",
    },
    fieldsAddPreferences: {
      name: "Name",
      preferences: "Preferences",
      comment: "Other",
    },
    contacts: "Contacts",
    representativesAllergies: "Food specifications representatives",
    banquetAllergies: "Food specifications banquet",
    editAllergy: "Edit",
    removeAllergy: "Remove",
    tooManyAllergies:
      "You have specified more food specifications than tickets!",
    table: {
      row1: {
        title: "About Company",
        section1: {
          header: "General Information",
          description: "Description",
          placeholderText: "About Us",
          logo: "Logo",
          logoWhite: "White Logo",
          logoColour: "Logo w/ colour",
          or: "or",
        },
        section2: {
          header: "Job Offers",
          year: {
            one: "Year 1",
            two: "Year 2",
            three: "Year 3",
            four: "Year 4",
            five: "Year 5",
          },
          jobs: {
            summer: "Summer Job",
            internship: "Internship",
            partTime: "Part-time Job",
          },
          other: {
            thesis: "Master Thesis",
            fullTime: "Full-time Job",
            trainee: "Trainee Program",
          },
          save: "Save",
        },
        section3: {
          header: "Contacts",
          save: "Save",
          add: "Add",
          delete: "Delete",
          alerts: {
            errorDeleteUserWithoutID: "Can not identify user to delete",
            errorDeleteSelf: "You can not delete yourself",
            errorDuplicateEmail: "Email adress already exists",
          },
        },
        imageTypeNotSupported:
          "Error uploading file: The image format type is not supported.",
        maxImageWarning: (imageSize: string, maxImageSize: string) =>
          `Error uploading file: File is too big (${imageSize}MB). Max filesize: ${maxImageSize}MB.`,
      },
      row2: {
        title: "Your Package And Extra Orders",
        packages: {
          base: "Base",
          sponsor: "Sponsor",
          headhunter: "Head Hunter",
          premium: "Premium",
          startup: "Startup",
          main: "Main Sponsor",
        },
        section1: {
          header: "Package",
          info: "For more information about the different packages",
          catalogue: "Catalogue",
        },
        section2: {
          header: "Extra orders",
          titles: {
            first: "Included in your package",
            second: "Options",
            third: "Total",
          },
          drinkCoupons: "Drink Coupons",
          tables: "Tables",
          chairs: "Chairs",
          representatives: "Representatives",
          sitting: "Dinnerparty",
          warning: "Last date for ordering ",
          disabledButtonMessages: {
            representatives:
              "Delete food preferences for representative to decrease amount",
            banquet:
              "Delete food preferences for dinnerparty to decrease amount",
          },
          save: "Save",
        },
      },
      row3: {
        title: "Food Preferences",
        section1: {
          header: "During the Fair",
          paragraphOne:
            "These food preferences are used for breakfast and lunch during the fair.",
          paragraphTwo: "You change the number in extra orders",
        },
        section2: {
          header: "Dinner Party",
          paragraphOne:
            "These food preferences are used for the seating after the fair.",
          paragraphTwo: "You change the number in extra orders",
        },
        preferencesHeader: "Preferences (vegetarian is default)",
        options: {
          vegetarian: "Vegan",
          lactoseFree: "Lactose-Free",
          glutenFree: "Gluten-Free",
          meat: "Meat",
        },
        alerts: {
          errorDeletePreferenceWithoutID:
            "Can not identify food preference to delete.",
          errorEmptyValueArray: "You have to select an option",
          errorAddingMorePreferencesThanAllowed: (max: number) =>
            `You've reached the maximum amount (${max}) of preferences allotted to you`,
        },
      },
    },
  },
  login: {
    title: "Log in",
    email: "Email",
    emailText: "The email address you used to register your company",
    confirm: "Log in",
    confirmationCode: "Confirmation code",
    confirmationCodeText1:
      "We sent you a confirmation code to your email address <",
    confirmationCodeText2:
      "> if it is registered in our system. If you can't find the email, double check that the email address is correct and make sure to check your spam folder!",
    emailSubject: "D-Dagen Login",
    emailBody: (code: string, link: string) => `
      <p>To complete the login to D-Dagen, go to the link below:</p>
      <p> </p>
      <p>${link}</p>
      <p> </p>
      <p>or enter the code ${code} on the login page.</p>
      <p>If you did not request this login, please ignore this email.</p>
    `,
  },
  companyForm: {
    title: "Sign up for D-Dagen",
    description:
      "Fill in this form to sign up your company for D-Dagen 2023. Please note that signing up through to this form is not binding.",
    fields: {
      name: "Company Name",
      organizationNumber: "Organization Number",
      email: "Email Address",
      contactPerson: "Contact Person",
      phoneNumber: "Phone Number",
    },
    confirm: "Send",
    ignoreError: "Continue anyway",
    noMoreRegistrations:
      "Registrations for D-Dagen 2023 have closed. Keep an eye on our social media for next year's fair!",
  },
  postCompanyForm: {
    title: "Registration confirmed",
    subtitle: "Your registration has been received",
    text: "Confirmation of your registration has been sent by email. If you have any other questions, contact us on",
    textContinuation:
      "Please check your spam folder in case you haven't received any confirmation.",
    contact: "Contact us",
  },
  nav: {
    toContent: "To content",
    home: "Home",
    forCompanies: "For companies",
    forStudents: "For students",
    about: "About",
    companyForm: "Exhibitor Registration",
    changeLanguage: "Change language to Swedish",
    contact: "Contact  ",
    exhibitorSettings: "Settings",
    login: "Log in",
    logout: "Log out",
    catalog: "Catalog",
    logos: "Our Exhibitors",
    meetings: "Company Meetings",
    map: "Map",
  },
  footer: {
    header: "Organized by Datasektionen",
    about:
      "Datasektionen, or the Computer Science Chapeter is a non-profit student chapter under THS which exists to give all CS students at KTH the best study time possible.",
    contactHeader: "Contact",
    responsible: "Project Managers",
    salesGroup: "Sales Team",
    sponsorText: "Main sponsor for D-Dagen 2023",
  },
  email: {
    subject: "Exhibitor Registration Confirmation",
    body: (
      companyName: string,
      organizationNumber: string,
      email: string,
      contactPerson: string,
      phoneNumber: string
    ) => `
    <p>Hi!</p>
    <p>We are pleased to confirm we have received your exhibitor registration.
    We will contact you during the spring about whether you got a spot at D-Dagen.
    You can expect to hear from us by June 8th at the latest.</p>

    <p>Here are the details of your registration:</p>
    <ul>
      <li>Company Name: ${companyName}</li>
      <li>Organization Number: ${organizationNumber}</li>
      <li>Email Address: ${email}</li>
      <li>Contact Person: ${contactPerson}</li>
      <li>Phone Number: ${phoneNumber}</li>
    </ul>
    <p>If any of the information above is incorrect or if you have any other questions,
    do not hesitate to contact our sales team at sales@ddagen.se.</p>
    <p>Thank you for your registration and we look forward to a successful event.</p>

    <p>Best regards,</p>
    <p>The D-Dagen project group</p>
    `,
  },
  faq: {
    box1: "ABOUT D-DAGEN",
    box2: "MARKETING",
    box3: "GENERAL",
    box4: "EVENTS",
    table1row1: "WHAT IS D-DAGEN?",
    table1row2: "WHEN IS THE YEAR'S D-DAGEN FAIR?",
    table1row3: "WHERE IS D-DAGEN?",
    table1text1:
      "D-Dagen is the annual career fair organized by the Computer Science chapter at KTH Royal Institute of Technology. It is today the largest IT career fair in the Nordic region.",
    table1text2: "This year's D-Dagen is taking place on October 12.",
    table1text3:
      "D-Dagen will be held at Nymble, the student union house, located at the KTH Royal Institute of Technlogy in Stockholm.",
    table2row1: "CAN OUR COMPANY GET MORE EXPOSURE?",
    table2row2: "CAN OUR COMPANY MARKET JOB OFFERS ETC THROUGH D-DAGEN?",
    table2text1:
      "Absolutely, we have several different packages to help you reach more students, contact <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a> for more information.",
    table2text2:
      "Yes, the main purpose of D-Dagen is to market career opportunities such as job offers, trainee programs, summer internships and similar initiatives to our students.",
    table3row1: "HOW DO I REGISTER FOR THE FAIR?",
    table3row2: "WHEN IS THE LAST DAY TO REGISTER FOR THE FAIR?",
    table3row3: "HOW DO WE BECOME A PARTNER?",
    table3row4: "WE WOULD LIKE MORE INFORMATION, WHERE DO WE TURN?",
    table3row5: "ARE YOU A STARTUP?",
    table3text1:
      "You can make a <a href='https://ddagen.se/företagsanmälan' target='blank' className='underline text-cerise'>  registration of interest </a> or contact our sales team at <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text2:
      "Since we have a limited number of spots available at our fair, we recommend that you make a non-binding registration of interest. To do this, please click here: <a href='https://ddagen.se/en/företagsanmälan' target='blank' className='underline text-cerise'> Registration</a>.",
    table3text3:
      "If you are interested in any type of partnership contact <a className='text-cerise' href='mailto:ansvarig@ddagen.se'>ansvarig@ddagen.se</a>.",
    table3text4:
      "If the information you are looking for can't be found at our website, contact us at <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text5:
      "Contact us at <a className='text-cerise' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table4row1:
      "WHAT KIND OF EVENTS CAN OUR COMPANY HOST TOGETHER WITH D-DAGEN?",
    table4text1:
      "We'd be thrilled to collaborate with you, both before and after D-Dagen! Whether you're interested in hosting a lunch lecture, hackathon, or something completely different, we're open to your ideas. For more information, please contact our sponsorship manager at <a className='text-cerise' href='mailto:alexandre.moch@ddagen.se'>alexandre.moch@ddagen.se</a>.",
    productCatalog: "PRODUCT CATALOG",
    header: "COMPANY FAQ",
    catalogPath: "/downloadables/Product_Catalog_eng.pdf",
  },
  contact: {
    header: "Contact",
    subheader1: "Contact us",
    subheader2: "Project Managers",
    p1: "If you have any suggestions for events or activities you want to organize for the students at the Computer Science Chapter, or if you have any other questions or concerns about company packages and the fair,  feel free to contact us at...",
    p2: "For more information and other questions to those responsible for D-Dagen, contact us at...",
    salesHeader: "Sales team",
    bossesHeader: "Managers",
    roles: [
      "HEAD OF D-DAGEN",
      "HEAD OF D-DAGEN",
      "HEAD OF PR",
      "HEAD OF THE FAIR",
      "HEAD OF SALES",
      "HEAD OF FINANCES",
    ],
  },
  url: {
    forCompany: "https://ddagen.se/en/förföretag",
    companyForm: "https://ddagen.se/en/företagsanmälan",
  },
  packages: {
    name: {
      base: "Base Package",
      sponsor: "Sponsor Package",
      headhunter: "Headhunter Package",
      premium: "Premium Package",
      main: "Main sponsor",
    },
    boothSpace: "booth space",
  },
  error: {
    exhibitorRegistration:
      "Something went wrong! Try again or send an email instead to",
    exhibitorRegistrationEmail:
      "Your registration has been received, but we could not send a confirmation email to you.",
    duplicateEmail: "This email has already registered for D-Dagen",
    invalidOrganizationNumberLength:
      "The organization number must be 10 digits",
    invalidOrganizationNumberChecksum:
      "Invalid check digit, check that you have entered the number correctly",
    userNotFound: "No account with this email has been registered",
    emailNotSent:
      "Something went wrong when sending an email to you, please try again later",
    invalidConfirmationCode:
      "Invalid or expired confirmation code, please try again",
    cannotDeleteSelf: "You cannot delete your own account",
    unknown: "Something unexpectedly went wrong",
    changePreferencesAfterDeadline:
      "Can not change preferences after last date for ordering.",
  },
  success: {
    save: "The changes you made have been saved",
  },
  catalog: {
    header: "PRODUCT CATALOG",
    premiumPacket: [
      "A whole room",
      "Advertisement on D-Dagen's website",
      "1 table for your booth",
      "4 spots for company representatives (including breakfast and lunch)",
      "4 tickets to the dinner and after-party",
      "30 drink coupons (worth about 50 SEK each)",
      "Electricity & WiFi",
      "Access to the company lounge",
      "Access to company host",
      "Storage and handling of delivieries",
      "Exposure in brochure",
      "Exposure on goodie bag",
      "One marketed post on our social media",
      "A full day of private student meetings",
      "Marketing of private student meetings",
    ],
    headhHunterPacket: [
      "8 m² booth space",
      "Advertisement on D-Dagen's website",
      "1 table for your booth",
      "4 spots for company representatives (including breakfast and lunch)",
      "2 tickets to the dinner and after-party",
      "20 drink coupons (worth about 50 SEK each)",
      "Electricity & WiFi",
      "Access to the company lounge",
      "Access to company host",
      "Storage and handling of delivieries",
      "Exposure in brochure",
      "Exposure on goodie bag",
      "One marketed post on our social media",
      "A half day of private student meetings",
      "Marketing of private student meetings",
    ],
    sponsorPacket: [
      "5 m² booth space",
      "Advertisement on D-Dagen's website",
      "1 table for your booth",
      "2 spots for company representatives (including breakfast and lunch)",
      "2 tickets to the dinner and after-party",
      "10 drink coupons (worth about 50 SEK each)",
      "Electricity & WiFi",
      "Access to the company lounge",
      "Access to company host",
      "Storage and handling of delivieries",
      "Exposure in brochure",
      "Exposure on goodie bag",
      "One marketed post on our social media",
    ],
    basePacket: [
      "5 m² booth space",
      "Advertisement on D-Dagen's website",
      "1 table for your booth",
      "2 spots for company representatives (including breakfast and lunch)",
      "2 tickets to the dinner and after-party",
      "10 drink coupons (worth about 50 SEK each)",
      "Electricity & WiFi",
      "Access to the company lounge",
      "Access to company host",
      "Storage and handling of delivieries",
    ],
    packetType: [
      "BASE PACKAGE",
      "SPONSOR PACKAGE",
      "HEAD-HUNTER PACKAGE",
      "PREMIUM PACKAGE",
    ],
    info: ["", "LIMITED AMOUNT", "LIMITED AMOUNT", "LIMITED AMOUNT"],
    subheader: "QUESTIONS, THOUGHTS, & IDEAS?",
    paragraph:
      "Don't hesitate to get in touch if you have any questions about our products or have any other questions.",
  },
  event: {
    paragraph1:
      "Lunch seminars are already a popular concept among the students at KTH and are usually held on campus during lunch hours. The seminars give you an opportunity to reach a wide audience while ...",
    paragraph2:
      "An after-work or office visit with us allows your colleagues to show your premises to the students while socializing with them. This gives the student a feel for your workplace culture and to have a ...",
    paragraph3:
      "A sponsored pub gives your company a more up close and personal experience. It allows you to socialize with the Computer Science students in META, our roomy chapter house on KTH ...",
    paragraph4:
      "This event is similar to the after-work/office visit events. A case event gives you an opportunity to test the students’ skills while providing them with a fun challenge. Depending on the type of case ...",
    fullParagraph1:
      "Lunch seminars are already a popular concept among the students at KTH and are usually held on campus during lunch hours. The seminars give you an opportunity to reach a wide audience while talking about any topic of your choice. The price includes premises, food for students and marketing of the event.  This year, the lunch seminars will be held in collaboration with our student chapter’s 40 year anniversary. This means you will get more marketing than usual, and your company will be featured on the anniversary’s social media and website.",
    fullParagraph2:
      "An after-work or office visit with us allows your colleagues to show your premises to the students while socializing with them. This gives the student a feel for your workplace culture and to have a more personal experience with your employees. The students greatly appreciate these types of events. We handle the marketing of the event, while you make sure the students are offered food and refreshments during the event itself.",
    fullParagraph3:
      "A sponsored pub gives your company a more up close and personal experience. It allows you to socialize with the Computer Science students in META, our roomy chapter house on KTH Campus. The pub can feature several activities such as board games, quizzes, or anything your imagination might produce. We will handle the booking of the premises and help you with planning the event. The price tag includes food for all attending students and drink coupons for you to hand out to students who mingle with you. This event will also be held in collaboration with our 40th anniversary, which includes more marketing for your company.",
    fullParagraph4:
      "This event is similar to the after-work/office visit events. A case event gives you an opportunity to test the students’ skills while providing them with a fun challenge. Depending on the type of case provided it can also be a good way for the students to get a feel for what it is like to work at your company. We handle marketing of the event, booking of premises and ordering food and drinks for everyone attending. We can also assist in planning the case event if desired.",
    header1: "Lunch Seminar",
    header2: "Afterwork/Office Visit",
    header3: "Sponsored Pub",
    header4: "Case Event",
    subheader: "Price: ",
    extra: "Read more",
  },
  admin: {
    login: {
      title: "Log In",
      username: "Username",
      password: "Password",
    },
    sales: {
      login: "Log in",
      amountOfExhibitors: "Amount of Exhibitors",
      header: {
        title: "Exhibitors",
        name: "Name",
        logoWhite: "White Logo",
        logoColour: "Coloured Logo",
        description: "Description",
        package: "Package",
        extras: {
          name: "Extras",
          chairs: "Chairs",
          tables: "Tables",
          drinkCoupons: "Drink Coupons",
          representativeSpots: "Representative Spots",
          banquetTickets: "Banquet Tickets",
        },
        verification: {
          name: "Verification",
          banquet: "Banquet",
          representatives: "Representatives",
        },
      },
    },
    extraOrders: {
      header: {
        order: "Order",
        extras: "Extras",
        package: "Package",
        amount: "Amount",
        total: "Total",
      },
      row: {
        tables: "Tables",
        chairs: "Chairs",
        drinkCoupons: "Drink Coupons",
        representatives: "Representatives",
        banquetTickets: "Banquet Tickets",
      },
    },
    preferences: {
      header: {
        title: "Preferences",
        exhibitor: "Exhibitor",
        name: "Name",
        choices: "Choices",
        comment: "Comment",
        type: "Type",
      },
      types: {
        representatives: "Representatives",
        banquet: "Banquet",
      },
      none: "Vegatarian",
    },
  },
  aboutUs: {
    header: "About us",
    subHeader: "Meet Project Group 2023",
    paragraph1:
      "D-Dagen is an annual trade fair organized by the Computer Science Student Association at KTH (Royal Institute of Technology). At D-Dagen, companies have the opportunity to meet and interact with potential future employees from KTH. At the same time, we offer our students a chance to learn more about career opportunities, network, and participate in lectures and other company events.",
    paragraph2:
      "D-Dagen started in 2015 with 35 participating companies. The following year, the fair moved to the Nymble student union building, which has been the venue for subsequent editions of D-Dagen. The fair has grown every year, except for the pandemic year of 2020. This year, we are aiming to have over 100 companies in attendance. We also expect around 3000 students to visit the fair.",
    paragraph3:
      "Over time, D-Dagen has evolved into much more than just a one-day fair. In the weeks leading up to the fair, we give companies the opportunity to hold lunch lectures and other events together with our students. In the evening after the fair, we organize a larger dinner where students and company representatives can engage in more relaxed conversations.",
    info1: "What is D-Dagen",
    info2: "D-Dagen before",
    info3: "D-Dagen today",
    prTeamRoles: [
      ["Software Developer", "Social Media Manager", "PR Manager"],
      ["Art Director", "Web Developer", "Print Manager"],
      ["Software Developer", "Art Director"],
    ],
    salesTeamRoles: [
      ["Salesperson", "Salesperson", "Sales Manager"],
      ["Sponsorship Manager", "Salesperson", "Salesperson"],
      ["Salesperson"],
    ],
    massTeamRoles: [
      ["Fair Manager", "Logistics Manager", "Venue Manager"],
      ["Event Manager", "Lounge Manager", "HR Manager"],
    ],
    ecoTeamRoles: [["Deputy Financial Manager", "Financial Manager"]],
    ddaRoles: [
      ["DDA", "DDA"], // Assuming DDA remains the same without context.
    ],
    teamNames: [
      "PR Team",
      "Sales Team",
      "Exhibition Team",
      "Finance Team",
      "D-Dagen Managers",
    ],
  },
  logos: {
    header: "Our exhibitors",
    offers: "Offers",
  },
  map: {
    header: "Map",
    search: {
      placeHolder: "Search exhibitors",
      buttonOne: "Search",
      buttonTwo: "Filters",
      filterYear: "Year",
    },
    floors: {
      one: "Floor 2",
      two: "Floor 3",
    },
    description: {
      offers: "Offers",
      summer: "Summer Job",
      internship: "Internship",
      partTime: "Part-time Job",
      thesis: "Master Thesis",
      fullTime: "Full-time Job",
      trainee: "Trainee Program",
    },
  },
  sok:{
    header: "Signup for DDAGEN",
    description: "The goal for this year's D-Dagen is to make it the biggest and best career fair in Datasektionen's history! This is the vision we have as organizers this year. However, it's impossible for us to organize such a large event entirely on our own. We need an ambitious project group to help us, one that has the drive to create something extraordinary. We aim to improve internal communication from previous years, and, therefore, we will focus extensively on team building to create a close-knit group. We also expect that everyone in the project group is sociable, has good teamwork skills, and is self-driven in their tasks.",
    extra:"Läs mer om rollerna",
    prGroup:{
      header: "PR Team",
      text: "As the PR manager, you are the leader of the PR team. You drive and organize the group, ensuring that everyone knows what they need to do and has the necessary resources. Since you work closely with the PR team, you will become very close-knit. As the PR manager, you will also communicate extensively with the DDA's.",
      roles:[
        "PR-Ansvarig - As the PR manager, you are the leader of the PR team. You drive and organize the group, ensuring that everyone knows what they need to do and has the necessary resources. Since you work closely with the PR team, you will become very close-knit. As the PR manager, you will also communicate extensively with the DDA's.",
        "Art Director - Som Art Director är det du som ser till att D-Dagen ser proffsigt ut. Du kommer ha möjligheten att uttrycka din kreativitet och designa all grafik som behövs för D-Dagen. Här ingår bland annat broschyrer, affischer, profilkläder och annat. Ibland kommer du även få ta lite bilder. Inga förkunskaper behövs; man får istället möjligheten att lära sig med tiden och det viktigaste är att du är driven och motiverad. Självklart kommer du få tillgång till alla program du behöver!",
        "Dev lead - is a role that is completely new for this year! You will work closely with the web manager on ambitious projects that we hope to introduce to D-Day. We are looking for someone with a strong drive to create opportunities, and prior knowledge of app development is a big plus (we have some ideas in progress)",
        "Tryckansvarig - is part of the PR team and is responsible for ensuring that all printed materials are ordered and delivered on time. This includes items such as stickers, fabric patches, promotional clothing, banners, brochures, and more. You will work closely with the Art Director and assist with design work.",
        "Socialmedier-Ansvarig - is responsible for ensuring that D-Dagen is visible on Instagram, Facebook, and all other social media platforms. In this role, you have a lot of freedom in choosing which social media channels to use and how you choose to express yourself (within reasonable boundaries, of course). In the role of Social Media Ansvarig, you work closely with the Art Director to create attractive posts.",
    ] 
    },
    saleGroup:{
      header: "Sales Team",
      text: "The Sales Team in D-Day is a central part of the organization and plays a crucial role in ensuring the participation of companies and the growth of the event. The group consists of three key roles, each with its specific tasks:",
      roles: [
        "Sales responsible - As the Sales Manager, you are an operational leader for the sales team. You will be the one who trains the salespeople on how to work, ensures that they have everything they need, and keeps the work progressing according to the schedule.",
        "Salespeople - The salespeople are the ones who primarily have direct contact with the companies. You will work as a team to sell D-Day to the companies and ensure that D-Day continues to grow. As a salesperson, you will also be the companies' primary source of information and advisor, providing them with tips and tricks they should know before the trade show. No prior sales experience is required, but it is, of course, a plus.",
        "Sponsorresponsible - As the Sponsorship Manager, you will contact companies that won't have a booth at the trade show but still want to gain visibility in other ways. You will also assist in organizing lunch lectures and other corporate events. Your responsibilities will involve working closely with the PR team and the rest of the project group."
      ]
    },
    massGroup:{
      header: "Exhibition Team",
      text: "The Trade Fair Group is the heart and brain behind D-Day's trade fair and events. The group consists of a dedicated team with various responsibilities, and their collaboration is crucial to ensure that everything runs smoothly and that visitors have a memorable experience.",
      roles: [
        "Fair Manager - As the Fair Manager, you are the leader of the Fair Team. You drive and organize the group and ensure that everyone has what they need. Since you work closely within the Fair Team, you will become very cohesive. As the Fair Manager, you will also communicate extensively with DDA's.",
        "Logistics Manager - Logistics is the backbone of all major organizations, and it's you who ensures that everything runs smoothly like a well-oiled machine. You will receive and send deliveries from the companies and ensure that everything we need during the day is where it's needed when it's needed.",
        "HR Manager - When D-Day gets underway in Nymble, we need much more personnel than just the project group. This is where your primary responsibility lies. You will recruit staff, conduct their team-building activities, and plan their schedules for the day. You will also ensure that D-Day meets the JML standards.",
        "Lounge Manager - The lounge is where the company representatives and staff can come during the day to take a break and relax. Your job is to ensure they can expect good food and the best service possible!",
        "Party Manager - The Party Manager is the one who organizes all the major events like the company banquet and the thanksgiving dinner. You will also plan and execute most of the project group's internal events and team-building activities. This is a perfect role for someone who is creative and enjoys having fun with others.",
        "Venue Manager - Without a place to be, it becomes much more challenging to have successful events. You will become an expert on the venues in Nymble and ensure that we follow their instructions and requirements. You will also assist in booking venues for D-Day's other events.",
    ]
    },
    ecoGroup:{
      header: "Finance Team",
      text: "The Finance Team is a key component within D-Day, responsible for maintaining a strong and stable economy. Through their meticulous work, the team ensures that D-Day can continue to grow and deliver high-quality events without financial obstacles.",
      roles: [
        "Finance Manager - You have a handle on finances. You are an expert in bookkeeping (or at least have some knowledge, with instructions available). Together with the Vice Treasurer, you will send out and record all invoices when D-Day has come to an end. You will also be an advisor when it comes to budgeting and bookkeeping for the rest of the project group.",
        "Vice Finance Manager - This is one of the more flexible roles in the project group. Officially, you have relatively little responsibility as your main task is to learn how to bookkeep and assist the Treasurer. For this reason, we hope that you are a proactive person who steps up and goes beyond your regular duties, helping out wherever the rest of the project group may need an extra hand."
    ]
    },
    
  }
};
