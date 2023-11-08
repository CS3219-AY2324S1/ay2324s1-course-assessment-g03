import { langs } from "@uiw/codemirror-extensions-langs";
import { LanguageSupport } from "node_modules/@codemirror/language/dist";

export const LANGUAGES: Record<string, LanguageSupport> = {
    "JavaScript": langs.javascript(),
    "Python": langs.python(),
    "C#": langs.csharp(),
    "C++": langs.cpp(),
    "TypeScript": langs.typescript(),
    "Java": langs.java(),
} as const;

export const LANGUAGE_KEYS = Object.fromEntries(Object.keys(LANGUAGES).map((k) => [k, k]))

export const DEFAULT_LANGUAGE = LANGUAGES.Python
export type LanguageKeyType = keyof typeof LANGUAGES;
export type LanguageType = (typeof LANGUAGES[keyof typeof LANGUAGES])
export const DEFAULT_LANGUAGE_KEY = "Python"