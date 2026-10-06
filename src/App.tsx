import { useState } from 'react'
import './App.css'
import './components/jatekter.css'
import JatekTer from './components/JatekTer'

function generalUjLampak(meret: number): ('on' | 'off')[] {
  const lampakSzama = meret * meret;
  const ujLista: ('on' | 'off')[] = Array(lampakSzama).fill('off');

  const kapcsol = (i: number) => {
    ujLista[i] = ujLista[i] === 'on' ? 'off' : 'on';
  };

  const kattintas = (index: number) => {
    kapcsol(index);
    if (index - meret >= 0) kapcsol(index - meret);
    if (index + meret < lampakSzama) kapcsol(index + meret);
    if (index % meret > 0) kapcsol(index - 1);
    if (index % meret < meret - 1) kapcsol(index + 1);
  };

  const kattintasokSzama = meret * 3 + Math.floor(Math.random() * 4);

  for (let k = 0; k < kattintasokSzama; k++) {
    const veletlenIndex = Math.floor(Math.random() * lampakSzama);
    kattintas(veletlenIndex);
  }

  return ujLista;
}

export default function App() {
  const [meret, setMeret] = useState<number>(3);
  const [lista, setLista] = useState<('on' | 'off')[]>(() => generalUjLampak(meret));
  const [lepesek, setLepesek] = useState<number>(0);
  
  function lampaKivalaszt(index: number) {
    if (nyert) return;
    
    const ujLista = [...lista];
    
    const kapcsol = (i: number) => {
      ujLista[i] = ujLista[i] === 'on' ? 'off' : 'on';
    };

    kapcsol(index);

    if (index - meret >= 0) {
      kapcsol(index - meret);
    }
    if (index + meret < ujLista.length) {
      kapcsol(index + meret);
    }
    if (index % meret > 0) {
      kapcsol(index - 1);
    }
    if (index % meret < meret - 1) {
      kapcsol(index + 1);
    }

    setLista(ujLista);
    setLepesek(lepesek + 1);
  }

  function ujJatek(ujMeret: number = meret) {
    setMeret(ujMeret);
    setLista(generalUjLampak(ujMeret));
    setLepesek(0);
  }

  const nyert = lista.every((lampa) => lampa === 'off');

  return (
    <>
      <header>
        <h1>Light Out</h1>
      </header>
      <article>
        <div className="nehezseg-gombok">
          <button className="konnyu-gomb" onClick={() => ujJatek(3)}>Könnyű (3x3)</button>
          <button className="kozepes-gomb" onClick={() => ujJatek(4)}>Közepes (4x4)</button>
          <button className="nehez-gomb" onClick={() => ujJatek(5)}>Nehéz (5x5)</button>
        </div>
        <JatekTer lista={lista} meret={meret} lampaKivalaszt={lampaKivalaszt}/>
        <div className="jatek-info">
          <p>Lépések száma: <strong>{lepesek}</strong></p>
        </div>
        {nyert && <h2>Gratulálok, nyertél!</h2>}
        {nyert && <button className="uj-jatek-gomb" onClick={() => ujJatek(meret)}>Új játék</button>}
      </article>
      <footer>
        <p>Bernáth Milán</p>
      </footer>
    </>
  )
}

  
