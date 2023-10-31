export const LANGUAGES = {
    JavaScript: "JavaScript",
    Python: "Python",
    "C#": "C#",
    C: "C",
    Kotlin: "Kotlin",
    "C++": "C++",
    TypeScript: "TypeScript",
    Java: "Java",
    Ruby: "Ruby",
    Go: "Go"
} as const;

export type LanguageKeyType = keyof typeof LANGUAGES;
export const DEFAULT_LANGUAGE = LANGUAGES.Python