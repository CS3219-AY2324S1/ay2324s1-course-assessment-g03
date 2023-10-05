import { langs } from "@uiw/codemirror-extensions-langs";

export const LANGUAGES = {
    "JavaScript": langs.javascript(),
    "Python": langs.python(),
    "C#": langs.csharp(),
    "C": langs.c(),
    "Kotlin": langs.kotlin(),
    "C++": langs.cpp(),
    "TypeScript": langs.typescript(),
    "Java": langs.java(),
    "Ruby": langs.ruby(),
    "Go": langs.go()
} as const;


export type LanguageType = (typeof LANGUAGES[keyof typeof LANGUAGES])