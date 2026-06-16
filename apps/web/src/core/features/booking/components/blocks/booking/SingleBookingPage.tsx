import { ProfileDriverTs } from "@/core/features/driver/assets/types/profileDriverTs";
import FreeTimeDriver from "../../ui/booking/single-page/FreeTimeDriver";
import SinglePageDriverInfo from "../../ui/booking/single-page/SinglePageDriverInfo";

function SingleBookingPage({
  license,
  driverId,
  data,
}: {
  license: string;
  driverId: string;
  data: ProfileDriverTs;
}) {
  return (
    <>
      <SinglePageDriverInfo data={data} />
      <FreeTimeDriver license={license} driverId={driverId} />
    </>
  );
}

export default SingleBookingPage;
