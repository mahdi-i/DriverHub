import AdditionalDriverInfoCard from "../../ui/profile/AdditionalDriverInfoCard";
import CarInfoDriverCard from "../../ui/profile/CarInfoDriverCard";
import CartBankDriverInfo from "../../ui/profile/CartBankDriverInfo";
import DriverProfileCard from "../../ui/profile/DriverProfileCard";
import ProfileDriverHeader from "../../ui/profile/ProfileDriverHeader";

function ProfileDriver() {
  return (
    <div className="space-y-6">
      <ProfileDriverHeader />

      <DriverProfileCard />

      <div className="flex flex-col md:flex-row gap-4">
        <CarInfoDriverCard />

        <CartBankDriverInfo />
      </div>

      <AdditionalDriverInfoCard />
    </div>
  );
}

export default ProfileDriver;
