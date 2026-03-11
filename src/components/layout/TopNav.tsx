import { ChevronDown, Globe, Database, Zap, Sparkles, CalendarClock } from 'lucide-react';
import logoDark from '@/assets/logo_dark.svg';
import { useModule } from '@/contexts/ModuleContext';
import { MODULES, ModuleType } from '@/types/modules';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { MemoryLibraryDrawer } from '@/components/modules/memory/MemoryLibraryDrawer';
import { useMemory } from '@/contexts/MemoryContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { AccountDialog } from './AccountDialog';
import { useState } from 'react';

export function TopNav() {
  const { activeModule, setActiveModule } = useModule();
  const { t, i18n } = useTranslation();
  const { drawerOpen, setDrawerOpen } = useMemory();
  const [accountOpen, setAccountOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
    <header className="h-14 border-b border-border/10 bg-background/20 backdrop-blur-xl flex items-center justify-between px-4 top-0 z-50 fixed left-0 w-screen">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src={logoDark} alt="Oran Gen" className="w-6 h-6 object-fill" />
        <span className="text-lg font-normal">Oran Gen</span>
      </div>

      {/* Right: User Actions */}
      <div className="flex items-center gap-2">
        {/* Memory Library */}
        <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 flex items-center gap-1.5"
            onClick={() => setDrawerOpen(true)}>
          <Database className="w-4 h-4" />
          <span className="text-xs font-medium">{t('common.memoryLibrary')}</span>
        </Button>

        {/* Language Switcher */}
        <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 flex items-center gap-1"
            onClick={toggleLanguage}>
          <Globe className="w-4 h-4" />
          <span className="text-xs font-medium">{i18n.language === 'zh' ? '中文' : 'EN'}</span>
        </Button>


        {/* Upgrade + Credits Pill with Hover Card */}
        <HoverCard openDelay={200} closeDelay={300}>
          <HoverCardTrigger asChild>
            <a
                href="https://www.oran.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-0 rounded-full bg-foreground text-background text-xs font-semibold overflow-hidden h-8 hover:opacity-90 transition-opacity">
                
              <span className="px-3 py-1.5 font-light">{t('common.upgrade')}</span>
              <span className="flex items-center gap-1 px-3 py-1.5 bg-foreground/80 border-l border-background/20 font-light">
                <Zap className="w-3.5 h-3.5 fill-current" />
                80
              </span>
            </a>
          </HoverCardTrigger>
          <HoverCardContent align="end" className="w-80 p-5 rounded-2xl bg-popover/70 backdrop-blur-xl border-border/50 shadow-lg">
            <div className="space-y-4">
              {/* Plan + Upgrade */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-light text-foreground">Free</span>
                <Button size="sm" className="rounded-lg bg-foreground text-background hover:bg-foreground/90 text-xs font-light px-4" asChild>
                  <a href="https://www.oran.cn/" target="_blank" rel="noopener noreferrer" className="font-light">
                    {t('common.upgrade')}
                  </a>
                </Button>
              </div>
              <div className="border-t border-border" />
              {/* Credits */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4" />
                  {t('common.credits')}
                </div>
                <span className="text-sm font-light text-foreground">0</span>
              </div>
              
              {/* Usage Details */}
              <button
                  onClick={() => setAccountOpen(true)}
                  className="flex items-center gap-1 text-sm font-light text-foreground hover:text-primary transition-colors">
                  
                {t('common.usageDetails')} <span>›</span>
              </button>
            </div>
          </HoverCardContent>
        </HoverCard>

        {/* Avatar with Hover Card */}
        <HoverCard openDelay={200} closeDelay={300}>
          <HoverCardTrigger asChild>
            <button className="rounded-full focus:outline-none">
              <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-light">
                  JD
                </AvatarFallback>
              </Avatar>
            </button>
          </HoverCardTrigger>
          <HoverCardContent align="end" className="w-72 p-4 rounded-2xl bg-popover/70 backdrop-blur-xl border-border/50 shadow-lg">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-14 h-14">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-light">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-sm font-light text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">john.doe@example.com</p>
              </div>
              <Button
                  size="sm"
                  className="rounded-lg bg-foreground text-background hover:bg-foreground/90 text-xs font-light px-5"
                  asChild>
                  
                <a href="https://www.oran.cn/" target="_blank" rel="noopener noreferrer" className="font-light">
                  {t('common.upgrade')}
                </a>
              </Button>
              <div className="w-full flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">{t('common.credits')}</span>
                <button
                    onClick={() => setAccountOpen(true)}
                    className="flex items-center gap-1 text-sm font-light text-foreground hover:text-primary transition-colors">
                    
                  80 <span className="text-muted-foreground">→</span>
                </button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </header>
    <MemoryLibraryDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    <AccountDialog open={accountOpen} onOpenChange={setAccountOpen} />
    </>);

}