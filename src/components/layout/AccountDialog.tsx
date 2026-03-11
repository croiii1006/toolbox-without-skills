import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { USER_CREDITS, USER_NAME, USER_EMAIL, USER_INITIALS, USER_PLAN } from '@/constants/user';

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountDialog({ open, onOpenChange }: AccountDialogProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('account');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] w-[90vw] h-[80vh] p-0 gap-0 overflow-hidden bg-background/70 backdrop-blur-xl border-border/50">
        <div className="p-6 pb-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-6 px-0 h-auto pb-0">
              <TabsTrigger
                value="account"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 text-base font-normal">
                
                {t('common.accountManagement')}
              </TabsTrigger>
              <TabsTrigger
                value="usage"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 text-base font-normal text-muted-foreground">
                
                {t('common.usage')}
              </TabsTrigger>
              <TabsTrigger
                value="invoices"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 text-base font-normal text-muted-foreground">
                
                {t('common.invoices')}
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="mt-6 space-y-6">
              <div className="border border-border rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                      {USER_INITIALS}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-semibold text-foreground">{USER_NAME}</p>
                    <p className="text-sm text-muted-foreground font-light">{USER_EMAIL}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1.5 rounded-lg">
                    <LogOut className="w-4 h-4" />
                    {t('common.logout')}
                  </Button>
                </div>
              </div>

              <div className="border border-border rounded-xl p-6">
                <div className="flex gap-8 mb-6">
                  <span className="text-base text-foreground border-b-2 border-foreground pb-2 font-light">
                    {t('common.accountManagement')}
                  </span>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-muted-foreground w-40 font-thin">{t('common.currentPlan')}</span>
                    <span className="text-foreground font-light">{USER_PLAN}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground w-40 font-light">{t('common.availableCredits')}</span>
                    <span className="text-foreground font-normal">{USER_CREDITS}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value="usage" className="mt-6">
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-muted/50 px-6 py-3 flex items-center text-sm font-medium text-muted-foreground">
                  <span className="flex-1">{t('common.usageDetails')}</span>
                  <span className="w-32 text-center">状态</span>
                  <span className="w-48 text-center">日期</span>
                  <span className="w-32 text-right">{t('common.credits')}</span>
                </div>
                <div className="px-6 py-4 flex items-center text-sm border-t border-border">
                  <span className="flex-1 text-foreground">Daily Login Bonus</span>
                  <span className="w-32 text-center text-muted-foreground">已获取</span>
                  <span className="w-48 text-center text-muted-foreground">2026-03-11 11:27:02</span>
                  <span className="w-32 text-right text-foreground">+{USER_CREDITS}</span>
                </div>
                <div className="py-8 text-center text-muted-foreground text-sm">
                  暂无更多数据
                </div>
              </div>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="mt-6">
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-muted/50 px-6 py-3 flex items-center text-sm font-medium text-muted-foreground">
                  <span className="flex-1">日期</span>
                  <span className="w-32 text-center">类别</span>
                  <span className="w-32 text-center">金额</span>
                  <span className="w-32 text-center">状态</span>
                  <span className="w-32 text-right">发票</span>
                </div>
                <div className="py-16 flex flex-col items-center justify-center text-muted-foreground">
                  <div className="w-16 h-16 mb-4 rounded-lg bg-muted/50 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7l8 4M4 7v10l8 4m0-10v10" />
                    </svg>
                  </div>
                  <span className="text-sm">暂无数据</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>);

}