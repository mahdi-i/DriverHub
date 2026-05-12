import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/core/components/shadcn/ui/input-otp/input-otp";

interface OtpInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  onComplete?: (value: string) => void;
}

export default function OtpInputField({
  value,
  onChange,
  length = 6,
  onComplete,
}: OtpInputFieldProps) {
  return (
    <div className="flex justify-center">
      <InputOTP
        maxLength={length}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        pattern="^[0-9]+$"
        inputMode="numeric"
      >
        <InputOTPGroup>
          {Array.from({ length }, (_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
