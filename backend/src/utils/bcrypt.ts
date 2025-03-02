import bcrypt from "bcrypt";

// Hash the password
export const hashValue = async (value: string, saltRounds: number = 10) =>
  await bcrypt.hash(value, saltRounds);

// Compare the hashed password
export const compareValue = async (value: string, hashedValue: string) =>
  await bcrypt.compare(value, hashedValue);
