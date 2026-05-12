import { Button } from "@/core/components/shadcn/ui/button/button";

interface FormActionsProps {
  isSubmitDisabled: boolean;
  submitText?: string;
  onBack?: () => void;
  backText?: string;
}

export default function FormActions({
  isSubmitDisabled,
  submitText = "ادامه",
  onBack,
  backText = "← بازگشت به مرحله قبل",
}: FormActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="gap-2 mt-2 w-full"
      >
        {submitText}
      </Button>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-center text-sm text-muted-foreground hover:text-primary transition-colors py-1.5"
        >
          {backText}
        </button>
      )}
    </div>
  );
}