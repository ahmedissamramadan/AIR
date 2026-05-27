import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useLocale } from 'next-intl';

export default function NotFound() {
    const locale = useLocale();
    const isAr = locale === 'ar';

    return (
        <div className={`min-h-[70vh] flex flex-col items-center justify-center px-4 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            <div className="relative mb-8">
                <span className="text-[12rem] font-black text-primary/5 select-none leading-none">404</span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">🔍</span>
                </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">
                {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
            </h1>

            <p className="text-xl text-muted-foreground mb-12 max-w-md text-center">
                {isAr
                    ? 'عذراً، الصفحة التي تبحث عنها قد تم نقلها أو أنها غير موجودة حالياً.'
                    : 'Sorry, the page you are looking for has been moved or does not exist.'}
            </p>

            <Link href={`/${locale}`}>
                <Button size="lg" className="h-14 px-10 text-lg font-bold">
                    {isAr ? 'العودة للرئيسية' : 'Back to Home'}
                </Button>
            </Link>
        </div>
    );
}
