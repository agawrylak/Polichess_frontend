const polishDictionary = new Map<string, string>([
  ["Play as", "Kolor"],
  ["Language", "Język"],
  ["Login", "Logowanie"],
  ["Difficulty", "Poziom SI"],
  ["Last moves", "Ostatni ruch"],
  ["Register", "Rejestracja"],
  ["Settings", "Ustawienia"],
  ["History", "Historia"],
  ["Name", "Nazwa"],
  ["Password", "Hasło"],
  ["Email", "E-mail"],
  ["Submit", "Zatwierdź"],
  ["Easy AI", "Łatwa SI"],
  ["Medium AI", "Średnia SI"],
  ["Hard AI", "Trudna SI"],
  ["Surrender", "Nowa gra"],
  ["Undo", "Cofnij ruch"],
  ["Account", "Konto"],
  ["Logout", "Wyloguj"],
  ["Loading", "Wczytywanie"],
  ["Date", "Data"],
  ["Winner", "Zwycięzca"],
  ["Load", "Graj"],
  ["Unknown", "Nieznany"],
  ["Black won (AI)", "Czarny wygrał (SI)"],
  ["White won (AI)", "Biały wygrał (SI)"],
]);

export function getTranslation(key: string, language: string) {
  if (language == "en_us") {
    return key;
  } else if (language == "pl_pl" && polishDictionary.has(key)) {
    return polishDictionary.get(key);
  } else {
    return key;
  }
}
