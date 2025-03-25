export interface DbTableTypes {
  users: UserType[];
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordPageProps {
  params: { slug: string };
}

export interface PasswordFields {
  password: string;
  confirmPassword: string;
}

export interface FormProps {
    token: string
  }

export interface Stock {
  _id: string;
  symbol: string;
  name: string;
  sector: string;
  marketCap: number;
  price: number;
  updatedAt: string;
}

export interface StockData {
  _id: string;
  symbol: string;
  name: string;
  sector: string;
  marketCap: number;
  price: number;
  updatedAt: string;
  __v: number;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
}

export interface WatchlistItem {
  _id: string;
  user: UserData;
  stock: StockData;
  addedAt: string;
  __v: number;
}

export interface WatchListApiResponse {
  type: string;
  data: WatchlistItem[];
}

export interface SortableComponentProps {
   submitHandler : (data : FormData) => Promise<never>
   sortableKey : string
   orderFormat : string
   currentSortingKey : string
}