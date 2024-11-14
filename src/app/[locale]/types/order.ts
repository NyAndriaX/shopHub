export type ProductType = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  sku: string;
}

export type AddressType = {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export type OrdersType = {
  _id: string;
  id_woo_order: number,
  order_link: string,
  shop_id: string;
  status: string;
  address: AddressType;
  products: ProductType[];
  total: string;
  currency: string;
  createdAt: Date;
  updateAt: Date
};