export class User {
  name: string;
  phoneNumber: string;
  email: string;
  role: string;

  constructor(name: string, phoneNumber: string, email: string, role: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.role = role;
  }
}

export class Preferences {
  name: string;
  preferences: string[];
  other: string;

  constructor(
    name: string,
    preferences: string[],
    other: string
  ) {
    this.name = name;
    this.preferences = preferences;
    this.other = other;
  }
}
