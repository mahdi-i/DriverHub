"use client";

import { Card, CardContent } from "@/core/components/shadcn/ui/card/card";

import { ProfileDriverTs } from "../../../assets/types/profileDriverTs";
import ShowInfoDriverP from "./ShowInfoDriverP";
import UploadFileProfileDriver from "./UploadFileProfileDriver";

function AdditionalDriverInfoCard({
  data,
  license,
}: {
  data: ProfileDriverTs;
  license: string;
}) {
  return (
    <Card className="mt-6">
      <CardContent className="flex flex-col md:flex-row items-start gap-6">
        <UploadFileProfileDriver data={data} license={license} />

        <ShowInfoDriverP data={data} license={license} />
      </CardContent>
    </Card>
  );
}

export default AdditionalDriverInfoCard;
