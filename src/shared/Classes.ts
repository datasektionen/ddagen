import Locale from "@/locales";


export class User {
  id?: string;
  email: string;
  name: string;
  phone: string;
  role: string;

  constructor(
    id: string | undefined,
    email: string,
    name: string,
    phone: string,
    role: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.role = role;
  }
}

export class Preferences {
  id?: string;
  name: string;
  value: ("Meat" | "Vegan" | "LactoseFree" | "GlutenFree" | "AlcoholFree")[];
  comment: string;
  type: "Representative" | "Banquet";
  exhibitorId?: string;

  constructor(
    id: string | undefined,
    name: string,
    value: ("Meat" | "Vegan" | "LactoseFree" | "GlutenFree" | "AlcoholFree")[],
    comment: string,
    type: "Representative" | "Banquet",
    exhibitorId?: string
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.comment = comment;
    this.type = type;
    this.exhibitorId = exhibitorId;
  }
}

export class Package {
  name: string;
  tier: number = -1;
  tables: number;
  chairs: number;
  drinkCoupons: number;
  representatives: number;
  banquetTickets: number;
  mealCoupons: number;

  constructor(t: Locale, exhibitorPackageTier: number) {
    switch ( exhibitorPackageTier ) {
      case 0:
        this.name = t.packages.name[0];
        this.tables = 1;
        this.chairs = 0;
        this.drinkCoupons = 8;
        this.representatives = 2;
        this.banquetTickets = 2;
        this.mealCoupons = 2;
        break;
      case 1:
        this.name = t.packages.name[1];
        this.tables = 1;
        this.chairs = 0;
        this.drinkCoupons = 8;
        this.representatives = 3;
        this.banquetTickets = 2;
        this.mealCoupons = 3;
        break;
      case 2:
        this.name = t.packages.name[2];
        this.tables = 2;
        this.chairs = 0;
        this.drinkCoupons = 16;
        this.representatives = 4;
        this.banquetTickets = 4;
        this.mealCoupons = 4;
        break;
      case 3:
        this.name = t.packages.name[3];
        this.tables = 2;
        this.chairs = 0;
        this.drinkCoupons = 16; 
        this.representatives = 10;
        this.banquetTickets = 2;
        this.mealCoupons = 4; 
        break;
      case 4:
        this.name = t.packages.name[4];
        this.tables = 1;
        this.chairs = 0;
        this.drinkCoupons = 0;
        this.representatives = 2;
        this.banquetTickets = 0;
        this.mealCoupons = 2; 
        break;
      default:
        this.name = "Something went wrong with the package, contact sales";
        this.tables = 0;
        this.chairs = 0;
        this.drinkCoupons = 0;
        this.representatives = 0;
        this.banquetTickets = 0;
        this.mealCoupons = 0;
        break;
    }
  }

  addCustomOrders(
    tables: number,
    chairs: number,
    drinkCoupons: number,
    representatives: number,
    banquetTickets: number,
    mealCoupons: number
  ) {
    this.tables += tables;
    this.chairs += chairs;
    this.drinkCoupons += drinkCoupons;
    this.representatives += representatives;
    this.banquetTickets += banquetTickets;
    this.mealCoupons += mealCoupons;
  }
}

export type ExhibitorExtras = {
  tables: number;
  chairs: number;
  drinkCoupons: number;
  representativeSpots: number;
  banquetTicket: number;
  mealCoupons: number;
  alcFreeTicket: number;
};

export class Extras {
  extraChairs: number;
  extraTables: number;
  extraDrinkCoupons: number;
  extraRepresentativeSpots: number;
  totalBanquetTicketsWanted: number;
  extraMealCoupons: number;
  alcFreeTickets: number;
  lastChanged?: Date;

  constructor(
    extraChairs: number,
    extraTables: number,
    extraDrinkCoupons: number,
    extraRepresentativeSpots: number,
    totalBanquetTicketsWanted: number,
    extraMealCoupons: number,
    alcFreeTickets: number,
    lastChanged?: Date,
  ) {
    this.extraChairs = extraChairs;
    this.extraTables = extraTables;
    this.extraDrinkCoupons = extraDrinkCoupons;
    this.extraRepresentativeSpots = extraRepresentativeSpots;
    this.totalBanquetTicketsWanted = totalBanquetTicketsWanted;
    this.extraMealCoupons = extraMealCoupons;
    this.alcFreeTickets = alcFreeTickets;
    this.lastChanged = lastChanged;
  }
}

export class JobOffer {
  id: string;
  summerJob: number[];
  internship: number[];
  partTimeJob: number[];
  masterThesis: boolean;
  fullTimeJob: boolean;
  traineeProgram: boolean;

  constructor (
    id: string,
    summerJob: number[],
    internShip: number[],
    partTimeJob: number[],
    masterThesis: boolean,
    fullTimeJob: boolean,
    traineeProgram: boolean,
  ) {
    this.id = id;
    this.summerJob = summerJob;
    this.internship = internShip;
    this.partTimeJob = partTimeJob;
    this.masterThesis = masterThesis;
    this.fullTimeJob = fullTimeJob;
    this.traineeProgram = traineeProgram;
  }
}

export class Exhibitor {
  id: string;
  name: string;
  organizationNumber: string;
  invoiceEmail: string;
  logoWhite: string | undefined;
  logoColor: string | undefined;
  description: string;
  packageTier: number;
  studentMeetings: number;
  extraTables: number;
  extraChairs: number;
  extraDrinkCoupons: number;
  extraRepresentativeSpots: number;
  extraMealCoupons: number;
  socialMediaPost: number;
  panelDiscussion: number;
  goodieBagLogo: number;
  totalBanquetTicketsWanted: number;
  jobOfferId: string;
  customTables: number;
  customChairs: number;
  customDrinkCoupons: number;
  customRepresentativeSpots: number;
  customBanquetTicketsWanted: number;
  meetingTimeSlots: number[];
  physicalAddress: string;
  billingMethod: string;
  companyHostName: string;
  companyHostNumber: string;
  companyHostEmail: string;
  allowMarketing: boolean;
  industry: string;
  alcFreeTicket: number; 
  mapPosition: number;

  constructor(
    id: string,
    exhibitorName: string,
    organizationNumber: string,
    invoiceEmail: string,
    logoWhite: string | undefined,
    logoColor: string | undefined,
    description: string,
    packageTier: number,
    studentMeetings: number,
    extraTables: number,
    extraChairs: number,
    extraDrinkCoupons: number,
    extraRepresentativeSpots: number,
    extraMealCoupons: number,
    socialMediaPost: number,
    panelDiscussion: number,
    goodieBagLogo: number,
    totalBanquetTicketsWanted: number,
    jobOfferId: string,
    customTables: number,
    customChairs: number,
    customDrinkCoupons: number,
    customRepresentativeSpots: number,
    customBanquetTicketsWanted: number,
    meetingTimeSlots: number[],
    physicalAddress: string,
    billingMethod: string,
    companyHostName: string,
    companyHostNumber: string,
    companyHostEmail: string,
    allowMarketing: boolean,
    industry: string,
    alcFreeTicket: number,
    mapPosition: number,
  ) {
    this.id = id;
    this.name = exhibitorName;
    this.organizationNumber = organizationNumber;
    this.invoiceEmail = invoiceEmail;
    this.logoWhite = logoWhite;
    this.logoColor = logoColor;
    this.description = description;
    this.packageTier = packageTier;
    this.studentMeetings = studentMeetings;
    this.extraTables = extraTables;
    this.extraChairs = extraChairs;
    this.extraDrinkCoupons = extraDrinkCoupons;
    this.extraRepresentativeSpots = extraRepresentativeSpots;
    this.extraMealCoupons = extraMealCoupons;
    this.socialMediaPost = socialMediaPost;
    this.panelDiscussion = panelDiscussion;
    this.goodieBagLogo = goodieBagLogo;
    this.totalBanquetTicketsWanted = totalBanquetTicketsWanted;
    this.jobOfferId = jobOfferId;
    this.customTables = customTables;
    this.customChairs = customChairs;
    this.customDrinkCoupons = customDrinkCoupons;
    this.customRepresentativeSpots = customRepresentativeSpots;
    this.customBanquetTicketsWanted = customBanquetTicketsWanted;
    this.meetingTimeSlots = meetingTimeSlots;
    this.physicalAddress = physicalAddress;
    this.billingMethod = billingMethod;
    this.companyHostName = companyHostName;
    this.companyHostNumber = companyHostNumber;
    this.companyHostEmail = companyHostEmail;
    this.allowMarketing = allowMarketing;
    this.industry = industry;
    this.alcFreeTicket = alcFreeTicket;
    this.mapPosition = mapPosition;
  }
}

export class ExhibitorInfo {
  companyName: string;
  organizationNumber: string;
  contactPerson: string;
  telephoneNumber: string;
  email: string;
  packageTier: number;
  studentMeetings: number;
  sendEmailToExhibitor: boolean;
  mapPosition: number;
  meetingTimeSlots: number[];

  constructor(
    companyName: string,
    organizationNumber: string,
    contactPerson: string,
    telephoneNumber: string,
    email: string,
    packageTier: number,
    studentMeetings: number,
    sendEmailToExhibitor: boolean,
    mapPosition: number,
    meetingTimeSlots: number[],
  ) {
    this.companyName = companyName;
    this.organizationNumber = organizationNumber;
    this.contactPerson = contactPerson;
    this.telephoneNumber = telephoneNumber;
    this.email = email;
    this.packageTier = packageTier;
    this.studentMeetings = studentMeetings;
    this.sendEmailToExhibitor = sendEmailToExhibitor;
    this.mapPosition = mapPosition;
    this.meetingTimeSlots = meetingTimeSlots;
  }
}

export type MapProp = {
  name: string;
  logoWhite?: string | null;
  logoColor?: string | null;
  description: string;
  packageTier: number;
  jobOfferId: string;
  offers: {
    summerJob: number[];
    internship: number[];
    partTimeJob: number[];
    masterThesis: boolean;
    fullTimeJob: boolean;
    traineeProgram: boolean;
  };
  position: number;
};

export function sortExhibitors(exhibitors: Exhibitor[]) {
  // this is old sorting function from when exhibitors where enums, perhaps removable 
  return exhibitors;
}

export function sortPreferences(preferences: Preferences[]) {
  const sortList = ["Representative", "Banquet"];
  return preferences.sort((a, b) => {
    return sortList.indexOf(a.type) - sortList.indexOf(b.type);
  });
}
