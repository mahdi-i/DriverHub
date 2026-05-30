"use client";
import { ProfileTraineeTs } from "../../../assets/types/profileTrineeTs";
import CreatAndUpdateModalTraineeInfo from "./modal/CreatAndUpdateModalTraineeInfo";

function ProfileDriverHeader({
  data,
  license,
}: {
  data: ProfileTraineeTs;
  license: string;
}) {
  return <CreatAndUpdateModalTraineeInfo data={data} license={license} />;
}

export default ProfileDriverHeader;
