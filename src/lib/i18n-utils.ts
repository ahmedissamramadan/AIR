import { LocalizableString } from "./data";

export function getLocalizedContent(content: LocalizableString, locale: string): string {
    if (typeof content === 'string') {
        return content;
    }
    return content[locale as 'ar' | 'en'] || "";
}
