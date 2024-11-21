import { ExchangeRate } from './types';

export const fetchExchangeRates = async (
  country: string
): Promise<ExchangeRate[]> => {
  const response = await fetch(
    `https://web-api.vance.club/public/api/currency-converter/forex?code=${country}INR%3DX&timeline=1M`
  );
  const data = await response.json();
  return data.map((item: any) => ({
    date: item.date,
    rate: item.rate,
  }));
};
