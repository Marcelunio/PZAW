# Obiektywnie

### Obiektywne rozmowy o obiektywach

Forum internetowe o aparatach i sprzęcie fotograficznym.

## Funkcje
- Rejestracja i logowanie użytkowników
- Dodawanie nowych wpisów (postów)
- Edycja i usuwanie własnych wpisów
- Administratora z wstępnie skonfigurowanym kontem
- Obsługa ciasteczek i baner zgody na cookies
- Przełączanie motywu aplikacji

## Wymagania
- Node.js 18+ (lub nowszy)
- npm

## Instalacja
1. Skopiuj repozytorium do katalogu projektu.
2. Zainstaluj zależności:

```bash
npm install
```

3. Zainicjuj aplikację:

```bash
npm run initialize
```

> `initialize` wykonuje: wypełnienie bazy danych, wygenerowanie pliku `.env` oraz utworzenie konta administratora.

## Uruchamianie
Po instalacji uruchom serwer:


```bash
npm start
```

Aplikacja domyślnie nasłuchuje na porcie `8000`, chyba że ustawisz zmienną środowiskową `PORT`.

## Konfiguracja środowiska
Aplikacja wymaga pliku `.env` z wygenerowanymi ustawieniami. Jeśli użyjesz `node --run initialize`, plik `.env` zostanie utworzony automatycznie.
o strukturze
```
PORT=8000
SECRET=<Sekret używany przez cookie-parser>
PEPPER=<pieprz wykorzystywany przez Argon2 do haseł>
```

## Struktura projektu

Projekt starał się wykorzystywac architekturę projektu MVC (Model-View-Controller)
- `index.js` - punkt wejścia serwera Express
- `controllers/` - logika tras i obsługi żądań
- `model/` - dane, sesje i ustawienia aplikacji
- `public/` - pliki statyczne (CSS, JavaScript, ikony)
- `views/` - szablony EJS
- `utils/` - skrypty pomocnicze do generowania środowiska i bazy danych

## Skrypty npm
- `npm run initialize` - przygotowuje bazę danych, tworzy `.env` i konto administratora
- `npm run populate_db` - wypełnia bazę przykładowymi danymi
- `npm run admin` - tworzy konto administratora
- `npm run dev` - uruchamia serwer w trybie watch z plikiem `.env`
- `npm start` - uruchamia serwer z plikiem `.env`

## Technologie
- JavaScript
- Node.js
- Express
- EJS
- Argon2
- cookie-parser
- Morgan

## Administrator
Domyślne konto administratora tworzone przy inicjalizacji:
- login: `admin`
- hasło: `admin123`

## Atrybucje
Cookie banner silnie inspirowany:
https://gist.github.com/danielleallennn/9713ad2d95826efc60e039803eae7be6

