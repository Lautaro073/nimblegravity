import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Moon, Sun, Languages } from 'lucide-react';

export function FloatingButtons() {
    const { isDark, toggleTheme } = useTheme();
    const { i18n, t } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                        className="h-12 w-12 rounded-full shadow-lg bg-card border-border hover:bg-accent"
                    >
                        {isDark ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-slate-700" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                    {isDark ? t('theme.light') : t('theme.dark')}
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleLanguage}
                        className="h-12 w-12 rounded-full shadow-lg bg-card border-border hover:bg-accent"
                    >
                        <Languages className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                    {i18n.language === 'es' ? t('language.es') : t('language.en')}
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
