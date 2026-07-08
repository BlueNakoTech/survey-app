import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function MainContent() {
  const [lingkungan, setLingkungan] = useState("");
  const [ketua, setKetua] = useState("");
  const [wakil, setWakil] = useState("");
  const [sekretaris, setSekretaris] = useState("");
  const [bendahara, setBendahara] = useState("");

  async function submitForm() {
    try {
      await addDoc(collection(db, "responses"), {
        lingkungan,
        ketua,
        wakil,
        sekretaris,
        bendahara,
        createdAt: serverTimestamp(),
      });

      alert("Data berhasil disimpan!");

      setLingkungan("");
      setKetua("");
      setWakil("");
      setSekretaris("");
      setBendahara("");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
    }
  }

  return (
    <main>
      <h2>Pendataan Pengurus Lingkungan</h2>

      <input
        placeholder="Nama Lingkungan"
        value={lingkungan}
        onChange={(e) => setLingkungan(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Ketua"
        value={ketua}
        onChange={(e) => setKetua(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Wakil Ketua"
        value={wakil}
        onChange={(e) => setWakil(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Sekretaris"
        value={sekretaris}
        onChange={(e) => setSekretaris(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Bendahara"
        value={bendahara}
        onChange={(e) => setBendahara(e.target.value)}
      />

      <br />
      <br />

      <button onClick={submitForm}>Submit</button>
    </main>
  );
}

export default MainContent;
