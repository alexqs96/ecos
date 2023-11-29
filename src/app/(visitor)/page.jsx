'use client'

import HeaderLanding from "./landingPage/HeaderLanding";
import BodyLanding from "./landingPage/BodyLanding";
import { TopNavbarMobile } from "@/components/TopNavbarMobile";

export default function Landing() {

  return (
    <>
    <div className="flex flex-col justify-center  items-center ">
      <HeaderLanding/>
      <BodyLanding/>
    </div>
    </>
  )
}
