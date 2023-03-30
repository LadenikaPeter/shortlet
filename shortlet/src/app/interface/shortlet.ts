export interface Shortlet {
  address: string;
  houseRefCode: number;
  id: number;
  description: string;
  maxNoOfGuests: number;
  noOfBedrooms: number;
  noOfBathrooms: number;
  noOfBeds: number;
  name: string;
  pictures: Pictures[];
  price: number;
  rating: number;
  users: Users;
  reservations: [];
  comments: [];
}

export interface Pictures {
  id: number;
  url: string;
}

export interface Users {
  id: number;
  name: string;
  phoneNo?: number;
  email: string;
  picture?: string;
}

export interface NewShortlet {
  name: string;
  phoneNo?: number;
  title: string;
  price: number;
  description: string;
  address: string;
  maxNoOfGuests: number;
  noOfBathrooms: number;
  noOfBedrooms: number;
  propertyType: string;
  houseType: string;
  amenities?: any;
  // photos: File
}
