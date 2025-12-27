
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum PaymentStatus {
  NONE = 'none',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  features: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: UserRole;
  status: 'active' | 'blocked';
  planId?: string;
  paymentStatus: PaymentStatus;
  subscriptionEndDate?: string;
  transactionId?: string;
  paymentScreenshot?: string;
  paymentMethod?: string;
}

export interface AppSettings {
  telegramLink: string;
  whatsappNumber: string;
  paymentMethods: {
    id: string;
    type: 'JazzCash' | 'EasyPaisa' | 'Bank Account';
    accountName: string;
    accountNumber: string;
  }[];
}
