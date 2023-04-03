export default {
  locale: "en",
  titles: {
    home: "D-Dagen - Konglig Datasektionen",
  },
  about: "About Us",
  home: {
    introFirstBlock:
      "It’s once again time for D-Dagen, the largest job fair for Computer Science students in the Nordics.",
    introSecondBlock:
      "Are you studing computer science or IT and looking for your future work place, or do you represent a company and are looking for talented co-workers? In that case, D-Dagen is the perfect opportunity for you to meet people from the industry and expand your network with valuable contacts! We’re striving to make this years fair the largest so far, with over 100 exhibitors and 3000 participants.",
    introSignOff: "Looking forward to meeting you!",
    introDDA: "Axel Johansson & Johan Abdi, Project Managers",
    representative: "Company Representative?",
    representativeDescription:
      "Do you want to reach thousands of civil engineering students at KTH? As an exhibitor at D-Dagen you have thet opportunity to do so! Click down bellow to read more and register your interest.",
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
  companyForm: {
    title: "Sign up for D-Dagen",
    description: "Fill in this form to sign up your company for D-Dagen 2023. Please note that signing up through to this form is not binding.",
    fields: {
      name: "Company Name",
      organizationNumber: "Organization Number",
      email: "Email Address",
      contactPerson: "Contact Person",
      phoneNumber: "Phone Number",
    },
    confirm: "Send",
    error: {
      db: "Something went wrong! Try again or send an email instead to",
      email:
        "Your registration has been received, but we could not send a confirmation email to you.",
      continue: "Continue anyway",
    },
    organizationNumberLength: "The organization number must be 10 digits",
    organizationNumberChecksum:
      "Invalid check digit, check that you have entered the number correctly",
  },
  postCompanyForm: {
    title: "Registration confirmed",
    subtitle: "Your registration has been received",
    text: "Confirmation of your registration has been sent by email. If you have any other questions, contact us on",
    contact: "Contact us",
  },
  nav: {
    toContent: "To content",
    home: "Home",
    forCompanies: "For companies",
    forStudents: "For students",
    about: "About D-Dagen",
    companyForm: "Exhibitor Registration",
    changeLanguage: "Change language to Swedish",
  },
  footer: {
    header: "Organized by Datasektionen",
    about:
      "Datasektionen, or the Computer Science Chapeter is a non-profit student chapter under THS which exists to give all CS students at KTH the best study time possible.",
    contactHeader: "Contact",
    responsible: "Project Managers",
    salesGroup: "Sales Team",
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
    table1text1: "D-Dagen is the annual career fair organized by the Computer Science chapter at KTH Royal Institute of Technology. It is today the largest IT career fair in the Nordic region.",
    table1text2: "This year's D-Dagen is taking place on October 12",
    table1text3: "D-Dagen will be held at Nymble, the student union house, located at the KTH Royal Institute of Technlogy in Stockholm",
    table2row1: "CAN OUR COMPANY GET MORE EXPOSURE?",
    table2row2: "CAN OUR COMPANY MARKET JOB OFFERS ETC THROUGH D-DAGEN?",
    table2text1_1: "Absolutely, we have several different packages to help you reach more students, contact",
    table2text1_2: "for more information.",
    table2text2: "Yes, the main purpose of D-Dagen is to market career opportunities such as job offers, trainee programs, summer internships and similar initiatives to our students.",
    table3row1: "HOW DO I REGISTER FOR THE FAIR?",
    table3row2: "WHEN IS THE LAST DAY TO REGISTER FOR THE FAIR?",
    table3row3: "HOW DO WE BECOME A PARTNER?",
    table3row4: "WE WOULD LIKE MORE INFORMATION, WHERE DO WE TURN?",
    table3text1_1: "You can register at ",
    table3text1_2: "or contact our sales team at",
    table3text2_1: "Since we have a limited number of spots at our fair we recommend making a non-binding declaration of interest at",
    table3text2_2: "as soon as possible. We provisionally close the call for declaration of interest on April 28.",
    table3text3: "If you are interested in any type of partnership contact ",
    table3text4: "If the information you are looking for can't be found at our website, contact us at ",
    table4row1: "WHAT KIND OF EVENTS CAN OUR COMPANY HOST TOGETHER WITH D-DAGEN?",
    table4text1: "We'd be thrilled to collaborate with you, both before and after D-Dagen! Whether you're interested in hosting a lunch lecture, hackathon, or something completely different, we're open to your ideas. For more information, please contact our sponsorship manager at ",
    download: "DOWNLOAD",
    productCatalog: "PRODUCT CATALOG",
    header: "EXHIBITOR"

  },

  url: {
    forCompany: "https://ddagen.se/en/förföretag",
    companyForm: "https://ddagen.se/en/företagsanmälan"
  }
};
