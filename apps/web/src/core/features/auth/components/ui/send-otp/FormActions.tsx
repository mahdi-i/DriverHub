import { Button } from "@/core/components/shadcn/ui/button/button";

interface FormActionsProps {
  isSubmitDisabled: boolean;
  submitText?: string;
  onBack?: () => void;
  backText?: string;
  isLoading?: boolean;
}

export default function FormActions({
  isSubmitDisabled,
  submitText = "تایید و ادامه",
  onBack,
  backText = "← بازگشت به مرحله قبل",
  isLoading = false,
}: FormActionsProps) {
  return (
    <>
      <Button
        type="submit"
        disabled={isSubmitDisabled || isLoading}
        className="gap-2 mt-2 w-full"
      >
        {isLoading ? "در حال بررسی..." : submitText}
      </Button>

      {onBack && (
        <button
          onClick={onBack}
          className="text-center text-sm text-muted-foreground hover:text-primary transition-colors py-1.5"
        >
          {backText}
        </button>
      )}
    </>
  );
}
