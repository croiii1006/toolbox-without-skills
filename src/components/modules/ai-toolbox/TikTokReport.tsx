import { useState, useEffect } from 'react';
import { TikTokReportComposer } from './TikTokReportComposer';
import { TikTokReportResults } from './TikTokReportResults';
import { useTikTokInspiration } from '@/contexts/TikTokInspirationContext';
import { useReplicatePrefill } from '@/contexts/ReplicatePrefillContext';
import { statusConfig } from '@/types/history';
import { History, X, Loader2 } from 'lucide-react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import { motion } from 'framer-motion';

interface TikTokReportProps {
  onNavigate?: (itemId: string) => void;
}

function LoadingPage() {
  const tips = [
    '正在扫描 TikTok 热门视频...',
    '分析视频内容与卖点匹配度...',
    '筛选播放量最高的爆款视频...',
    '整理数据生成报告...',
  ];
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 max-w-md text-center"
      >
        {/* Animated loader */}
        <div className="relative w-16 h-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border-[3px] border-muted/30 border-t-foreground/70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg">🔍</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-foreground/90 mb-2">
            正在为你收集匹配度最高的爆款TikTok视频...
          </h2>
          <motion.p
            key={tipIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-muted-foreground"
          >
            {tips[tipIndex]}
          </motion.p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mt-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-foreground/50"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function TikTokReport({ onNavigate }: TikTokReportProps) {
  const [phase, setPhase] = useState<'compose' | 'loading' | 'results'>('compose');
  const [category, setCategory] = useState('');
  const [sellingPoints, setSellingPoints] = useState<string[]>([]);
  const { reportHistory, addReportHistory, updateReportHistoryStatus, deleteReportHistory } = useTikTokInspiration();
  const { setPrefill } = useReplicatePrefill();

  const handleSubmit = (payload: { category: string; sellingPoints: string[] }) => {
    setCategory(payload.category);
    setSellingPoints(payload.sellingPoints);
    setPhase('loading');
    const historyId = addReportHistory({
      category: payload.category,
      sellingPoints: payload.sellingPoints,
      videoCount: 6,
      status: 'in_progress',
    });
    // Simulate completion after delay
    setTimeout(() => {
      updateReportHistoryStatus(historyId, 'completed');
      setPhase('results');
    }, 5000);
  };

  const handleBack = () => {
    setCategory('');
    setSellingPoints([]);
    setPhase('compose');
  };

  const handleReplicate = (videoId: string) => {
    setPrefill({
      tiktokLink: `https://www.tiktok.com/video/${videoId}`,
      sellingPoints,
      autoStart: true,
    });
    onNavigate?.('replicate-video');
  };

  const handleRestoreHistory = (item: { category: string; sellingPoints: string[] }) => {
    setCategory(item.category);
    setSellingPoints(item.sellingPoints);
    setPhase('results');
  };

  if (phase === 'loading') {
    return <LoadingPage />;
  }

  if (phase === 'results') {
    return (
      <TikTokReportResults
        category={category}
        sellingPoints={sellingPoints}
        onBack={handleBack}
        onReplicate={handleReplicate}
      />
    );
  }

  const historySheet = (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/40">
          <History className="w-3.5 h-3.5" />
          <span>历史记录</span>
        </button>
      </SheetTrigger>
      <SheetContent className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-base font-medium">历史记录</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          {reportHistory.map(item => (
            <button
              key={item.id}
              onClick={() => handleRestoreHistory(item)}
              className="w-full text-left p-3 rounded-xl border border-border/30 hover:border-border/60 hover:bg-muted/20 transition-all group relative"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{item.category}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${statusConfig[item.status || 'completed'].className}`}>
                    {statusConfig[item.status || 'completed'].label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {item.sellingPoints.map(p => (
                  <span key={p} className="text-[10px] bg-muted/40 text-muted-foreground px-1.5 py-0.5 rounded-full">{p}</span>
                ))}
              </div>
              <div className="text-[10px] text-muted-foreground/50 mt-1.5">{item.videoCount} 个视频</div>
              <button
                onClick={e => { e.stopPropagation(); deleteReportHistory(item.id); }}
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-muted/40 transition-all"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground/50" />
              </button>
            </button>
          ))}
          {reportHistory.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">暂无历史记录</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="relative min-h-full flex flex-col">
      <div className="absolute top-4 right-4 z-20">
        {historySheet}
      </div>
      <TikTokReportComposer onSubmit={handleSubmit} />
    </div>
  );
}