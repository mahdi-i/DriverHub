import CarInfoDriverCard from "../../ui/profile/CarInfoDriverCard";
import CartBankDriverInfo from "../../ui/profile/CartBankDriverInfo";
import DriverProfileCard from "../../ui/profile/DriverProfileCard";
import ProfileTraineeHeader from "../../ui/profile/ProfileTraineeHeader";

function ProfileTrainee() {
  return (
    <div className="space-y-6">
      <ProfileTraineeHeader />

      <DriverProfileCard />

      <div className="flex flex-col md:flex-row gap-4">
        <CarInfoDriverCard />

        <CartBankDriverInfo />
      </div>
    </div>
  );
}

export default ProfileTrainee;
