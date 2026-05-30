"use client";

import { ProfileTraineeTs } from "../../../assets/types/profileTrineeTs";
import ProfileTraineeCard from "./ProfileTraineeCard";
import TraineeAdditionalInformation from "./TraineeAdditionalInformation";

function TraineeProfileCard({ data }: { data: ProfileTraineeTs }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ProfileTraineeCard data={data} />
      <TraineeAdditionalInformation data={data} />
    </div>
  );
}

export default TraineeProfileCard;
