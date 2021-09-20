export interface DB {
  installs: AuthData[];
}

export interface AuthData {
  date: Date;
  orgId: string;
  orgName: string;
  access_token: string;
  expires_in: 3600;
  scope: string;
  token_type: string;
}
