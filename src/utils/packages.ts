import Locale from "@/locales";

export type Package = {
  name: string,
  priceSek: number,
  representativeSpots: number,
  banquetTickets: number,
  drinkCoupons: number,
  tables: number,
  chairs: number,
  extra: string[],
};

export type PackageType = "base" | "sponsor" | "headhunter" | "premium" | "main";

export function getPackage(locale: Locale, type: PackageType): Package {
  return {
    base: {
      name: locale.packages.name.base,
      priceSek: 35000,
      representativeSpots: 2,
      banquetTickets: 2,
      drinkCoupons: 10,
      tables: 1,
      chairs: 0,
      extra: [
        "5 m² " + locale.packages.boothSpace,
      ],
    },
    sponsor: {
      name: locale.packages.name.sponsor,
      priceSek: 45000,
      representativeSpots: 2,
      banquetTickets: 2,
      drinkCoupons: 10,
      tables: 1,
      chairs: 0,
      extra: [],
    },
    headhunter: {
      name: locale.packages.name.headhunter,
      priceSek: 55000,
      representativeSpots: 4,
      banquetTickets: 2,
      drinkCoupons: 10,
      tables: 1,
      chairs: 0,
      extra: [],
    },
    premium: {
      name: locale.packages.name.premium,
      priceSek: 70000,
      representativeSpots: 4,
      banquetTickets: 4,
      drinkCoupons: 30,
      tables: 1,
      chairs: 0,
      extra: [],
    },
    main: {
      name: locale.packages.name.main,
      priceSek: 0,
      representativeSpots: 0,
      banquetTickets: 0,
      drinkCoupons: 0,
      tables: 0,
      chairs: 0,
      extra: [],
    },
  }[type];
};
