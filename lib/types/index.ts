export interface RegisteredUser {
  _id?: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  organizationName: string;
  city: string;
  state: string;
  localGovt: string;
  zipCode: number;
  others?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface FeedbackService {
  _id?: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  organizationName: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}
export interface LoginInputsPayload {
  email: string;
  password: string;
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
  title: string;
  author: string;
  references: string;
  introduction: string;
  subtitle1: string;
  content1: string;
  subtitle2: string;
  content2: string;
  subtitle3?: string;
  content3?: string;
  subtitle4?: string;
  content4?: string;
  subtitle5?: string;
  content5?: string;
  articleImage1Url: string;
  articleImage1Id: string;
  articleImage2Url: string;
  articleImage2Id: string;
  articleImage3Url?: string;
  articleImage3Id?: string;
  articleImage4Url?: string;
  articleImage4Id?: string;
  articleImage5Url?: string;
  articleImage5Id?: string;

  createdAt: string;
  __v: number;
};

export type ArticleCard = {
  title: string;
  author: string;
  references: string;
  introduction: string;
  subtitle1?: string;
  subtitle2?: string;
  subtitle3?: string;
  subtitle4?: string;
  subtitle5?: string;

  content1?: string;
  content2?: string;
  content3?: string;
  content4?: string;
  content5?: string;

  articleImage1?: string;
  articleImage2?: string;
  articleImage3?: string;
  articleImage4?: string;
  articleImage5?: string;
};
