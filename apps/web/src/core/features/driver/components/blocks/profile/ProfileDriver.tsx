import { FetcherFunc } from "@/core/lib/fetcher/fetcher";
import { GetPayloadByLicense } from "@/core/lib/license/getPayloadByLicense";
import { cookies } from "next/headers";
import { ProfileDriverTs } from "../../../assets/types/profileDriverTs";
import AdditionalDriverInfoCard from "../../ui/profile/AdditionalDriverInfoCard";
import CarInfoDriverCard from "../../ui/profile/CarInfoDriverCard";
import CartBankDriverInfo from "../../ui/profile/CartBankDriverInfo";
import DriverProfileCard from "../../ui/profile/DriverProfileCard";
import CompletModalDriverInfo from "../../ui/profile/modal/CompletModalDriverInfo";
import ProfileDriverHeader from "../../ui/profile/ProfileDriverHeader";

async function ProfileDriver() {
  const cookieStore = await cookies();
  const license = cookieStore.get("licenseToken")?.value;
  const getUserInfo = await GetPayloadByLicense(license);
  const userId = getUserInfo?.driverId || null;

  let profileInfo: ProfileDriverTs | null = null;
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
  console.log(profileInfo, "profileInfo");
  console.log(getUserInfo, "userId");
  try {
    profileInfo = await FetcherFunc({
      method: "GET",
      path: `/profile-driver`,
    });
  } catch {
    console.log("لطفا اطلاعات پروفایل تکمیل کنید برای باز شدن دسترسی.");
  }
  console.log(profileInfo, "profileInfo");
  if (!profileInfo) {
    return <CompletModalDriverInfo license={license} />;
  }
  return (
    <div className="space-y-6">
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
    </div>
  );
}

export default ProfileDriver;
