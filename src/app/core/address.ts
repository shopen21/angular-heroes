export class Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;

  constructor(street?: string, city?: string, state?: string, country?: string, zip?: string) {
    this.street = street || '';
    this.city = city || '';
    this.state = state || '';
    this.country = country || '';
    this.zip = zip || '00-000';
  }
}
