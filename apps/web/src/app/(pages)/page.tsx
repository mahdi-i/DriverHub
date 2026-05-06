import { SearchParamsTs } from "@/core/assets/@types/searchParams";

async function page({ searchParams }: SearchParamsTs) {
  const params = await searchParams;
  const selectedLicense = params?.licenseType;
  console.log(selectedLicense, "ssssssssss");
  return (
    <>
      <div className="mt-20">1</div>
    </>
  );
}

export default page;
