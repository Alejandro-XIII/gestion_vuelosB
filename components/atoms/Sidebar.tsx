import React from "react"
import AirlinesIcon from "@mui/icons-material/Airlines"
import Link from "next/link"

const Sidebar = () => {
  return (
    <aside
      className="flex
          h-full flex-col
          items-start justify-between
          gap-20 bg-[#CFD1E0] p-10"
    >
      <div className="h-auto">
        <AirlinesIcon className="text-8xl" />
        <h2 className="text-4xl font-medium">Gestionar vuelos</h2>
      </div>

      <div className="flex h-full flex-col gap-4">
        <Link
          href={"/gestion_vuelosB/see-flight"}
          className="h-10 w-60 rounded-md px-6 py-2.5 text-sm font-normal hover:bg-zinc-400"
        >
          Ver vuelos
        </Link>
        <Link
          href={"/gestion_vuelosB"}
          className="h-10 w-60 rounded-md bg-blue-400 px-6 py-2.5 text-sm font-normal text-white"
        >
          Crear nuevo vuelo
        </Link>
      </div>

      <div className="flex h-auto flex-col gap-4">
        <Link href={""} className="h-10 w-60 rounded-md px-6 py-2.5 text-sm font-normal hover:bg-zinc-400">
          Perfil
        </Link>
        <button className="h-10 w-60 rounded-md bg-red-300 px-6 py-2.5 text-start text-sm font-normal text-red-700">
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
