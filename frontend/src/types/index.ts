export type AuthData = {
  access_token: string;
  user: User;
};

export type FormData = {
  email: string;
  password: string;
  fullName: string;
  age: string;
  address: string;
  employment: string;
  job: string;
  imageFront: string;
  imageBack: string;
  imageType: ImageType;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  age: number;
  address: string;
  employment: string;
  job: string;
  imageFront: string;
  imageBack: string;
  imageType: ImageType;
  status: UserStatus;
  role: Role;
};

export enum UserStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum ImageType {
  NATIONAL_IDENTITY_CARD = 'NATIONAL_IDENTITY_CARD',
  PASSPORT = 'PASSPORT',
}
