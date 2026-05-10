import DesktopHeader from "../../ui/header/desktop/DesktopHeader";
import MobileHeader from "../../ui/header/mobile/MobileHeader";

function Header() {
  return (
    <>
      <header className="hidden md:block">
        <DesktopHeader />
      </header>

      <header className="md:hidden relative mb-25">
        <MobileHeader />
      </header>
    </>
  );
}

export default Header;
