import { TypographyP } from "@/core/components/custom/ui/typography/Typography";
import { Check } from "lucide-react";

export default function RoleCard({
  title,
  description,
  icon,
  isSelected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-3 rounded-sm border transition-all text-right ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-input hover:border-primary/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-1.5 rounded-full ${
              isSelected ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`h-4 w-4 ${
                isSelected ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {icon}
            </div>
          </div>
          <div>
            <TypographyP className="font-medium text-sm">{title}</TypographyP>
            <TypographyP className="text-xs text-muted-foreground">
              {description}
            </TypographyP>
          </div>
        </div>
        {isSelected && <Check className="h-4 w-4 text-primary" />}
      </div>
    </button>
  );
}
