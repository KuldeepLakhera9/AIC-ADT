import { Locale } from "./config";
import { TranslationDictionary } from "./types";
import { enDictionary } from "./dictionaries/en";
import { mrDictionary } from "./dictionaries/mr";

export function getDictionary(locale: Locale): TranslationDictionary {
  if (locale === "mr") {
    return mrDictionary;
  }
  return enDictionary;
}
