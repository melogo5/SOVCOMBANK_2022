export const ROLE = {
  PERSON: "de2e0148-029b-4206-8676-eb764a24bcb8",
  USER: "de2e0148-029b-4206-8676-eb764a24bcb9",
  ADMIN: "de2e0148-029b-4206-8676-eb764a24bcb0"
}

export const ROLE_NAME = {
  [ROLE.PERSON]: 'На проверке',
  [ROLE.USER]: 'Клиент',
  [ROLE.ADMIN]: 'Администратор'
}


export interface IUser {
  created: Date;
  name: string;
  id: string;
  role: typeof ROLE.PERSON | typeof ROLE.USER | typeof ROLE.ADMIN;
}

export interface ICard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  cardExpireDate: string;
  created: Date;
}
  