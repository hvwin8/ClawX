// 类型声明
declare module 'lit-i18n' {
  export function registerTranslateConfig(config: {
    source: (lang: string) => any;
    defaultLocale: string;
    fallbackLocale: string;
  });
  
  export function use(): {
    translate: (key: string, interpolations?: Record<string, any>) => string;
    translateUnsafeHTML: (key: string, interpolations?: Record<string, any>) => string;
    useTranslate: () => { translate: (key: string, interpolations?: Record<string, any>) => string; };
    setLocale: (locale: string) => void;
  };
  
  export type LocalizedString = string;
}

// 导入
import { registerTranslateConfig, use } from 'lit-i18n';
import en from './locales/en.json';
import zh from './locales/zh.json';

// 从localStorage获取保存的语言设置，默认为中文
const savedLocale = localStorage.getItem('locale') || 'zh';

registerTranslateConfig({
  source(lang: string) {
    switch (lang) {
      case 'zh': return zh;
      case 'en':
      default: return en;
    }
  },
  defaultLocale: savedLocale,
  fallbackLocale: 'en',
});

const { translate: originalTranslate, translateUnsafeHTML, useTranslate, setLocale: originalSetLocale } = use();

// 增强setLocale函数，保存语言设置到localStorage
export const setLocale = (locale: string) => {
  localStorage.setItem('locale', locale);
  originalSetLocale(locale);
};

export const translate = originalTranslate;
export const translateUnsafeHTML = translateUnsafeHTML;
export const useTranslate = useTranslate;
