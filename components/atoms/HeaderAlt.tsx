import React from "react"
import Image from "next/image"
import avionImg from "../../app/assets/images/plane-2-svgrepo-com.svg"
import handImg from "../../app/assets/images/hand-shake-svgrepo-com.svg"

const HeaderAlt = () => {
  return (
    <header className="flex h-full justify-between px-32 pt-14">
      <div className="flex">
        <Image src={avionImg} alt="avion" className="mr-4 h-10 w-10" />
        <div className="text-3xl font-bold">Ver Vuelos</div>
      </div>

      <div className="flex">
        <Image src={handImg} alt="mano" className="mr-2 h-8 w-8" />
        <div className="text-xl font-semibold">Hola, Paula</div>
      </div>
    </header>
  )
}

export default HeaderAlt
