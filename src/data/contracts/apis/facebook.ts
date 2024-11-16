export interface LoadFacebookUserApi {
  loadUser: (
    token: FacebookAuthenticationApiParams
  ) => Promise<FacebookAuthenticationApiResult>;
}

export type FacebookAuthenticationApiParams = {
  token: string;
};

export type FacebookAuthenticationApiResult =
  | undefined
  | {
      name: string;
      email: string;
      facebookId: string;
    };

export type LoadFacebookUserApiParams = {
  Params: FacebookAuthenticationApiParams
  Result: FacebookAuthenticationApiResult
}