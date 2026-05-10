import { Card } from "@/core/components/shadcn/ui/card/card";
import { LicenseFilter } from "../../ui/filter/LicenseFilter";

function FilterBookinkMainPage({ selectedLicense }) {
  return (
    <Card className="py-0 ">
      <LicenseFilter selectedLicense={selectedLicense} />
      <div>sad</div>
    </Card>
  );
}

export default FilterBookinkMainPage;
