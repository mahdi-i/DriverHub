import { TypographySmall } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { Clock } from "lucide-react";

interface TimerStatusProps {
  formattedTime: string;
  resindCode: boolean;
  onResend: () => void;
}

export default function TimerStatus({
  formattedTime,
  resindCode,
  onResend,
}: TimerStatusProps) {
  return (
    <div className="text-center">
      {!resindCode ? (
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <TypographySmall>ارسال مجدد کد تا {formattedTime}</TypographySmall>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={onResend}>
          ارسال مجدد کد
        </Button>
      )}
    </div>
  );
}
