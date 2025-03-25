import { encrypt, decrypt } from "./common/cryptoUtils";

export default function Home() {
  const message =  `msg=Test&type=error`
  const msgToShow = encrypt(message)
  const decryptedToShow = decrypt(msgToShow)

  return (
    <div>
      <h1>Encypted : {msgToShow}</h1>

      <h1>decrypted : {decryptedToShow}</h1>
    </div>
  );
}