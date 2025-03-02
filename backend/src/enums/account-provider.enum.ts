// Provider enum for login-register
export const ProviderEnum = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  FACEBOOK: "FACEBOOK",
  EMAIL: "EMAIL",
};

export type ProviderEnumType = keyof typeof ProviderEnum;
