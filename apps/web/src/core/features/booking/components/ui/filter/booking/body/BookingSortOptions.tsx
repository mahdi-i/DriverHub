import { Button } from "@/core/components/shadcn/ui/button/button";

interface SortOptionsProps {
  variant?: "inline" | "mobile";
}

function BookingSortOptions({ variant = "inline" }: SortOptionsProps) {
  const baseClass = "text-sm font-medium rounded-full hover:bg-background/50";

  const containerClass =
    variant === "mobile"
      ? "flex items-center gap-2 px-2 py-1 w-full sm:w-auto mt-5 bg-transparent border-none shadow-none"
      : "flex items-center gap-2 bg-muted/30 border border-border rounded-full px-2 py-1 w-full sm:w-auto bg-white";

  return (
    <div className={containerClass}>
      <Button variant="ghost" size="sm" className={baseClass}>
        جدیدترین
      </Button>
      <div className="h-4 w-px bg-border mx-1"></div>
      <Button variant="ghost" size="sm" className={baseClass}>
        قدیمی‌ترین
      </Button>
      <div className="h-4 w-px bg-border mx-1"></div>
      <Button variant="ghost" size="sm" className={baseClass}>
        پیشنهاد درایور هاب
      </Button>
    </div>
  );
}

export default BookingSortOptions;
