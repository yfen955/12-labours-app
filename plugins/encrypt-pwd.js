import * as CryptoJS from "crypto-js";

export const encryption = (params) => {
  let { key, data, param } = params;
  const result = JSON.parse(JSON.stringify(data));
  param.forEach((ele) => {
    let data = result[ele];
    let encrypted = CryptoJS.AES.encrypt(data, key);
    result[ele] = encrypted.toString();
  });
  return result;
};
