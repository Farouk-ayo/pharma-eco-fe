export interface RegisteredUser {
  _id?: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  organizationName: string;
  City: string;
  State: string;
  localGovt: string;
  zipCode: number;
  Others?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CustomerService {
  _id?: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  organizationName: string;
  Message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}
export interface LoginInputsPayload {
  Email: string;
  Password: string;
}

// DASHBOARD TYPES
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  date: string;
}
export interface NotificationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  notifications: Notification[];
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
export type ArticleResponse = {
  _id: string;
  Title: string;
  Author: string;
  Caption: string;
  Subtitle1: string;
  Content1: string;
  Subtitle2: string;
  Content2: string;
  Subtitle3?: string;
  Content3?: string;
  Subtitle4?: string;
  Content4?: string;
  articleImage1Url: string;
  articleImage1Id: string;
  articleImage2Url: string;
  articleImage2Id: string;
  articleImage3Url?: string;
  articleImage3Id?: string;
  articleImage4Url?: string;
  articleImage4Id?: string;

  createdAt: string;
  __v: number;
};

export type ArticleCard = {
  Title: string;
  Author: string;
  Caption: string;
  Subtitle1?: string;
  Subtitle2?: string;
  Subtitle3?: string;
  Subtitle4?: string;
  Content1?: string;
  Content2?: string;
  Content3?: string;
  Content4?: string;
  articleImage1?: string;
  articleImage2?: string;
  articleImage3?: string;
  articleImage4?: string;
};
