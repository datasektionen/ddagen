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
  name: string;
  preferences: string[];
  other: string;

  constructor(name: string, preferences: string[], other: string) {
    this.name = name;
    this.preferences = preferences;
    this.other = other;
  }
}
