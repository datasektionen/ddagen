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

  constructor(
    id: string | undefined,
    name: string,
    value: ("Meat" | "Vegan" | "LactoseFree" | "GlutenFree")[],
    comment: string,
    type: "Representative" | "Banquet"
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.comment = comment;
    this.type = type;
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
}

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
    totalBanquetTicketsWanted: number,
  ) {
    this.extraChairs = extraChairs;
    this.extraTables = extraTables;
    this.extraDrinkCoupons = extraDrinkCoupons;
    this.extraRepresentativeSpots = extraRepresentativeSpots;
    this.totalBanquetTicketsWanted = totalBanquetTicketsWanted;
  }
}
