# Takio Maps

Navigatore per camion e mezzi pesanti, installabile come app (PWA). Funziona dal browser del telefono o del computer.

- Percorso calcolato per il mezzo: altezza, larghezza, lunghezza, peso, peso per asse, merci pericolose (ADR).
- Traffico in tempo reale, con controllo ogni 5 minuti e cambio strada se ne trovi una più veloce.
- Indicazioni vocali in italiano, ricalcolo automatico se esci dal percorso, schermo acceso durante la guida.
- Stima delle pause obbligatorie (45 minuti ogni 4 h 30 di guida). È un'indicazione, non sostituisce il tachigrafo.

Percorsi, traffico e ricerca indirizzi usano le API di **TomTom**. La mappa di sfondo è di OpenStreetMap e CARTO.

## Pubblicarla su GitHub Pages

Serve un indirizzo HTTPS, altrimenti il GPS del telefono non funziona. GitHub Pages lo dà gratis.

1. Su github.com crea un repository nuovo, per esempio `takio-maps` (pubblico).
2. Premi **Add file** → **Upload files** e carica **tutti** i file di questa cartella, senza metterli in sottocartelle:
   `index.html`, `manifest.webmanifest`, `sw.js`, `icon.svg`, `icon-192.png`, `icon-512.png`,
   `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`, `README.md`.
3. Premi **Commit changes**.
4. Vai in **Settings** → **Pages**. Alla voce *Build and deployment* scegli **Deploy from a branch**, poi il ramo `main` e la cartella `/ (root)`. Premi **Save**.
5. Dopo uno o due minuti l'app è online su `https://TUO-UTENTE.github.io/takio-maps/`.

## Installarla sul telefono

- **Android (Chrome):** apri l'indirizzo, tocca il menu ⋮ e poi **Installa app** (o usa il pulsante "Installa Takio Maps" nella finestra del mezzo).
- **iPhone (Safari):** apri l'indirizzo, tocca **Condividi** e poi **Aggiungi alla schermata Home**.

## La chiave TomTom

1. Registrati su https://developer.tomtom.com. Non serve la carta di credito.
2. Dalla dashboard, sezione **API & SDK Keys**, copia la chiave (ce n'è già una, "My first API key"). Deve avere attivi Routing e Search.
3. Nell'app tocca il pulsante con il camion, incolla la chiave nel campo **Chiave API TomTom** e premi **Fatto**.

La chiave resta salvata nel browser di quel dispositivo: non è scritta in nessun file del repository, quindi puoi pubblicarlo senza esporla. Su un altro telefono va incollata di nuovo.
Il piano gratuito di TomTom include 2.500 richieste al giorno per routing, ricerca e traffico.

## Aggiornare l'app

Se modifichi un file, caricalo di nuovo su GitHub. Se cambi `index.html`, aumenta anche il numero in `sw.js` (`takio-v1` diventa `takio-v2`), così i telefoni scaricano la versione nuova.

## Limiti

- Per calcolare i percorsi serve la connessione internet. Senza segnale l'app si apre, ma non naviga.
- La mappa di sfondo CARTO è gratuita solo per uso non commerciale. Per un uso professionale conviene passare alle mappe TomTom.
- Il blocco schermo si evita solo sui browser che supportano la funzione "wake lock".
- Non c'è ancora la visualizzazione di code e incidenti sulla mappa.

## File del progetto

| File | A cosa serve |
| --- | --- |
| `index.html` | L'app: mappa, ricerca, navigazione |
| `manifest.webmanifest` | Nome, colori e icone dell'app installata |
| `sw.js` | Service worker: apre l'app anche con poco segnale |
| `icon.svg`, `icon-*.png`, `apple-touch-icon.png`, `favicon-32.png` | Icone |
