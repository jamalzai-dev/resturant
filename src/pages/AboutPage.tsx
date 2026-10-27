import { About, Contact } from '../components/HomeSections';
import { PageIntro } from '../components/common/PageIntro';
import { useLanguage } from '../i18n/LanguageContext';
export function AboutPage() { const {t}=useLanguage(); return <><PageIntro eyebrow={t.aboutEyebrow} title={t.aboutTitle} body={t.aboutBody2} /><About /><Contact /></>; }
