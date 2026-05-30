import { Input } from "@/core/components/shadcn/ui/input/input";

function SearchInputFilterBooking() {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id="search"
          label="جستجو"
          placeholder="جستجو در رنگ ماشین و مدل و.."
          className="pl-9 h-9 text-sm"
        />
      </div>
    </div>
  );
}

export default SearchInputFilterBooking;
