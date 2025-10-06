export default {
  locale: "en" as const,
  titles: {
    home: "D-Dagen - Konglig Datasektionen",
  },
  about: "About Us",
  home: {
    introFirstBlock:
      "Scandinavia’s largest Career Fair for Computer Science students is celebrating its 25th anniversary",
    introSecondBlock:
      "Are you studying Computer Science or IT looking for your future workplace, or do you represent a company searching for talented co-workers?",
    introThirdBlock:
      "Then D-Dagen is the perfect opportunity for you to meet people in the industry and expand your network with valuable contacts! This year, D-Dagen is celebrating its grand 25th anniversary, which means the fair will be bigger and better than ever, with over 100+ exhibitors and 3000+ participants.",
    introSignOff: "This is a celebration you do not want to miss!\n Hope to see you there!",
    introDDA: "Max Berglund & Mortada Nasser, Project Managers",
    representative: "Company Representative?",
    representativeDescription:
      "Do you want to reach thousands of Computer Science Engineering students at KTH? As an exhibitor at D-Dagen you have the opportunity to do so! Click the button below to read more and make an application of interest .",
    representativeButton: "Interest Registration",
    info: {
      firstPart: "October 9th",
      secondPart: "10:00 AM - 4:00 PM",
      thirdPart: "KTH",
    },
    countDown:{
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
    },
    stats: [
      {
        value: "100+",
        type: "Exhibitors last year"
      },
      {
        value: "3000+",
        type: "Visitors"
      },
      {
        value: "25th",
        type: "Anniversary"
      },
      {
        value: "100%",
        type: "Possibilites"
      },
    ],
  },
  forCompanies: {
    title: "For Companies",
    guideText: "Welcome to D-Dagen! Here is a guide for companies on how to maximize your presence and get the most out of the fair.",
    guideButtonText: "Read the Guide",
    guidePath: "https://ddagen.se/downloadables/Exhibitors_Guide_to_D-Dagen_ENG.pdf",
    aboutFair: "About the fair",
    fairText1:
      "D-Dagen is the Computer Science Chapter's annual career fair. It is an all-day event where companies and students studying computer science and IT get the opportunity to connect and get to know each other. This creates good opportunities for a more direct and personal contact between company representatives and students.",
    fairText2:
      "This year the fair is held on October 9th in the THS student union building, Nymble, which is located at Drottning Kristinas väg 15-19 on the KTH Campus Valhallavägen. During the day there will be a lounge for exhibitors, and in the evening a banquet will be organized to end the day.",
    companyPackages: {
      title: "Does your company want to reach thousands of engineering students at KTH?",
      text: "We offer several different packages for companies:",
      text2: "Prices are found in the Product Catalog above or by contacting ",
      packages: [
        {
          title: "Small Package",
          boldFirstPoint: false,
          bulletPoints: [
            "4 m² at the fair",
            "Spot on the website and catalog",
            "2 lunch/breakfast tickets",
            "5 representative spots",
            "1 standing table, 2 power outlets",
            "2 banquet tickets*",
            "Free access to the company lounge",
            "A designated Company Host for service",
            "Limited storage & reception of deliveries"
          ],
          disclaimers: [
            "A total of 8 drink tickets included for the banquet"
          ]
        },
        {
          title: "Medium Package",
          className: "border-cerise border-4",
          discount: {
            amount: "-3%",
            className: "bg-cerise"
          },
          boldFirstPoint: true,
          bulletPoints: [
            "Everything from the Small Package",
            "6 m² at the fair",
            "Good placement at the fair",
            "1 extra lunch/breakfast ticket",
            "Exposure on our social media",
            "Medium-sized logo on our website",
            "Contact meetings, 2 hours",
            "Unlimited storage & reception of deliveries",
          ],
          disclaimers: [
          ]
        },
        {
          title: "Large Package",
          className: "border-gold border-4",
          discount: {
            amount: "-5%",
            className: "bg-gold"
          },
          boldFirstPoint: true,
          bulletPoints: [
            "Everything from the Medium Package",
            "8 m², at least 4m ceiling height",
            "Central placement at the fair",
            "1 extra standing table, lunch/breakfast ticket",
            "2 extra banquet tickets",
            "Exposure on approximately 1000 goodie bags with a large logo",
            "1 representative in a scheduled panel discussion",
            "Sponsored post on our social media with custom content",
            "Large logo on our website",
          ],
          disclaimers: [
          ]
        },
      ]
    },
    interestedTitle: "Interested?",
    interestedText:
      "Are you interested in exhibiting on D-Dagen and connecting with thousands of students in Computer Science and IT? Click below to sign up!",
    formButton: "Sign up",
  },
  forSponsors: {
    title: "For Sponsors",
    aboutFair: "About the fair",
    fairText1: "D-Dagen is a premier career fair connecting sponsors with top IT and computer science students at KTH. As a sponsor, you gain exposure, engagement, and the chance to build valuable relationships with future tech talent.",
    fairText2: "Held on October 9th at KTH Campus, D-Dagen attracts thousands of students and offers strong visibility both on-site and online—perfect for showcasing your brand and products in a dynamic setting.",
    companyPackages: {
      title: "Become a sponsor of D-Dagen!",
      text: "We offer several sponsor packages that give your company great visibility and engagement with KTH students.",
      text2: "Interested in tailored sponsorship or have questions? Contact ",
      packages: [
        {
          title: "MINI PACKAGE",
          costTitle: "Company contribution:",
          cost: "Products of minimum 2000:- value",
          offerTitle: "Sponsorship perks:",
          boldFirstPoint: false,
          bulletPoints: [
            "Distribution and exposure of your products among students"
          ],
          disclaimers: []
        },
        {
          title: "STANDARD PACKAGE",
          className: "border-cerise border-4",
          costTitle: "Company contribution:",
          cost: "Products of minimum 5000:- value",
          offerTitle: "Sponsorship perks:",
          boldFirstPoint: true,
          bulletPoints: [
            "Everything from the MINI PACKAGE",
            "Exposure of your products on our social media",
            "Ad placement on our website"
          ],
          disclaimers: []
        },
        {
          title: "PREMIUM PACKAGE",
          className: "border-gold border-4",
          costTitle: "Company contribution:",
          cost: "Products of minimum 10 000:- value",
          offerTitle: "Sponsorship perks:",
          boldFirstPoint: true,
          bulletPoints: [
            "Everything from the STANDARD PACKAGE",
            "Ad placement and special exposure on our website",
            "We organize a giveaway contest with special exposure of your products",
            "Designated distribution area for your products at the fair",
            "Opportunity for additional sponsored events based on your preferences"
          ],
          disclaimers: []
        }
      ]
    },
    interestedTitle: "Interested?",
    interestedText:
      "Are you interested in being a sponsor on D-Dagen and reaching out to thousands of students in Computer Science and IT? Reach out to ",
  },
  forStudents: {
    title: "For Students",
    guideText: "Welcome to D-Dagen! Here is a guide for students to get the most out of the fair.",
    guideButtonText: "Read the Guide",
    guidePath: "https://ddagen.se/downloadables/Studentens_guide_till_D-Dagen.pdf",
    aboutFair: "About the fair",
    fairText1:
      "D-Dagen is the Computer Science Chapter's annual career fair. It is an all-day event where companies and students studying computer science and IT get the opportunity to connect and get to know each other. This creates good opportunities for a more direct and personal contact between company representatives and students.",
    fairText2:
      "This year, the fair is held on October 9th in the THS student union building, Nymble, which is located at Drottning Kristinas väg 15 and in KTH Entré which is located at Drottning Kristinas väg 4. Students will be able to have meetings with exhibitors through company meetings in order to get more of a connection with that company (limited slots per company).",
    eventPageButton: "D-Dagen Events",
    companyMeetings: "Company Meetings",
    companyMeetingsText:
      "We offer company meetings for students, which means that you will be able to discuss future job opportunities in a private room with representatives from selected companies. Sign up on the link below:",
    tempCompanyMeetingsText:
      "We offer company meetings for students, which means that you will be able to discuss future job opportunities in a private room with representatives from selected companies. Sign up will be available soon!",
    companyMeetingsPageButton: "Read more",
    companyMeetingsButton: "Sign up",
    dayStaffTitle: "Day Staff",
    dayStaffText: "Would you like to help make our career fair a success? We are looking for enthusiastic students to assist on the day of the event with tasks such as welcoming visitors, supporting exhibitors, and keeping the venue organized. It's a great opportunity to network, meet companies, and gain valuable experience.",
    dayStaffApplicationOpens: "Application opens on September 2nd",
    dayStaffApply: "Apply here!",
    banquetTitle: "The D-Dagen Banquet",
    banquetText: "The D-Dagen Banquet has long been a student favorite — if you're lucky, you might land both a new job and a really great evening all in one go! Not to be forgotten are the delicious food, the charming company representatives, and the excellent drink tickets, also known as \'Barbongar\'.",
    banquetButton: "Sign up",
    panelDiscussionsTitle: "Panel Discussions",
    panelDiscussionsText: "Representatives from various companies will participate in panel discussions on IT-related topics. We encourage you to attend these to deepen your knowledge of current industry trends and explore which direction best matches your future career interests—whether it's cybersecurity, artificial intelligence, or fintech.",
  },
  students: {
    info:{
      mainHeader: "Fill out information about yourself",
      subHeader: "Upload your resume to save. Once the resume is uploaded, you can save your information and gain access to the company meeting page.",
      header:"Fill in information about yourself!",
      firstName:"First name",
      lastName:"Last name",
      year:"Year",
      email:"Add email",
      cv: "Resume",
      save: "Save",
      saved: "Saved",
      failed: "Failed to save, try again",
      addFirstName: "Enter your first name",
      addLastName: "Enter your last name",
      addYear: "Enter your year",
    },
    interests:{
      header: "Fill in your job offer interests",
    },
    companyInterests:{
      header: "Select the companies you are interested in meeting",
      deadlineHeader: "You have shown interest in these companies",
      description: "Click on the companies you are interested in meeting for a company meeting. The companies will then send you invitations to meetings.",
      checked1:"You have shown interest in meeting with ",
      checked2:" for a company meeting.",
      deadline: "The deadline to show interest for a company is the 7th october 19:00."
    },
    companyMeeting:{
      offerText: " Has invited you to a company meeting",
      acceptDeclineText: "Choose a time to accept the offer or decline the offer",
      chooseOption: "Choose a time:",
      acceptedText: "You have accepted the meeting",
      noTimesLeft: "No times left",

      status: {
        accepted:"You have accepted the offer",
        declined: "You have declined the offer",
        failed: "Failed to book meeting, try again",

      },

      meetingTimeText: "You have a meeting at",
      acceptedTime: "Time:",

      stopDelete: "Go back",
      confirmDelete: "Are you sure you want to cancel the meeting?",
      cancelMeeting: "Cancel meeting",
      cancelWarning: "You lose your meeting spot if you cancel",
    },
    offersTitle: "Company meeting offers",
    offersTitle1: "You have ",
    offersTitle2: " un answered company invitations",
  },
  exhibitorSettings: {
    startHeader: "Time to set up your profile",
    startButton: "Start",

    previousPage: "Previous",
    nextPage: "Next",
    lastPage: "Done",
    lastPageText: "You will be able to edit your information later on",
    lastPageWarning: "By pressing Done I comfirm that I have read through all the input fields and have provided the correct information!",

    consentWarning: "Please answer the marketing consent question.",

    start: {
      about: "ABOUT THE COMPANY",
      info: "We are interested in getting to know you better. Please fill in the following information in order for us at D-Dagen to help you find your future coworkers!",
      start: "START",
    },
    step0: {
      generalInfo: "GENERAL INFORMARTION",
      logoWhite: "White Logo",
      logoColour: "Logo w/ colour",
      description: "Description",
      industry: "Industry",
      allowMarketing: "Would you like to reach out to more potential candidates via free extra marketing via Kollin?",
      format: "SVG or PNG",
      yes: "Yes",
      no: "No",
    },
    step1: {
      title: "JOB OFFERS",
    },
    step2: {
      title: "CONTACTS",
    },
    back: "BACK",
    next: "NEXT",
    step: "STEP",
    header: "Profile Settings",
    fields: {
      invoiceEmail: "Invoice email",
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
      companyName: "Company name",
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
          placeholderTextIndustry: "Our industry",
          logo: "Logo",
          logoWhite: "White Logo",
          logoColour: "Logo w/ colour",
          or: "or",
          industry: "Industry",
          numPeople: "Please bring no more than five representatives to the fair"
        },
        section2: {
          header: "Job Offers",
          year: {
            one: "YEAR 1",
            two: "YEAR 2",
            three: "YEAR 3",
            four: "YEAR 4",
            five: "YEAR 5",
          },
          jobs: {
            summer: "SUMMER JOB",
            internship: "INTERNSHIP",
            partTime: "PART-TIME JOB",
          },
          other: {
            thesis: "MASTER THESIS",
            fullTime: "FULL-TIME JOB",
            trainee: "TRAINEE PROGRAM",
          },
          industry: {
          tech: "TECH",
            finance: "FINANCE",
            consulting: "CONSULTING",
          },
          save: "Save",
        },
        section3: {
          header: "Contacts",
          info: "Add company contacts, contacts are able to view and edit this page",
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
        fileTypeNotSupported:
          "Error uploading file: Only the pdf format is supported.",
        fileDataMalformed: "Error uploading file to our system: The file is malformed.",
      },
      row2: {
        title: "Your Package And Extra Orders",
        packages: {
          tier0: "Small",
          tier1: "Medium",
          tier2: "Large",
          tier3: "Main Sponsor",
          tier4: "Startup",
        },
        packageList: [
          "Small",
          "Medium",
          "Large",
          "Main Sponsor",
          "Startup",
        ],
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
          drinkCoupons: "Drink Coupons with alcohol",
          alcFreeTicket: "Drink coupons without alcohol",
          mealCoupons: "Breakfast/Lunch Coupons",
          lastChanged: "Last Changed: ",
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
        warning: "Last date for ordering ",
        usagenotice: "Only specify for those who have special dietary requirements",
        section1: {
          header: "During the Fair",
          paragraphOne:
            "These food preferences are used for breakfast and lunch during the fair.",
          paragraphTwo: "You change the number in extra orders.",
        },
        section2: {
          header: "Dinner Party",
          paragraphOne:
            "These food preferences are used for the seating after the fair.",
          paragraphTwo: "You change the number in extra orders",
          paragraphThree: "If nothing specific is chosen for a member the default preference will be served",
        },
        preferencesHeader: "Preferences (vegetarian is default)",
        options: {
          vegetarian: "Vegan",
          lactoseFree: "Lactose-Free",
          glutenFree: "Gluten-Free",
          meat: "Meat",
          alcoholFree: "Alcohol-Free",
        },
        alerts: {
          errorDeletePreferenceWithoutID:
            "Can not identify food preference to delete.",
          errorEmptyValueArray: "You have to select an option",
          errorAddingMorePreferencesThanAllowed: (max: number) =>
            `You've reached the maximum amount (${max}) of preferences allotted to you`,
        },
      },
      row4: {
        title: "Student Meetings",
        psa: "This functionality will open on the {date}",
        save: "Save",
        info: "Choose which students you want to meet during the fair",
        section1: {
          title: "How does it work?",
          info1: "Student choose companies they want to meet",
          info2: "You will then be able to select which of these students you want to meet",
          info3: "The students will then be able to choose a time slot to meet you, during the fair",
          info4: "You will be able to select more students than the amout of avaiable timeslots and the first students to accept will then get the timeslots",

        },
        section2: {
          selectAll: "Select all",
          deselectAll: "Deselect all",
          search: "Search",
        },
      },
        row5: {
          title: "Billing Information",
          section1: {
            header: "Billing Information",
            organizationNumber: "Organization Number",
            placeholderTextOrganizationNumber: "Enter your organization number",
            email: "Email",
            placeholderTextEmail: "Enter the email for invoicing",
            physicalAddress: "Address",
            placeholderTextPhysicalAddress: "Enter companyaddress (Ex. Drottning Kristinas väg 15-19)",
            billingMethods: ["PDF Invoice", "E-Invoice"],
            billingMethodText: "Billing Method",
            placeholderTextBillingMethod: "Enter billing method",
          },
        },
    },
    meetings: {
      title: "Company Meetings",
      columns: ["","Name", "Year", "CV", "Other"],
      columns2: ["Name", "Year", "CV", "Other"],
      columns3: ["Time", "Name", "Year", "CV", "Cancel Meeting"],
      checkAll: "Select all",
      unCheckAll: "Deselect all",
      filter: "Filter",
      year: "Year interval",
      cancel: "Cancel",
      cancelStep: "Cancel",
      confirm: "Confirm",
      selectedStudents: "selected students",
      pendingMeetings: "pending meeting requests",
      bookedMeetings: "booked meetings",
      bookSelected: "Send meeting request",
      caution: "Student meetings are not available on phones",
      noTimesLeft: "No times left",
      pages: {
        interested: "Interested students",
        pending: "Pending requests",
        accepted: "Accepted requests",
      }

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
    emailBody: (code: string, link: string) =>
    "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
      "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
        "<tbody>" +
          "<tr>" +
            "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
              "<p>" +
                "Hi!<br />" +
              "</p>" +
            "</div>" +
          "</tr>" +
          "<tr>" +
            "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +
              "<p style=\"color:#ffffff;\">To complete your login to D-Dagen, please visit the following link:" +
              "<br /><a href=\"" + link + "\" style=\"color:#0000FF;text-decoration:underline\">" + link + "</a>" +
              "<br />or enter the code: <span style=\"color:#FFFF00\">" + code + "</span> <span style=\"color:#FFFFFF\"> on the login page.</span></p>" +
            "</div>" +
          "</tr>" +
          "<tr>" +
            "<div style=\"padding: 10px 30px 30px; background:#DE3163;color:#ffffff;\" >" +
              "<p>If you did not try to log in, you can ignore this email.</p><br>" +
              "<p>Best regards,</p>" +
              "<p>The D-Dagen project group</p><br>" +
            "</div>" +
          "</tr>" +
        "</tbody>" +
      "</table>" +
      "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\">" +
        "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\"></img>" +
      "</a>" +
    "</div>"
  },
  companyForm: {
    title: "Sign up for D-Dagen",
    description:
      "Fill in this form to sign up your company for D-Dagen 2025. Please note that signing up through to this form is not binding.",
    fields: {
      name: "Company Name",
      foreignOrganization: "Foreign organization",
      organizationNumber: "Organization Number",
      email: "Email Address",
      contactPerson: "Contact Person",
      phoneNumber: "Phone Number",
    },
    confirm: "Send",
    ignoreError: "Continue anyway",
    noMoreRegistrations:
      "Registrations for D-Dagen 2025 have not yet opened. Keep an eye on our social media for when it opens!",
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
    forCompanies: "For companies ",
    forSponsors: "Sponsors",
    forStudents: "For students",
    about: "About",
    companyForm: "Exhibitor Registration",
    changeLanguage: "Change language to Swedish",
    contact: "Contact  ",
    event: "Event",
    history: "History ",
    exhibitorSettings: "Settings",
    login: "Log in",
    logout: "Log out",
    catalog: "Catalog",
    logos: "Our Exhibitors",
    meetings: "Company Meetings",
    map: "Map",
    sok: "Signup for D-Dagen",
  },
  footer: {
    header: "Organized by Datasektionen",
    about:
      "Datasektionen, or the Computer Science Chapter is a non-profit student chapter under THS which exists to give all CS students at KTH the best study time possible.",
    contactHeader: "Contact",
    responsible: "Project Managers",
    salesGroup: "Sales Team",
    sponsorText: "Main sponsor for D-Dagen 2025",
    sponsorLink: "https://en.omegapoint.se",
    notDecided: "Main sponsor for D-Dagen 2025 will be shown here",
  },
  newExhibitorEmail: {
    emailSubject: "D-Dagen Exhibitor Account Created",
    emailBody: (email: string) =>
    "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
      "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
        "<tbody>" +
          "<tr>" +
            "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
              "<p>" +
                "Hi!<br />" +
              "</p>" +
            "</div>" +
          "</tr>" +
          "<tr>" +
            "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +
              "<p style=\"color:#ffffff;\">We are pleased to confirm your exhibitor account has been created." +
              "<br />Visit <a href=\"https://ddagen.se/utställare\" style=\"color:#0000FF;text-decoration:underline\">https://ddagen.se/utställare</a>" +
              "and log in with the email: <span style=\"color:#FFFF00\">" + email + "</span></p>" +
            "</div>" +
          "</tr>" +
          "<tr>" +
            "<div style=\"padding: 10px 30px 30px; background:#DE3163;color:#ffffff;\" >" +
              "<p>If you did not try to log in, you can ignore this email.</p><br>" +
              "<p>Best regards,</p>" +
              "<p>The D-Dagen project group</p><br>" +
            "</div>" +
          "</tr>" +
        "</tbody>" +
      "</table>" +
      "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\">" +
        "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\"></img>" +
      "</a>" +
    "</div>"
  },
  email: {
    subject: "Exhibitor Registration Confirmation",
    body: (
      companyName: string,
      organizationNumber: string,
      email: string,
      contactPerson: string,
      phoneNumber: string
    ) =>
      "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
          "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
            "<tbody>" +
              "<tr>" +
                "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
                  "<p>" +
                    "Hi!<br><br>" +
                  "</p>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +
                  "<p>We are pleased to confirm we have received your exhibitor registration. " +
                    "We will contact you during the spring about whether you got a spot at D-Dagen. " +
                    "You can expect to hear from us during spring. </p><br><br>" +
                  "<p>Here are the details of your registration: </p><br><br>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style\"background:#DE3163;color:#ffffff;\">" +
                  "<ul style=\"padding:20px 30px; margin: 0; background:#DE3163;color:#ffffff;\">" +
                    "<li style=\"margin: 4px; padding: 2px;color:#ffffff;\"> Company name: " + companyName + "</li>" +
                      ((organizationNumber[0] != '0') ? "<li>Organisationsnummer: " + organizationNumber + "</li>" : "") +
                    "<li style=\"margin: 4px; padding: 2px;color:#ffffff;\"> Email address: " + email + "</li>" +
                    "<li style=\"margin: 4px; padding: 2px;color:#ffffff;\"> Contact person: " + contactPerson + "</li>" +
                    "<li style=\"margin: 4px; padding: 2px;color:#ffffff;\"> Phone number: " + phoneNumber + "</li>" +
                  "</ul>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style=\"padding: 0 30px 30px; background:#DE3163;color:#ffffff;\" >" +
                  "<br><br><p> If any of the information above is incorrect or if you have any other questions, " +
                    "do not hesitate to contact our sales team at sales@ddagen.se. </p><br>" +
                  "<p>Thank you for your registration and we look forward to a successful event. </p><br>" +
                  "<p>Best regards, </p><br>" +
                  "<p>The D-Dagen project group</p><br><br>" +
                "</div>" +
              "</tr>" +
            "</tbody>" +
          "</table>" +
        "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\" >" +
          "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\" ></img>" +
        "</a>" +
      "</div>",
  },
  meeting_email: {
    meeting_request_to_student: {
      subject: (
        companyName: string
      ) => `Meeting Request from ${companyName}`,
      body: (
        firstName: string,
        lastName: string,
        companyName: string
      )=>
    "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
        "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
          "<tbody>" +
            "<tr>" +
              "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
                "<p>" +
                  "Hi " + firstName + " " + lastName + "!<br />" +
                "</p>" +
              "</div>" +
            "</tr>" +
            "<tr>" +
              "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +                
                "<p style=\"color:#ffffff;\">We are pleased to confirm that " + companyName + " wants a meeting with you."+
                "<br />Visit <a href=\"https://ddagen.se/student\" style=\"color:#0000FF;text-decoration:underline\">https://ddagen.se/student</a>" +
                " to choose a time for the meeting: </p>" +
              "</div>" +
            "</tr>" +
            "<tr>" +
              "<div style=\"padding: 10px 30px 30px; background:#DE3163;color:#ffffff;\" >" +
                "<p style=\"color:#ffffff;\">PS: When choosing a time, it is --First come first served-- among the students." +
                "<br />Best regards," +
                "<br />The D-Dagen Project Group" +
                "<br /><a href=\"mailto:sales@ddagen.se\" style=\"color:#ffffff;text-decoration:underline\">sales@ddagen.se</a></p>" +
              "</div>" +
            "</tr>" +
          "</tbody>" +
        "</table>" +
        "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\">" +
          "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\"></img>" +
        "</a>" +
      "</div>",
    },
    meeting_declined_by_student: {
      subject: (
        firstName: string,
        lastName: string
      )=>
         `Meeting Declined by ${firstName} ${lastName}`,
      body: (
        firstName: string,
        lastName: string,
      )=>
      "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
        "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
          "<tbody>" +
            "<tr>" +
              "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
                "<p>" +
                  "Hi!<br />" +
                "</p>" +
              "</div>" +
            "</tr>" +
            "<tr>" +
              "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +                
                "<p style=\"color:#ffffff;\">We regret to inform that " + firstName + " " + lastName + " has declined your meeting offer."+
                "<br />Log in to <a href=\"https://ddagen.se/utställare\" style=\"color:#0000FF;text-decoration:underline\">https://ddagen.se/utställare</a>" +
                " to handle the process of student meetings. </p>" +
              "</div>" +
            "</tr>" +
            "<tr>" +
              "<div style=\"padding: 10px 30px 30px; background:#DE3163;color:#ffffff;\" >" +
                "<br />Best regards," +
                "<br />The D-Dagen Project Group" +
                "<br /><a href=\"mailto:sales@ddagen.se\" style=\"color:#ffffff;text-decoration:underline\">sales@ddagen.se</a></p>" +
              "</div>" +
            "</tr>" +
          "</tbody>" +
        "</table>" +
        "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\">" +
          "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\"></img>" +
        "</a>" +
      "</div>",
    },
    meeting_deleted_by_student: {
      subject: (
        firstName: string,
        lastName: string
      )=>
         `Meeting Cancelled by ${firstName} ${lastName}`,
      body: (
        firstName: string,
        lastName: string,
      )=>
        "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
          "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
            "<tbody>" +
              "<tr>" +
                "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
                  "<p>" +
                    "Hi!<br />" +
                  "</p>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +                
                  "<p style=\"color:#ffffff;\">We regret to inform that " + firstName + " " + lastName + " has canceled your meeting."+
                  "<br />Log in to <a href=\"https://ddagen.se/utställare\" style=\"color:#0000FF;text-decoration:underline\">https://ddagen.se/utställare</a>" +
                  " to handle the process of student meetings. </p>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style=\"padding: 10px 30px 30px; background:#DE3163;color:#ffffff;\" >" +
                  "<br />Best regards," +
                  "<br />The D-Dagen Project Group" +
                  "<br /><a href=\"mailto:sales@ddagen.se\" style=\"color:#ffffff;text-decoration:underline\">sales@ddagen.se</a></p>" +
                "</div>" +
              "</tr>" +
            "</tbody>" +
          "</table>" +
          "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\">" +
            "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\"></img>" +
          "</a>" +
        "</div>",
    },
    meeting_deleted_by_company: {
      subject: (
        companyName: string
      )=>`Meeting Cancelled by ${companyName}`,
      body: (
        firstName: string,
        lastName: string,
        companyName: string,
      )=>
      "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
        "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
          "<tbody>" +
            "<tr>" +
              "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
                "<p>" +
                  "Hi " + firstName + " " + lastName +"!<br />" +
                "</p>" +
              "</div>" +
            "</tr>" +
            "<tr>" +
              "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +                
                "<p style=\"color:#ffffff;\">We regret to inform that " + companyName + " has canceled your meeting."+
                "<br />Log in to <a href=\"https://ddagen.se/student\" style=\"color:#0000FF;text-decoration:underline\">https://ddagen.se/student</a>" +
                " to handle your meetings. </p>" +
              "</div>" +
            "</tr>" +
            "<tr>" +
              "<div style=\"padding: 10px 30px 30px; background:#DE3163;color:#ffffff;\" >" +
                "<br />Best regards," +
                "<br />The D-Dagen Project Group" +
                "<br /><a href=\"mailto:sales@ddagen.se\" style=\"color:#ffffff;text-decoration:underline\">sales@ddagen.se</a></p>" +
              "</div>" +
            "</tr>" +
          "</tbody>" +
        "</table>" +
        "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\">" +
          "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\"></img>" +
        "</a>" +
      "</div>",
    },
    meeting_completed_to_company: {
        subject: (
          firstName: string,
          lastName: string,
          companyName: string
        )=> `Meeting Confirmed – ${companyName} and ${firstName} ${lastName}`,
        body: (
          firstName: string,
          lastName: string,
          companyName: string,
          time: string,
          location: string,
        )=>
        "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
          "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
            "<tbody>" +
              "<tr>" +
                "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
                  "<p>" +
                    "Hi! " + companyName + " <br />" +
                  "</p>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +                
                  "<p style=\"color:#ffffff;\">This is a confirmation for your student meeting with " + firstName + " " + lastName + "." +
                  "<br />Time: " + time +
                  "<br />Location: " + location +
                  "<br />Log in to <a href=\"https://ddagen.se/utställare\" style=\"color:#0000FF;text-decoration:underline\">https://ddagen.se/utställare</a>" +
                  " to handle your meetings. </p>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style=\"padding: 10px 30px 30px; background:#DE3163;color:#ffffff;\" >" +
                  "<br />Best regards," +
                  "<br />The D-Dagen Project Group" +
                  "<br /><a href=\"mailto:sales@ddagen.se\" style=\"color:#ffffff;text-decoration:underline\">sales@ddagen.se</a></p>" +
                "</div>" +
              "</tr>" +
            "</tbody>" +
          "</table>" +
          "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\">" +
            "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\"></img>" +
          "</a>" +
        "</div>",
      },
      meeting_completed_to_student: {
        subject: (
          firstName: string,
          lastName: string,
          companyName: string
        )=> `Meeting Confirmed – ${companyName} and ${firstName} ${lastName}`,
        body: (
          firstName: string,
          lastName: string,
          companyName: string,
          time: string,
          location: string,
        )=>
        "<div style=\"padding:0;font-family:Arial, sans-serif;font-size: 16px; line-height:1.6; max-width: 600px; \">" +
          "<table style=\"box-sizing:border-box;background:#DE3163; border: 30px solid #14112A; border-width: 30px;border-color: #14112A;border-type: solid; padding: 0;color:#ffffff;border-radius:10px 10px 0 0; max-width: 600px;\" width=\"100%\">" +
            "<tbody>" +
              "<tr>" +
                "<div style=\"padding: 30px 30px 0; font-size:24px; background:#DE3163;color:#ffffff;\">" +
                  "<p>" +
                    "Hi " + firstName + " " + lastName + "!<br />" +
                  "</p>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style=\"padding: 5px 30px; background:#DE3163;color:#ffffff;\" >" +                
                  "<p style=\"color:#ffffff;\">This is a confirmation for your student meeting with " + companyName + "." +
                  "<br />Time: " + time +
                  "<br />Location: " + location +
                  "<br />Log in to <a href=\"https://ddagen.se/student\" style=\"color:#0000FF;text-decoration:underline\">https://ddagen.se/student</a>" +
                  " to handle your meetings. </p>" +
                "</div>" +
              "</tr>" +
              "<tr>" +
                "<div style=\"padding: 10px 30px 30px; background:#DE3163;color:#ffffff;\" >" +
                  "<br />Best regards," +
                  "<br />The D-Dagen Project Group" +
                  "<br /><a href=\"mailto:sales@ddagen.se\" style=\"color:#ffffff;text-decoration:underline\">sales@ddagen.se</a></p>" +
                "</div>" +
              "</tr>" +
            "</tbody>" +
          "</table>" +
          "<a href=\"https://ddagen.se/en\" alt=\"Link to ddagen.se\">" +
            "<img src=\"https://ddagen.se/img/email-signatur.png\" alt=\"Ddagen logga\" width=\"600\" height=\"auto\" style=\"width: 100%; height: auto; display: block; max-width: 600px;\"></img>" +
          "</a>" +
        "</div>",
      },
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
    table1text2: "This year's D-Dagen is taking place on October 9th.",
    table1text3:
      "D-Dagen will be held at Nymble, the student union house, located at the KTH Royal Institute of Technlogy in Stockholm.",
    table2row1: "CAN OUR COMPANY GET MORE EXPOSURE?",
    table2row2: "CAN OUR COMPANY MARKET JOB OFFERS ETC THROUGH D-DAGEN?",
    table2text1:
      "Absolutely, we have several different packages to help you reach more students, contact <a className='text-yellow' href='mailto:sales@ddagen.se'>sales@ddagen.se</a> for more information.",
    table2text2:
      "Yes, the main purpose of D-Dagen is to market career opportunities such as job offers, trainee programs, summer internships and similar initiatives to our students.",
    table3row1: "HOW DO I REGISTER FOR THE FAIR?",
    table3row2: "WHEN IS THE LAST DAY TO REGISTER FOR THE FAIR?",
    table3row3: "HOW DO WE BECOME A PARTNER?",
    table3row4: "WE WOULD LIKE MORE INFORMATION, WHERE DO WE TURN?",
    table3row5: "ARE YOU A STARTUP?",
    table3row6: "HOW DO STUDENT METTINGS WORK?",
    table3row7: "HOW DO THE PANEL DISCUSSIONS WORK?",
    table3text1:
      "You can make a <a href='https://ddagen.se/företagsanmälan' target='blank' className='underline text-yellow'>  registration of interest </a> or contact our sales team at <a className='text-yellow' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text2:
      "Since we have a limited number of spots available at our fair, we recommend that you make a non-binding registration of interest. To do this, please click here: <a href='https://ddagen.se/en/företagsanmälan' target='blank' className='underline text-yellow'> Registration</a>.",
    table3text3:
      "If you are interested in any type of partnership contact <a className='text-yellow' href='mailto:ansvarig@ddagen.se'>ansvarig@ddagen.se</a>.",
    table3text4:
      "If the information you are looking for can't be found at our website, contact us at <a className='text-yellow' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text5:
      "Contact us at <a className='text-yellow' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>.",
    table3text6:
      "The student meetings are a great opportunity for companies and students to meet in a more personal setting. The students will choose which companies they want to meet, and the company will then be able to select which of these students they want to meet. The students will then be able to choose a time slot to meet the company, during the fair. Read more about it <a href='https://ddagen.se/en/kontaktsamtal' target='blank' className='underline text-yellow'>here</a>.",
    table3text7:
      " During the fair, three panel discussions are held, each focusing on a topic relevant to the IT industry and moderated by D-Dagen. These sessions give students the opportunity to learn what it's like to work in the IT field, as well as to listen to engaging and insightful discussions between a select group of company representatives from various organizations.",
    table4row1:
      "WHAT KIND OF EVENTS CAN OUR COMPANY HOST TOGETHER WITH D-DAGEN?",
    table4text1:
      "We'd be thrilled to collaborate with you, both before and after D-Dagen! Whether you're interested in hosting a lunch lecture, hackathon, or something completely different, we're open to your ideas. For more information, please contact our sponsorship manager at <a className='text-yellow' href='mailto:jamie.groop@ddagen.se'>jamie.groop@ddagen.se</a>.",
    productCatalog: "PRODUCT CATALOG",
    header: "COMPANY FAQ",
    catalogPath: "https://ddagen.se/downloadables/Product_Catalog_2025_en.pdf",
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
      "LEAD DEVELOPER",
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
    name: [
     "Small",
     "Medium",
     "Large",
     "Main Sponsor",
     "Startup",
    ],
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
    names: ["SMALL PACKAGE",
            "MEDIUM PACKAGE",
            "LARGE PACKAGE"],
    placement: ["Random","Good","Central"],
    exposure: ["Website & brochure","Website, brochure & goodie bag","Website, brochure & goodie bag"],
    representatives: ["2","3","4"],
    sittningTickets: ["2","2","4"],
    drinkCoupons: ["8","8","16"],
    tables: ["1","1","1"],
    titles: [
      "PRICE",
      "BOOTH SPACE",
      "PLACEMENT",
      "EXPOSURE",
      "COMPANY REPRESENTATIVES",
      "TICKETS TO DINNER & AFTER PARTY",
      "DRINK COUPONS",
      "COMPANY HOST",
      "LOUNGE ACCESS",
      "TABLES",
      "ELECTRICITY AND WIFI",
      "SPONSORED POST",
      "HALF DAY PRIVATE STUDENT MEETINGS",
    ],
    downloadProductCatalog: "Download Catalog",
    subheader: "QUESTIONS, THOUGHTS, & IDEAS?",
    paragraph:
      "Don't hesitate to get in touch if you have any questions about our products or have any other questions.",
  },
  studentmeetings: {
    header: "Student Meetings",
    subheader1: "Seek opportunity",
    subheader2: "Format",
    subheader3: "Apply for student meetings",
    p1: "Student meetings are a unique opportunity for companies and students to meet one-on-one and discuss career opportunities. Students gain valuable insight into the specific workplace, while companies get an excellent understanding of the student's skills and experiences.",
    p2: "Before the meetings, companies and students are matched through our website using the following process:",
    bulletpoints: [
      "Students log in to their account on the website via <a className='text-yellow' href='https://ddagen.se/student'>ddagen.se/student</a>",
      "Upload their CV",
      "Select the companies they are interested in having a student meeting with."
    ],
    p3: "The companies then review the list of students who are interested in speaking with them and choose whom to schedule meetings with based on their student profiles and CVs.\n\nEach company is assigned a 3-hour time slot sometime during the fair (10:00–16:00), during which they can meet as many students as they are able to.\n\nWe recommend 15-minute meetings, but the exact duration is up to each individual company.\n\nKeep a close eye on your email after registering! You will need to schedule a meeting with the company if they select you. If, for any reason, the company needs to cancel the meeting, you will receive an email notifying you, and you will then have the opportunity to book a new time. \n\n The deadline for students to register their interest in contact meetings is October 7. However, it is still possible to book/reschedule meeting times with the companies after that date.",
    p4: "Create your student profile and choose companies for student meetings",
    cta: "Create Profile"
  },
  event: {
    description: "Klick on the events to read more about them!",
    lunchSeminarHeader: "Lunch Seminar",
    lunchSeminar: "Lunch lectures are an incredibly popular concept among students, offering free lunch and an interesting talk from a company in the IT industry. Takes place from 12 AM–1 PM on a weekday at the KTH campus.",
    recruitmentPub: "Recruitment Pub",
    recruitmentPubText: "During the recruitment of D-Dagen's fantastic 100+ day staff who will assist during the fair, the Project Group organizes the annual Recruitment Pub in the Computer Science chapter's own pub, Meta! Join us for a really pleasant evening with D-Dagen-related activities and competitions with sponsored prizes. Food and drinks are available to order.",
    contactConversations: "Signup for Contact Conversations closes at 23:59",
    contactConversationsText: "Contact meetings are a unique opportunity for companies and students to meet one-on-one and discuss career opportunities. Students gain a much better understanding of the conditions at a specific workplace, and companies get an excellent picture of the student's skills and experiences. Read more at http://ddagen.se/kontaktsamtal.",
    opening: "25th Anniversary Fair Opens!",
    openingCeremony: "Opening of the fair on stage in nya Matsalen together with Main Sponsor Omegapoint",
    welcome: "Welcome",
    inaugeration: "Opening",
    panelDiscussionHeader: "Panel Discussion",
    panelDiscussionHeader1: "The Future of the Fintech Industry",
    panelDiscussionHeader2: "Panel Discussion Society's Cyber Threats",
    panelDiscussionHeader3: "Panel Discussion Design & AI",
    panelDiscussion1: "The Future of the Fintech Industry with Nordea, Nore Technology, Revolut and Jane Street",
    panelDiscussion2: "How well prepared is society for today's cyber threats? with Omegapoint, Basalt and Försvarsmaktens Radioanstalt",
    panelDiscussion3: "Design and Development in the AI Era, with Atlas Copco, Electronic Arts DICE, Ubiquiti",
    panelDiscussion1text: "The panel discussion will be held in Enligsh.",
    panelDiscussion2text: "The panel discussion will be held in Swedish.",    
    panelDiscussiontext: "During the fair day, several panel discussions are held and moderated by D-Dagen, each covering an IT-relevant topic. These sessions give students the opportunity to hear what it’s like to work in the IT industry and engage in an insightful and educational discussion between a few company representatives.",
    fair: "THE FAIR",
    after: "AFTER",
    closes: "The fair closes",
    banquet: "The D-Dagen Banquet starts!",
    banquetSignup: "Deadline for registration of special diet for the D-Dagen Banquet",
    banquetSignupText: "tickets can still be purchased after this as long as there are seats left."
  },
  history: {
    header: "D-Dagen History",
    subheader: "The term ”D-Dagen” was coined as early as the year 2000, when it was the Computer Science Chapter’s industry-day with 13 attending companies in the E-building on KTH Campus. Since then, D-Dagen has grown and in 2016 it entered the student union building, Nymble. Now D-Dagen is considered to be the largest career fair in the Nordics for Computer Science students, as well as one of the largest career fairs at KTH.",
    subsubheader: "Pleace press the images to see more information about each year!",
    nrOfCompanies: "Number of companies:",
    nrOfVisitors: "Number of visitors:",
    dda: "Project Managers:",
    before2000: "Before 2000",
    before2000Text: "A functionary position called “Armu-D” was created. This was the Computer Science Chapter’s representative who, together with representatives from other chapters, was responsible for Armada — the student union’s joint career fair for all KTH students. \n Both Armu-D and the Chapter’s PR group experimented with developing the concept that would later become the Chapter’s very own career day. In 1991 and 1992, Armu-D is believed to have organized so-called “Data-Armadas.” Later in the 1990s, the ”PR group” arranged various company days under different names — including “Ericsson Day” — and invited a small number of companies to the E-building on the KTH campus. These events were usually followed by an evening gathering at ESCapen, where attendees could get free beer if they had secured a ”ölbånge” (beer token) earlier in the day.\n",
    header1988: "1988",
    text1988: "The Computer Science Chapter's 5-year anniversary organized a small industry fair and sparked interest in the concept, which is evident in dBuggen (the Computer Science Chapter's venerable chapter magazine).",
    header1983: "1983",
    text1983: "The beginning: The Computer Science Chapter was founded on October 7, 1983.",
    text2025: "25th anniversary!",
    text2024: "William & Toshihide organized D-Dagen with the most visitors ever!",
    text2023: "Axel & Johan organized D-Dagen with the most companies ever!",
    text2022: "",
    text2021: "D-Dagen was organized physically again after the Corona restrictions were eased! \n The Computer science chapter's board, through Matteus Berg, is presenting a proposal that D-Dagen and the Computer science and engineering chapter's Business and Relations Group should be officially separated in the organizational structure. The chapter's members chose to approve the proposal.",
    text2020: "Due to the Covid-19 pandemic, the first digital D-Dagen is being organized. The fair took place slightly later than usual due to hopes of lighter restrictions in the fall.",
    text2019: "Spotify was at the fair!",
    text2016: "D-Dagen enters the student union building Nymble for the first time, instead of E-Building. First person chosen for the actual role of “D-Dagen Project Manager”: Albin Söderholm, who was responsible for this year's fair.",
    text2015: "",
    text2013: "Google was at the fair!",
    text2001: "During the 2000 to 2010 period, companies’ interest in being visible to students increased significantly. As a result, the Computer Science Chapter’s career fair became a recurring event and took on a more uniform form and structure. At that time, it was coordinated by the Chapter’s “PR group,” which later evolved into the “Näringslivsgruppen” (Industry Relations Group). In early 2001, D-Dagen appears for the first time in the Chapter’s official meeting protocols, when then PR Manager Peter Lindström submitted a motion to “get more money for D-Dagen and for upcoming events in the spring.” The Chapter’s members unanimously approved his proposal.",
    text2000: "The name “D-Dagen” was coined this year! The career fair was organized by the Computer Science Chapter’s ”PR group” and was a smaller event held in the E-building (E-huset), with 13 participating companies. In the evening, attendees were also invited to the Chapter’s former premises, ESCapen, where one could get free beer if they had secured a “ölbånge” (beer token) during the career fair.",
    contact: "If you have any relevant facts about the history of D-Dagen that you would like to add, contact: ",
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
        delete: "Remove",
        companyHost: {
          name: "Company host",
          companyHostName: "Host name",
          companyHostEmail: "Host email",
          companyHostNumber: "Host telephone number",
          page: "Add a company host for ",
          empty: "We will notify you when a company host has been added",
        },
        extras: {
          name: "Extras",
          chairs: "Chairs",
          tables: "Tables",
          drinkCoupons: "Drink Coupons",
          representativeSpots: "Representative Spots",
          banquetTickets: "Banquet Tickets",
          mealCoupons: "Breakfast/Lunch Coupons",
        },
        verification: {
          name: "Verification",
          banquet: "Banquet",
          representatives: "Representatives",
        },
        specialOrders: {
          name: "Special orders",
          studentMeetings: "Student meetings",
          socialMediaPost: "Social media post",
          panelDiscussion: "Panel discussion",
          goodiebagLogo: "Goodie bag logo",
          specialOrderButton: "Change",
          specialOrderSave: "Save",
          page: "Update special orders for "
        },
        deleteExhibitor: "DELETE"
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
        confirmedBanquetTickets: "Confirmed Banquet Tickets",
        confirmedDrinkCoupons: "Confirmed Drink Coupons",
        mealCoupons: "Breakfast/Lunch Coupons",
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
    addCompany: {
      addExhibitorSuccess: {
        added: "Exhibitor added!",
        reload: "Reload the page..."
      },
      addExhibitorForm: {
        exhibitorInterest: "Interested Exhibitors",
        companyName: "Company Name",
        organizationNumber: "Organization Number",
        contactPerson: "Contact Person",
        telephoneNumber: "Telephone number",
        email: "Email",
        packageTier: "Package tier",
        studentMeetings: "Student Meetings",
        sendEmailToExhibitor: "Send Email To Exhibitor",
        mapPosition: "Map Position",
        meetingTimeSlots: "Meeting Timeslots",
      },
      addCompanyButton: "Add a company"
    },
    deleteCompanyButton: "Delete a company"
  },
  aboutUs: {
    header: "About us",
    subHeader: "Meet Project Group 2025",
    paragraph1:
      "D-Dagen is an annual trade fair organized by the Computer Science Student Association at KTH (Royal Institute of Technology). At D-Dagen, companies have the opportunity to meet and interact with potential future employees from KTH. At the same time, we offer our students a chance to learn more about career opportunities, network, and participate in lectures and other company events.",
    paragraph2:
      "The term ”D-Dagen” was coined as early as the year 2000, when it was the Computer Science Chapter’s industry-day with 13 attending companies in the E-building on KTH Campus. Since then, D-Dagen has grown and in 2016 it entered the student union building, Nymble. Now D-Dagen is considered to be the largest career fair in the Nordics for Computer Science students, as well as one of the largest career fairs at KTH.",
    paragraph3:
      "Over time, D-Dagen has evolved into much more than just a one-day fair. In the weeks leading up to the fair, we give companies the opportunity to hold lunch lectures and other events together with our students. In the evening after the fair, we organize a larger dinner where students and company representatives can engage in more relaxed conversations.",
    info1: "What is D-Dagen",
    info2: "D-Dagen before",
    info3: "D-Dagen today",
    dummy: [
      "HEAD OF D-DAGEN",
    "HEAD OF D-DAGEN",
    "HEAD OF PR",
    "LEAD DEVELOPER",
    "HEAD OF THE FAIR",
    "HEAD OF SALES",
    "HEAD OF FINANCES"],
    prTeamRoles: [
      "Head of PR", "Print Manager", "Art Director",
      "Art Director", "Social Media Manager",
    ],
    devTeamRoles: [
      "Lead Developer", "System Developer",
      "Web Developer", "Web Developer",
    ],
    salesTeamRoles: [
      "Head of Sales", "Salesperson", "Salesperson",
      "Salesperson", "Salesperson", "Salesperson", "Salesperson", "Sponsorship Manager",
    ],
    massTeamRoles: [
      "Head of the Fair", "Event Manager", "Logistics Manager",
      "Venue Manager", "Lounge Manager", "HR Manager",
    ],
    ecoTeamRoles: ["Head of Finances", "Deputy Financial Manager"],
    ddaRoles: [
      "DDA", "DDA", // Assuming DDA remains the same without context.
    ],
    teamNames: [
      "D-Dagen Managers",
      "PR Team",
      "Dev Team",
      "Sales Team",
      "Exhibition Team",
      "Finance Team",
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
      filterIndustry: "Industry",
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
    notActive: "The signup is not active yet, keep an eye on social media for when it opens!",
    header: "Signup for leadership group 26",
    description: "The goal for this year's D-Dagen is to make it the biggest and best career fair in Datasektionen's history! This is the vision we have as organizers this year. However, it's impossible for us to organize such a large event entirely on our own. We need an ambitious project group to help us, one that has the drive to create something extraordinary. We aim to improve internal communication from previous years, and, therefore, we will focus extensively on team building to create a close-knit group. We also expect that everyone in the project group is sociable, has good teamwork skills, and is self-driven in their tasks.",
    search:"SIGNUP",
    info:"Information about the roles",
    extra:"Read more about the roles",
    moreInfo:"Interested?",
    viceDDA:{
      header: "Vice DDA",
      text: "The Vice-DDA is a key role within D-Dagen and acts as the right hand of the project manager (DDA). Through close collaboration with the DDA, the Vice-DDA supports the overall work of the project and ensures that all teams move in the right direction. The role requires a holistic perspective, strong communication skills, and a strong sense of responsibility. The Vice-DDA contributes to making D-Dagen a cohesive, efficient, and memorable experience for both students and companies.",
      roles:[
        "\n- Driven\n- Willing to learn\n- Flexible\n As Vice-DDA, you don’t have any strictly defined tasks instead, your role is to support the DDA in all possible ways. Everything from attending meetings with subgroups to assisting with company contacts. In other words, a Vice-DDA should ideally have experience with D-Dagen, but that is by no means a requirement—the most important thing is having strong drive and a willingness to learn a lot."
      ]
    },
    prGroup:{
      header: "PR Team",
      text: "As the PR manager, you are the leader of the PR team. You drive and organize the group, ensuring that everyone knows what they need to do and has the necessary resources. Since you work closely with the PR team, you will become very close-knit. As the PR manager, you will also communicate extensively with the DDA's.",
      roles : [
        "PR Manager\n- Good communicator\n- Well-organized\n- Leader\nAs a PR Manager, you lead the PR team, ensuring they are organized and equipped to communicate effectively. Working closely within the PR team will foster a strong sense of unity. You will also engage in extensive communication with DDA.",
        "Art Director (UI/UX Design)\n- Artistic\n- Accommodating\nAs an Art Director, you ensure that D-Day looks professional. You will have the opportunity to express your creativity and design through all of the graphics needed for D-Day. This Art Director role includes the responsibility for UX design for the website but also assists with print design. This includes designing UI/UX for the website, brochures, posters, branded clothing and more. Occasionally, you will also get to take some photos. No prior knowledge is required; you will have the chance to learn over time, and the most important thing is that you are driven and motivated. Of course, you will have access to all the programs you need!",
        "Art Director (Print Design)\n- Artistic\n- Accommodating\nAs an Art Director, you ensure that D-Day looks professional. You will have the opportunity to express your creativity and design through all of the graphics needed for D-Day. This Art Director role is primarily responsible for print design but receives support from the other Art Director. This includes brochures, posters, branded clothing and more. Occasionally, you will also get to take some photos. No prior knowledge is required; you will have the chance to learn over time, and the most important thing is that you are driven and motivated. Of course, you will have access to all the programs you need!",
        "Print Manager\n- Proactive\n- Artistic\nThe Print Manager is part of the PR team and is responsible for ensuring all printed materials are ordered and delivered on time. This includes items like stickers, patches, branded clothing, banners, brochures, and more. You'll work closely with the Art Director and assist with design work.",
        "Social Media Manager\n- Good communicator\n- Initiating\n- Social (especially on social media)\n- Creative\nThe Social Media Manager is responsible for increasing D-Day's presence on platforms like Instagram, Facebook, and other social media sites. You'll have the freedom to choose which social media platforms to use and how to express the event's message (within reasonable boundaries). In this role, you'll work closely with the Art Director to create attractive posts. This is an ideal position for those who enjoy taking photos and posting stories!"
      ]
    },
    devGroup:{
      header: "Dev Team",
      text: "The Dev Group is a technically skilled and innovative unit within D-Dagen. Its members are responsible for the development, maintenance, and enhancement of the D-Dagen website. They handle everything from backend programming and database management to frontend design and user experience, with a focus on creating a smooth and engaging digital platform for all visitors.",
      roles : [
        "Web Manager\n- Independent\n- Initiating\nAs the Web Manager, you're responsible for ensuring the website looks good and functions properly. You'll also have significant opportunities to improve the website. Previous experience and knowledge in web development are definite assets. You'll work closely with the Art Director.",
        "System Manager\n- Independent\n- Initiating\n- 'Yes, can do' attitude\nThe System Manager will collaborate extensively with the Web Manager on ambitious projects we plan to introduce at D-Day. We're looking for someone with the drive to create opportunities, and prior experience in app development is a big plus.",
      ]
    },
    saleGroup:{
      header: "Sales Team",
      text: "The Sales Team in D-Day is a central part of the organization and plays a crucial role in ensuring the participation of companies and the growth of the event. The group consists of three key roles, each with its specific tasks:",
      roles : [
        "Sales Manager\n- Good communicator\n- Well-organized\n- Leader\nAs the Sales Manager, you are the operational leader of the sales team. Your responsibilities include training the sales team, ensuring they have everything they need, and keeping the work on schedule.",
        "Sales Person\n- Good communicator\n- Service-oriented\n- Persuasive\nSales People are the primary points of contact with companies. You will work as a team to promote and sell D-Day to businesses, ensuring D-Day's growth. You'll also serve as the main source of information and advice for companies, providing them with tips and advice for the event. No prior sales experience is required, but it's a plus.",
        "Sponsorship Manager\n- Good communicator\n- Initiating\n- 'Pushy' sales attitude\nAs the Sponsorship Manager, you will reach out to companies that won't have a physical presence at the event but still want to be visible in other ways. You'll also assist in organizing lunchtime lectures and other corporate events. Your tasks will involve collaborating closely with the PR team and the rest of the project team."
      ]
    },
    massGroup:{
      header: "Exhibition Team",
      text: "The Trade Fair Group is the heart and brain behind D-Day's trade fair and events. The group consists of a dedicated team with various responsibilities, and their collaboration is crucial to ensure that everything runs smoothly and that visitors have a memorable experience.",
      roles : [
        "Exhibition Manager\n- Good communicator\n- Well-organized\n- Leader\nAs the Exhibition Manager, you are the leader of the Exhibition team. You will drive and organize the team, ensuring everyone has what they need. Working closely within the Exhibition team, you will become a tightly-knit group. You will also have extensive communication with DDA.",
        "Logistics Manager\n- Good communicator\n- Well-organized\n- Independent\nAs the Logistics Manager, you are the leader of the Exhibition team. You will drive and organize the team, ensuring everyone has what they need. Working closely within the Exhibition team, you will become a tightly-knit group. You will also have extensive communication with DDA.",
        "HR Manager\n- Good communicator\n- Leader\n- Thorough scheduler\nWhen D-Day kicks off in Nymble, we need much more staff than just the project team. This is where your primary responsibility lies. You will recruit staff, conduct team-building activities, and plan their schedules for the day. You will also be responsible for planning team-building activities for the project team together with the Lounge Manager. You will also ensure that D-Day meets JML standards.",
        "Lounge Manager\n- Service-oriented\n- Enjoys food\nThe lounge is where company representatives and staff can come during the day to take a break and relax. Your job is to ensure they can expect good food and the best possible service! You will also plan team-building activities for the project team together with the HR Manager and be responsible for ordering food for both team-building and major meetings.",
        "Party Manager\n- Fun-loving\n- Creative\n- Initiator\nThe Party Manager is responsible for organizing all major events, such as the company banquet and the appreciation dinner. This role is perfect for someone who is creative and enjoys having fun with others.",
        "Venue Manager\n- Responsible\n- Proactive\nWithout a place to be, it's much harder to have successful events. You will become an expert on Nymble's venues and ensure that we follow their instructions and requirements. You will also help book venues for D-Day's other events."
      ]
    },
    ecoGroup:{
      header: "Finance Team",
      text: "The Finance Team is a key component within D-Day, responsible for maintaining a strong and stable economy. Through their meticulous work, the team ensures that D-Day can continue to grow and deliver high-quality events without financial obstacles.",
      roles : [
        "Finance Manager\n- Detail-oriented\n- Can invoice and bookkeep (preferably using the computer science section's system)\n- Willing to read complex texts (contracts, statutes, etc.)\nYou have a handle on finances. You are an expert at bookkeeping (or at least have some knowledge, with instructions available). Together with the Vice Finance Manager, you will send out and book invoices once D-Day has concluded, and you will also serve as an advisor when it comes to the rest of the project team's budgeting and bookkeeping.",
        "Vice Finance Manager\n- Willing to learn a lot\n- Initiative-driven\nThe Vice Finance Manager is one of the more flexible roles within the project team. Your primary task is to learn bookkeeping and assist the Finance Manager, but you are also expected to help where needed in other areas of the project team. That's why we hope you are a motivated person who is ready to go above and beyond your regular duties and provide assistance wherever the rest of the project team may need an extra hand."
      ]
    },

  },

};

