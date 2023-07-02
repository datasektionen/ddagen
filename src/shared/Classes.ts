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
  value: string;
  comment: string;
  type: [string];

  constructor(
    id: string | undefined,
    name: string,
    value: string,
    comment: string,
    type: [string]
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.comment = comment;
    this.type = type;
  }
}
