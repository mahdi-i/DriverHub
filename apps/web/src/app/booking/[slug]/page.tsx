import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  return <SectionLayout>{slug}</SectionLayout>;
}
