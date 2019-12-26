export interface Car {
  brand: string;
  model: string;
  color: string;
  year: string;
  fuel: string;
  price: string;
  _links: {
    self: {
      href: string
    }
  }
}
