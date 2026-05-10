import Logo from "../../logo/Logo";
import HeaderActions from "./HeaderActions";
import HeaderListNav from "./HeaderListNav";

function DesktopHeader() {
  return (
    <div className="items-center justify-between p-6 shadow-sm flex">
      <div className="flex items-center gap-6">
        <Logo width={180} />
        <HeaderListNav />
      </div>
      <HeaderActions />
    </div>
  );
}

export default DesktopHeader;
