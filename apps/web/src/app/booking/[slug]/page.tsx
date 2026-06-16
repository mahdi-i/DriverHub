import SectionLayout from "@/core/components/custom/ui/wrapper/SectionLayout";
import SingleBookingPage from "@/core/features/booking/components/blocks/booking/SingleBookingPage";
import { BASE_URL } from "@/core/lib/basic-link/BackendBasicLink";
import { getAccessTokenSSR } from "@/core/lib/coockie/getAccess";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const driverId = slug;
  const license = await getAccessTokenSSR();

  const res = await fetch(
    `${BASE_URL}/booking/drivers-booking-profile/${driverId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${license}`,
      },
    },
  );
  if (!res.ok) {
    return notFound();
  }
  const data = await res.json();
  return (
    <SectionLayout>
      <SingleBookingPage license={license} driverId={driverId} data={data} />
    </SectionLayout>
  );
}
