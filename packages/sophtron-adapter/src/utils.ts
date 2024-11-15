import { createHmac } from "crypto";

export function getHmac(dataToEncrypt: string, key: string) {
  const hmac = createHmac('sha256', Buffer.from(key, 'base64'));
  hmac.update(dataToEncrypt);
  return hmac.digest('base64');
}

export function buildSophtronAuthCode(
  httpMethod: string,
  url: string,
  apiUserID: string,
  secret: string,
) {
  const authPath = url.substring(url.lastIndexOf("/")).toLowerCase();
  const text = httpMethod.toUpperCase() + "\n" + authPath;
  const b64Sig = getHmac(text, secret);
  const authString = "FIApiAUTH:" + apiUserID + ":" + b64Sig + ":" + authPath;
  return authString;
}
