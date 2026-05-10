import Logo from "../../logo/Logo";
import SheetMobileHeader from "./SheetMobileHeader";
function MobileHeader() {
  return (
    <div>
      <div className="h-37.5 bg-primary flex justify-center  relative ">
        <div className="mt-8">
          <Logo src="/img/logo/logo-mobile.svg" width={120} />
        </div>
      </div>

      <SheetMobileHeader />
    </div>
  );
}

export default MobileHeader;
