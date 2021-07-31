interface ICreateUserTokenDTO {
  refresh_token: string;
  expires_date: Date;
  user_id: string;
  created_at?: Date;
  id?: string;
}

export { ICreateUserTokenDTO };
