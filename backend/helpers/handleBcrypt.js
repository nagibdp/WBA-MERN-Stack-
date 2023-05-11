import bcrypt from "bcrypt-nodejs"

const encrypt = async (rawPassword) => {
  const saltRounds = bcrypt.genSaltSync(10);
  const hashF = bcrypt.hashSync(rawPassword, saltRounds);
  return hashF;
};

const compare = async (rawPassword, hashPassword) => {
  const hash = bcrypt.compareSync(rawPassword, hashPassword);
  return hash;
};

export { encrypt, compare };
