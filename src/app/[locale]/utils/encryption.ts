import Cryptr from "cryptr";


export const encrypt = (text: string): string => {
  const secretKey = process.env.NEXTAUTH_SECRET!;
  const cryptr = new Cryptr(secretKey);

  const encryptedString = cryptr.encrypt(text);

  return encryptedString
}

export const decrypt = (encryptedToString: string): string => {
  const secretKey = process.env.NEXTAUTH_SECRET!;
  const cryptr = new Cryptr(secretKey);

  const text = cryptr.decrypt(encryptedToString);

  return text;
}