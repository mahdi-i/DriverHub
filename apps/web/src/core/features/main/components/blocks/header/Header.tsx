import HeaderListNav from "../../ui/header/HeaderListNav";
import Logo from "../../ui/logo/Logo";

function Header() {
  return (
    <>
      <header className="bg-amber-300 flex items-center p-6 gap-4">
        <Logo width={200} />
        <HeaderListNav />
      </header>
    </>
  );
}

export default Header;
