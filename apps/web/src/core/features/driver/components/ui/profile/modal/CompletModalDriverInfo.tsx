"use client";

import { GenderEnum, LicenseTypeEnum } from "@driverhub/shared-types";
import { ProfileDriverTs } from "../../../../assets/types/profileDriverTs";
import ModalProfileInfoDriver from "./ModalProfileInfoDriver";

function CompletModalDriverInfo({ license }: { license: string }) {
  return (
    <ModalProfileInfoDriver
      isOpen={true}
      data={
        {
          fullName: "",
          gender: GenderEnum.MALE,
          licenseNumber: "",
          experienceYears: 0,
          carModel: "",
          carColor: "",
          bankAccountNumber: "",
          licenseType: LicenseTypeEnum.CAR,
        } as ProfileDriverTs
      }
      token={license}
    />
  );
}

export default CompletModalDriverInfo;
