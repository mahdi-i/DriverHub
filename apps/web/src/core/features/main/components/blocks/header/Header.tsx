import HeaderActions from "../../ui/header/HeaderActions";
import HeaderListNav from "../../ui/header/HeaderListNav";
import Logo from "../../ui/logo/Logo";

function Header() {
  return (
    <>
      <header className=" flex items-center justify-between p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <Logo width={180} />
          <HeaderListNav />
        </div>

        <HeaderActions />
      </header>
    </>
  );
}

export default Header;
