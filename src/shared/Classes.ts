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
  value: ("Meat" | "Vegan" | "LactoseFree" | "GlutenFree")[];
  comment: string;
  type: "Representative" | "Banquet";
  exhibitorId?: string;

  constructor(
    id: string | undefined,
    name: string,
    value: ("Meat" | "Vegan" | "LactoseFree" | "GlutenFree")[],
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

  constructor(t: Locale, exhibitorPackageTier: number) {
    switch ( exhibitorPackageTier ) {
      case 0:
        this.tier = 0;
        this.name = t.exhibitorSettings.table.row2.packages.tier0;
        this.tables = 1;
        this.chairs = 0;
        this.drinkCoupons = 8;
        this.representatives = 2;
        this.banquetTickets = 2;
        break;
      case 1:
        this.tier = 1;
        this.name = t.exhibitorSettings.table.row2.packages.tier1;
        this.tables = 1;
        this.chairs = 0;
        this.drinkCoupons = 8;
        this.representatives = 3;
        this.banquetTickets = 2;
        break;
      case 2:
        this.tier = 2;
        this.name = t.exhibitorSettings.table.row2.packages.tier2;
        this.tables = 1;
        this.chairs = 0;
        this.drinkCoupons = 16;
        this.representatives = 4;
        this.banquetTickets = 4;
        break;
      case 3:
        this.tier = 3;
        this.name = t.exhibitorSettings.table.row2.packages.tier3;
        this.tables = 1;
        this.chairs = 0;
        this.drinkCoupons = 16; 
        this.representatives = 10;
        this.banquetTickets = 2;
        break;
      case 4:
        this.tier = 4;
        this.name = t.exhibitorSettings.table.row2.packages.tier4;
        this.tables = 1;
        this.chairs = 0;
        this.drinkCoupons = 0;
        this.representatives = 2;
        this.banquetTickets = 0;
        break;
      default:
        this.tier = -1;
        this.name = "";
        this.tables = 0;
        this.chairs = 0;
        this.drinkCoupons = 0;
        this.representatives = 0;
        this.banquetTickets = 0;
        break;
    }
  }

  addCustomOrders(
    tables: number,
    chairs: number,
    drinkCoupons: number,
    representatives: number,
    banquetTickets: number
  ) {
    this.tables += tables;
    this.chairs += chairs;
    this.drinkCoupons += drinkCoupons;
    this.representatives += representatives;
    this.banquetTickets += banquetTickets;
  }
}

export type ExhibitorExtras = {
  tables: number;
  chairs: number;
  drinkCoupons: number;
  representativeSpots: number;
  banquetTicket: number;
};

export class Extras {
  extraChairs: number;
  extraTables: number;
  extraDrinkCoupons: number;
  extraRepresentativeSpots: number;
  totalBanquetTicketsWanted: number;

  constructor(
    extraChairs: number,
    extraTables: number,
    extraDrinkCoupons: number,
    extraRepresentativeSpots: number,
    totalBanquetTicketsWanted: number
  ) {
    this.extraChairs = extraChairs;
    this.extraTables = extraTables;
    this.extraDrinkCoupons = extraDrinkCoupons;
    this.extraRepresentativeSpots = extraRepresentativeSpots;
    this.totalBanquetTicketsWanted = totalBanquetTicketsWanted;
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
  package: string;
  packageTier: number;
  studentMeetings: number;
  extraTables: number;
  extraChairs: number;
  extraDrinkCoupons: number;
  extraRepresentativeSpots: number;
  totalBanquetTicketsWanted: number;
  jobOfferId: string;
  customTables: number;
  customChairs: number;
  customDrinkCoupons: number;
  customRepresentativeSpots: number;
  customBanquetTicketsWanted: number;

  constructor(
    id: string,
    exhibitorName: string,
    organizationNumber: string,
    invoiceEmail: string,
    logoWhite: string | undefined,
    logoColor: string | undefined,
    description: string,
    exhibitorPackage: string,
    packageTier: number,
    studentMeetings: number,
    extraTables: number,
    extraChairs: number,
    extraDrinkCoupons: number,
    extraRepresentativeSpots: number,
    totalBanquetTicketsWanted: number,
    jobOfferId: string,
    customTables: number,
    customChairs: number,
    customDrinkCoupons: number,
    customRepresentativeSpots: number,
    customBanquetTicketsWanted: number
  ) {
    this.id = id;
    this.name = exhibitorName;
    this.organizationNumber = organizationNumber;
    this.invoiceEmail = invoiceEmail;
    this.logoWhite = logoWhite;
    this.logoColor = logoColor;
    this.description = description;
    this.package = exhibitorPackage;
    this.packageTier = packageTier;
    this.studentMeetings = studentMeetings;
    this.extraTables = extraTables;
    this.extraChairs = extraChairs;
    this.extraDrinkCoupons = extraDrinkCoupons;
    this.extraRepresentativeSpots = extraRepresentativeSpots;
    this.totalBanquetTicketsWanted = totalBanquetTicketsWanted;
    this.jobOfferId = jobOfferId;
    this.customTables = customTables;
    this.customChairs = customChairs;
    this.customDrinkCoupons = customDrinkCoupons;
    this.customRepresentativeSpots = customRepresentativeSpots;
    this.customBanquetTicketsWanted = customBanquetTicketsWanted;
  }
}

export type MapProp = {
  name: string;
  logoWhite?: string | null;
  logoColor?: string | null;
  description: string;
  package: "main" | "headhunter" | "sponsor" | "premium" | "base" | "startup";
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
  const sortList = [
    "main",
    "headhunter",
    "sponsor",
    "premium",
    "base",
    "startup",
  ];
  return exhibitors.sort((a, b) => {
    return sortList.indexOf(a.package) - sortList.indexOf(b.package);
  });
}

export function sortPreferences(preferences: Preferences[]) {
  const sortList = ["Representative", "Banquet"];
  return preferences.sort((a, b) => {
    return sortList.indexOf(a.type) - sortList.indexOf(b.type);
  });
}
