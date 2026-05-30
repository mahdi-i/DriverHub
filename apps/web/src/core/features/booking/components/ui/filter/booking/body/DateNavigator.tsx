import { TypographySmall } from "@/core/components/custom/ui/typography/Typography";
import { Button } from "@/core/components/shadcn/ui/button/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface DateNavigatorProps {
  className?: string;
}

export function DateNavigator({ className = "" }: DateNavigatorProps) {
  return (
    <div
      className={`flex items-center gap-2 bg-white border border-border rounded-full p-1  ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-muted"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <TypographySmall className="px-2 font-medium">29/02/1405</TypographySmall>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-muted"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function DateNavigatorMobile({ className = "" }: DateNavigatorProps) {
  return (
    <div
      className={`flex items-center gap-2 bg-white border border-border rounded-full p-1  ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 rounded-full hover:bg-muted"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <TypographySmall className="px-1 font-medium">29/02</TypographySmall>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 rounded-full hover:bg-muted"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
