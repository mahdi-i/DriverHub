"use client";

import { ImgNormalCustom } from "@/core/components/custom/ui/image/ImgNormalCustom";
import Link from "next/link";

function Logo({ width = 100 }: { width?: number }) {
  return (
    <Link href="/">
      <ImgNormalCustom
        src="/img/logo/shawl_logotype-d6b14ca0.svg"
        alt="logo"
        width={width}
        height={80}
        preload={true}
      />
    </Link>
  );
}

export default Logo;
