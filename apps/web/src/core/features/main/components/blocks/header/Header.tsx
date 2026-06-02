import { Roles } from "@driverhub/shared-types";
import DesktopHeader from "../../ui/header/desktop/DesktopHeader";
import MobileHeader from "../../ui/header/mobile/MobileHeader";

function Header({ role }: { role?: Roles }) {
  return (
    <>
      <header className="hidden md:block">
        <DesktopHeader role={role} />
      </header>

      <header className="md:hidden relative mb-25">
        <MobileHeader />
      </header>
    </>
  );
}

export default Header;
