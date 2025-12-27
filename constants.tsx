
import { Plan, AppSettings } from './types';

export const PLANS: Plan[] = [
  {
    id: 'weekly',
    name: 'Weekly Plan',
    price: 200,
    durationDays: 7,
    features: [
      '24/7 Customer Support',
      'Weekly Plan 7 Day',
      'Sora AI Video Watermark Remove'
    ]
  },
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 1000,
    durationDays: 30,
    features: [
      '24/7 Priority Support',
      'Monthly Plan 30 Day',
      'Sora AI Video Watermark Remove',
      'Unlimited Downloads'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 2500,
    durationDays: 365,
    features: [
      'Personal Account Manager',
      'Yearly Plan 365 Day',
      'Sora AI Video Watermark Remove',
      '4K Export Quality',
      'Best Value'
    ]
  }
];

export const INITIAL_SETTINGS: AppSettings = {
  telegramLink: 'https://t.me/sora_ai_remove',
  whatsappNumber: '+923000000000',
  paymentMethods: [
    { id: '1', type: 'JazzCash', accountName: 'Admin Name', accountNumber: '03001234567' },
    { id: '2', type: 'EasyPaisa', accountName: 'Admin Name', accountNumber: '03001234567' }
  ]
};
