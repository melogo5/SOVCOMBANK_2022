export interface LoadOrdersRequest { marketId: string; userId: string; };

export interface ICurrency {
    id: string;
    name: string,
    sign: string;
    ticker: string;
    country: string;
    countrycode: string;
}