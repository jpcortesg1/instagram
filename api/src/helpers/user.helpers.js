import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  // Generate new password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};
