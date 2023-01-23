export type UserEntity = {
  id: number;
  name: string;
  password: string;
  phone: string;
};

export type User = Omit<UserEntity, "id">;
