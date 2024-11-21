export type ExchangeRate = {
  date: string;
  rate: number;
};

export type Alert = {
  title: string;
  country: string;
  rate: number;
  createdAt: string;
};

export type ForexData = {
  close: string;
  resDate: string;
};
