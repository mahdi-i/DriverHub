import { TypographySpan } from "@/core/components/custom/ui/typography/Typography";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { useState } from "react";

interface NumberInputProps {
  label: string;
  placeholderStart?: string;
  placeholderEnd?: string;
  onChange?: (start: string, end: string) => void;
}

function NumberInput({
  label,
  placeholderStart = "حداقل",
  placeholderEnd = "حداکثر",
  onChange,
}: NumberInputProps) {
  const [startVal, setStartVal] = useState("");
  const [endVal, setEndVal] = useState("");

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartVal(value);
    if (onChange) {
      onChange(value, endVal);
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndVal(value);
    if (onChange) {
      onChange(startVal, value);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={placeholderStart}
          className="h-9"
          onChange={handleStartChange}
          min={0}
          max={100}
        />
        <TypographySpan className="text-muted-foreground">-</TypographySpan>
        <Input
          type="number"
          placeholder={placeholderEnd}
          className="h-9"
          onChange={handleEndChange}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
}

export default NumberInput;
