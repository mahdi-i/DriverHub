"use client";

import ModalAuthHeader from "@/core/features/auth/components/blocks/auth/ModalAuthHeader";
import { useState } from "react";
import Logo from "../../logo/Logo";
import HeaderActions from "./HeaderActions";
import HeaderListNav from "./HeaderListNav";

function DesktopHeader() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="items-center justify-between p-6 shadow-sm flex">
      <div className="flex items-center gap-6">
        <Logo width={180} />
        <HeaderListNav />
      </div>
      <HeaderActions
        setIsAuthModalOpen={setIsAuthModalOpen}
        isAuthModalOpen={isAuthModalOpen}
      />
      <ModalAuthHeader
        setIsAuthModalOpen={setIsAuthModalOpen}
        isAuthModalOpen={isAuthModalOpen}
      />
    </div>
  );
}

export default DesktopHeader;
