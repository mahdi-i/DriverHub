"use client";
import { iranCities } from "@/core/assets/mock/iran-cities";
import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";
import { Input } from "@/core/components/shadcn/ui/input/input";
import { X } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";

function AddressInput({
  address,
  setAddress,
}: {
  address: string;
  setAddress: (val: string) => void;
}) {
  const [show, setshow] = useState(false);

  const provinces = useMemo(() => {
    if (!address || address.length < 2) return [];

    return iranCities.persian
      .map((item) => item.province)
      .filter((province) =>
        province.toLowerCase().includes(address.toLowerCase()),
      );
  }, [address]);

  return (
    <div className={`w-full relative `}>
      <Input
        type="text"
        placeholder="انتخاب استان..."
        className="w-full"
        value={address}
        onChange={(e: ChangeEvent<HTMLInputElement, Element>) => {
          const value = e.target.value;
          setAddress(value);
          setshow(value.length > 1);
        }}
      />
      {address && address.length > 0 && (
        <X
          className="bg-primary-foreground/30 rounded-full hover:bg-primary-foreground/40 cursor-pointer text-white absolute top-1/5 left-3"
          size={14}
          onClick={() => {
            setAddress("");
            setshow(false);
          }}
        />
      )}

      {show && provinces.length > 0 && (
        <Card className="absolute w-full  z-10 rounded-sm ">
          <CardContent className="p-0">
            <ul className="list-none ">
              {provinces.map((province, index) => (
                <li
                  key={index}
                  className="px-2 py-2 text-sm hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors duration-150"
                  onMouseDown={() => {
                    setAddress(province);
                    setshow(false);
                  }}
                >
                  {province}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {show && provinces.length === 0 && (
        <Card className="absolute w-full  z-10 rounded-sm">
          <CardContent className="p-4 text-center text-gray-500 text-sm">
            استانی یافت نشد
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AddressInput;
