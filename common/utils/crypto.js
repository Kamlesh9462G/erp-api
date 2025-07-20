const crypto = require('crypto');

var key = 'oSOhgvKFi2AbgyVwtKMKwFV8pSc5kyxU';
var iv = key.slice(0, 16);
const algorithm = 'aes-256-cbc'; //Using AES encryption
let encoding = 'base64';

function encrypt(text) {
  var cipher = crypto.createCipheriv('aes256', key, iv);
  var result = cipher.update(text, 'utf8', encoding);
  result += cipher.final(encoding);
  return result;
}

function decrypt(text) {
  var decipher = crypto.createDecipheriv('aes256', key, iv);
  var result = decipher.update(text, 'base64');
  result += decipher.final();
  return result;
}

//Encrypting text

function encryptCard(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

// Decrypting text
function decryptCard(encryptedData) {
  // let iv = Buffer.from(text.iv, "hex")
  let encryptedText = Buffer.from(encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt,
  encryptCard,
  decryptCard,
};
