"use client";
import { TypographyH4 } from "@/core/components/custom/ui/typography/Typography";
import { GenderEnum } from "@driverhub/shared-types";
import {
  DriverEditInfo,
  ProfileDriverTs,
} from "../../../assets/types/profileDriverTs";
import EditnfoDriverModal from "./modal/EditnfoDriverModal";

function ProfileDriverHeader({
  data,
  token,
  driverId,
}: {
  data: ProfileDriverTs;
  token: string;
  driverId: string;
}) {
  const editData: DriverEditInfo = {
    id: data.id,
    fullName: data.fullName || "",
    gender: data.gender || GenderEnum.MALE,
    age: data.age ?? 0,
    carModel: data.carModel || "",
    carColor: data.carColor || "",
    experienceYears: data.experienceYears ?? 0,
    hasGlasses: data.hasGlasses ?? false,
    medicalConditions: data.medicalConditions || "",
    address: data.address || "",
  };
  return (
    <div className="flex justify-between items-center mb-6">
      <TypographyH4 className="text-2xl">پروفایل راننده</TypographyH4>
      <EditnfoDriverModal data={editData} token={token} driverId={driverId} />
    </div>
  );
}

export default ProfileDriverHeader;
