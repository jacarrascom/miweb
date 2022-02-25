interface Contacts {
  name: string;
  email: string;
  cellphone: string;
  item: string;
}

export interface Quote {
  contacts: Contacts[];
  id: string;
  limitDate: string;
  publicationDate: string;
  features: string;
  file: [];
  description: string;
  marked: boolean;
  postulated: boolean;
  requerimentName: string;
  products: Product[]
}

interface Product {
  image: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}
