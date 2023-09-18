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
  value: ("Meat" | "Vegan" | "LactoseFree" | "GlutenFree" | "None")[];
  comment: string;
  type: "Representative" | "Banquet";
  exhibitorId?: string;

  constructor(
    id: string | undefined,
    name: string,
    value: ("Meat" | "Vegan" | "LactoseFree" | "GlutenFree" | "None")[],
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
  tables: number;
  chairs: number;
  drinkCoupons: number;
  representatives: number;
  banquetTickets: number;

  constructor(t: Locale, exhibitorPackage: string) {
    switch (exhibitorPackage) {
      case "main":
        this.name = t.exhibitorSettings.table.row2.packages.main;
        this.tables = 1;
        this.chairs = 1;
        this.drinkCoupons = 20;
        this.representatives = 6;
        this.banquetTickets = 0;
        break;
      case "base":
        this.name = t.exhibitorSettings.table.row2.packages.base;
        this.tables = 1;
        this.chairs = 1;
        this.drinkCoupons = 10;
        this.representatives = 2;
        this.banquetTickets = 2;
        break;
      case "sponsor":
        this.name = t.exhibitorSettings.table.row2.packages.sponsor;
        this.tables = 1;
        this.chairs = 1;
        this.drinkCoupons = 10;
        this.representatives = 2;
        this.banquetTickets = 2;
        break;
      case "headhunter":
        this.name = t.exhibitorSettings.table.row2.packages.headhunter;
        this.tables = 1;
        this.chairs = 1;
        this.drinkCoupons = 20;
        this.representatives = 4;
        this.banquetTickets = 2;
        break;
      case "premium":
        this.name = t.exhibitorSettings.table.row2.packages.premium;
        this.tables = 1;
        this.chairs = 1;
        this.drinkCoupons = 30;
        this.representatives = 4;
        this.banquetTickets = 4;
        break;
      case "startup":
        this.name = t.exhibitorSettings.table.row2.packages.startup;
        this.tables = 1;
        this.chairs = 1;
        this.drinkCoupons = 0;
        this.representatives = 2;
        this.banquetTickets = 0;
        break;
      default:
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
  extraTables: number;
  extraChairs: number;
  extraDrinkCoupons: number;
  extraRepresentativeSpots: number;
  totalBanquetTicketsWanted: number;
  jobOfferId: string;

  constructor(
    id: string,
    exhibitorName: string,
    organizationNumber: string,
    invoiceEmail: string,
    logoWhite: string | undefined,
    logoColor: string | undefined,
    description: string,
    exhibitorPackage: string,
    extraTables: number,
    extraChairs: number,
    extraDrinkCoupons: number,
    extraRepresentativeSpots: number,
    totalBanquetTicketsWanted: number,
    jobOfferId: string
  ) {
    this.id = id;
    this.name = exhibitorName;
    this.organizationNumber = organizationNumber;
    this.invoiceEmail = invoiceEmail;
    this.logoWhite = logoWhite;
    this.logoColor = logoColor;
    this.description = description;
    this.package = exhibitorPackage;
    this.extraTables = extraTables;
    this.extraChairs = extraChairs;
    this.extraDrinkCoupons = extraDrinkCoupons;
    this.extraRepresentativeSpots = extraRepresentativeSpots;
    this.totalBanquetTicketsWanted = totalBanquetTicketsWanted;
    this.jobOfferId = jobOfferId;
  }
}

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
