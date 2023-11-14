'use client'

import HeaderLanding from "./landingPage/HeaderLanding";
import BodyLanding from "./landingPage/BodyLanding";

export default function Landing() {

  return (
    <>
    <div className="flex flex-col justify-center items-center mx-auto w-fit gap-2">
      <HeaderLanding/>
      <BodyLanding/>
    </div>
    </>
  )
}
