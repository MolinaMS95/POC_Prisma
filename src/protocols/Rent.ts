export type RentEntity = {
  id: number;
  user_id: number;
  room: number;
  startDate: Date;
  endDate: Date;
};

export type Rent = {
  phone: string;
  password: string;
  room: number;
  startDate: Date;
  endDate: Date;
};
