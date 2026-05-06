import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import FilterBookinkMainPage from "@/core/features/main/components/blocks/filter/FilterBookinkMainPage";
import HeroImageMainPage from "@/core/features/main/components/ui/hero-img/HeroImageMainPage";

async function page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const selectedLicense = params?.licenseType;
  console.log(selectedLicense, "ssssssssss");
  return (
    <>
      <HeroImageMainPage />
      <SectionLayout>
        <FilterBookinkMainPage selectedLicense={selectedLicense} />
      </SectionLayout>
      <div className="mt-20">1</div>
    </>
  );
}

export default page;
