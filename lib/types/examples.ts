export type ExampleProduct = {
  id: string;
  stock: number;
  rating: number;
  name: string;
  description: string;
  price: ExamplePrice;
  isBestSeller: boolean;
  leadTime: number;
  image?: string;
  imageBlur?: string;
  discount?: ExampleDiscount;
  usedPrice?: ExampleUsedPrice;
};

type ExamplePrice = {
  amount: number;
  currency: ExampleCurrency;
  scale: number;
};

type ExampleCurrency = {
  code: string;
  base: number;
  exponent: number;
};

type ExampleDiscount = {
  percent: number;
  expires?: number;
};

type ExampleUsedPrice = {
  amount: number;
  currency: ExampleCurrency;
  scale: number;
};

export type ExampleReview = {
  id: string;
  name: string;
  rating: number;
  text: string;
};
