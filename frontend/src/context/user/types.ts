export interface UserDescriptor {
  name: string;
  id: string;
  email: string;
  phone: string;

  user?: boolean;
  admin?: boolean;
}
