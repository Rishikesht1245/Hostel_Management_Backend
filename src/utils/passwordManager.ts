import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password.toString(), saltRounds);
  } catch (error) {
    throw new Error("Error Hashing Password");
  }
};

export const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean | undefined> => {
  try {
    return await bcrypt.compare(inputPassword.toString(), hashedPassword);
  } catch (error) {
    throw new Error("Error comparing password");
  }
};
