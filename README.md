# Instalace aplikace

1. Stažení repozitáře z `git@github.com:ObludaNo1/TescoWS_task.git`
2. Instalace dev depencencies přes `npm i` v kořenové složce
3. Spuštění aplikace pomocí `npm run dev`. Aplikace je dostupná na localhostu na `http://localhost:5000`

# Popis aplikace

Aplikace je napsaná pomocí typescriptu, build aplikace je pomocí TS kompilátoru a bundling přes rollup.

# Podporované prohlížeče

Testováno v Google Chromu a v Mozile Firefox.

# Fungování aplikace

Základ je soubor `app.ts`, který inicializuje moduly pro plnění dat do tabulky, kreslení grafu a autocomplete a načte seznam všech měst z lokálního souboru. Načítání online bohužel selže na CORS. Města jsou uložena do stromové struktury umožňující rychlé vyhledávání slov začínajících stejnými písmeny.

Input reaguje na změny a při změně najde v seznamu první města začínající stejnými písmeny. Po napsání názvu města a odeslání se odešle HTTP request. Po jeho dokončení se příchozími daty vyplní HTML tabulka a vykreslí se tato data do canvasu.
