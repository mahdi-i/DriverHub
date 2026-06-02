import { FetcherFunc } from "@/core/lib/fetcher/fetcher";
import { GetPayloadByLicense } from "@/core/lib/license/getPayloadByLicense";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ProfileDriverTs } from "../../../assets/types/profileDriverTs";
import AdditionalDriverInfoCard from "../../ui/profile/AdditionalDriverInfoCard";
import CarInfoDriverCard from "../../ui/profile/CarInfoDriverCard";
import CartBankDriverInfo from "../../ui/profile/CartBankDriverInfo";
import DriverProfileCard from "../../ui/profile/DriverProfileCard";
import CompletModalDriverInfo from "../../ui/profile/modal/CompletModalDriverInfo";
import ProfileDriverHeader from "../../ui/profile/ProfileDriverHeader";
import ProfileDriverSkeleton from "../../ui/profile/skeleton/ProfileDriverSkeleton";

async function ProfileDriver() {
  const cookieStore = await cookies();
  const license = cookieStore.get("licenseToken")?.value;
  if (!license) {
    redirect("/");
  }
  const getUserInfo = await GetPayloadByLicense(license);
  const userId = getUserInfo?.driverId || null;
  if (!getUserInfo?.driverId) {
    redirect("/");
  }
  let profileInfo: ProfileDriverTs | null = null;

  profileInfo = await FetcherFunc({
    method: "GET",
    path: `/profile-driver`,
  });

  if (!profileInfo) {
    return <CompletModalDriverInfo license={license} />;
  }
  return (
    <div className="space-y-6">
      <Suspense fallback={<ProfileDriverSkeleton />}>
        <ProfileDriverHeader
          data={profileInfo}
          token={license}
          driverId={userId}
        />

        <DriverProfileCard data={profileInfo} />

        <div className="flex flex-col md:flex-row gap-4">
          <CarInfoDriverCard data={profileInfo} />

          <CartBankDriverInfo data={profileInfo} />
        </div>

        <AdditionalDriverInfoCard data={profileInfo} license={license} />
      </Suspense>
    </div>
  );
}

export default ProfileDriver;
