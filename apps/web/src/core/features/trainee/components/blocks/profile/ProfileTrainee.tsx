import { FetcherFunc } from "@/core/lib/fetcher/fetcher";
import { cookies } from "next/headers";
import { ProfileTraineeTs } from "../../../assets/types/profileTrineeTs";
import ProfileTraineeHeader from "../../ui/profile/ProfileTraineeHeader";
import TraineeProfileCard from "../../ui/profile/TraineeProfileCard";
import CompletModalTraineeInfo from "../../ui/profile/modal/CreatAndUpdateModalTraineeInfo";

async function ProfileTrainee() {
  const cookieStore = await cookies();
  const license = cookieStore.get("licenseToken")?.value;
  console.log(license);

  let profileInfo: ProfileTraineeTs | null = null;

  try {
    profileInfo = await FetcherFunc({
      method: "GET",
      path: `/profile-trainee/profile`,
    });
    console.log(profileInfo, "xxxxxxxx");
  } catch {
    console.log("لطفا اطلاعات پروفایل تکمیل کنید برای باز شدن دسترسی.");
  }
  if (!profileInfo) {
    return (
      <CompletModalTraineeInfo
        license={license}
        isCreat={true}
        data={profileInfo}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProfileTraineeHeader data={profileInfo} license={license} />

      <TraineeProfileCard data={profileInfo} />
    </div>
  );
}

export default ProfileTrainee;
