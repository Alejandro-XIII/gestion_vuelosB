"use client"
import { randomUUID } from "crypto"
import React from "react"
import { useState } from "react"

const Form = () => {
  const [vuelo, setVuelo] = useState<string>("")
  const [tipoVuelo, setTipoVuelo] = useState<string>("na")
  const [salida, setSalida] = useState<string>("")
  const [llegada, setLlegada] = useState<string>("")
  const [horaSalida, setHoraSalida] = useState<string>("")
  const [horaLlegada, setHoraLlegada] = useState<string>("")
  const [origen, setOrigen] = useState<string>("Bogota")
  const [destino, setDestino] = useState<string>("Bogota")
  const [aeronave, setAeronave] = useState<string>("")
  const [pasajeros, setPasajeros] = useState<number | "">("")
  const [tiquete, setTiquete] = useState<number | "">("")
  const [impuestos, setImpuestos] = useState<number | "">("")
  const [sobretasa, setSobretasa] = useState<number | "">("")
  const [error, setError] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevents the form from submitting and refreshing page
    const formData: { [key: string]: string } = {}
    const elements = e.currentTarget.elements

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLInputElement
      formData[element.name] = element.value
    }

    if (
      [
        vuelo,
        tipoVuelo,
        salida,
        llegada,
        horaSalida,
        horaLlegada,
        aeronave,
        pasajeros,
        tiquete,
        impuestos,
        sobretasa,
      ].includes("")
    ) {
      setError(true)
    } else {
      setError(false)
      const formData = {
        vuelo,
        tipoVuelo,
        salida,
        llegada,
        horaSalida,
        horaLlegada,
        origen,
        destino,
        aeronave,
        pasajeros,
        tiquete,
        impuestos,
        sobretasa,
      }

      // Realiza la solicitud POST al servidor
      fetch("http://localhost:8000/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          // Aquí puedes manejar la respuesta del servidor si lo necesitas
          // Por ejemplo, mostrar un mensaje de éxito al usuario
          console.log("Flight data saved successfully")
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error)
          // Aquí puedes manejar el error si lo necesitas
          // Por ejemplo, mostrar un mensaje de error al usuario
        })
    }
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipoVuelo(e.target.value)
  }

  const handleImpuestos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setImpuestos(value === "" ? "" : Number(value))
    }
  }

  const handleSobretasa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setSobretasa(value === "" ? "" : Number(value))
    }
  }

  const handlePasajeros = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || Number(value) >= 0) {
      setPasajeros(value === "" ? "" : Number(value))
    }
  }

  const handleTiquete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || Number(value) >= 0) {
      setTiquete(value === "" ? "" : Number(value))
    }
  }

  return (
    <div className="mt-8 w-[1255px] px-32">
      {error && (
        <h2 className="mb-3 rounded-md bg-red-800 p-3 text-center font-bold uppercase text-white">
          Todos los campos son obligatorios
        </h2>
      )}

      <form onSubmit={handleSubmit}>
        <div className="relative pt-5">
          <label className="absolute left-0 top-0 ml-7 h-1 w-32 bg-slate-50 px-3  py-3 align-top text-xs font-light">
            Número de vuelo{" "}
          </label>
          <input
            type="text"
            name="vuelo"
            className="h-14 w-[1000px] border-2 border-gray-300 pl-5"
            placeholder="SA-1234"
            value={vuelo}
            onChange={(e) => setVuelo(e.target.value)}
          ></input>
        </div>

        <div className="pt-5">
          <label className="block">
            <input/>
            Tipo de vuelo:
          </label>
          <div className="pt-2">
            <label className="pr-12">
              <input
                type="radio"
                name="tipo"
                value="Nacional"
                className="mr-2"
                checked={tipoVuelo === "Nacional"}
                onChange={handleOptionChange}
              />
              Nacional
            </label>

            <label className="">{' '}
              <input
                type="radio"
                name="tipo"
                value="Internacional"
                className="mr-2"
                checked={tipoVuelo === "Internacional"}
                onChange={handleOptionChange}
              />{' '}
              Internacional
            </label>
          </div>
        </div>

        <div className="relative pt-5">
          <label className="absolute left-0 top-0 ml-7 h-1 w-32 bg-slate-50 px-3  py-3 align-top text-xs font-light">
            Ciudad de origen:{" "}
          </label>
          <select
            name="origen"
            className="h-14 w-[1000px] border-2 border-gray-300 pl-5"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
          >
            <option value="Bogota">(BOG) Aeropuerto Internacional El Dorado - Bogotá</option>
            <option value="Cali">(CLO) Aeropuerto Internacional Alfonso Bonilla Aragón - Cali</option>
            <option value="Cartagena">(CTG) Aeropuerto Internacional Rafael Núñez - Cartagena</option>
            <option value="Medellin">(MDE) Aeropuerto Internacional José María Córdova - Rionegro/Medellín</option>
            <option value="Paris">(CDG) Aeropuerto Charles de Gaulle - París, Francia</option>
            <option value="Dubai">(DXB) Aeropuerto Internacional de Dubái - Dubái, Emiratos Árabes Unidos</option>
            <option value="Nueva York">
              (JFK) Aeropuerto Internacional John F. Kennedy - Nueva York, Estados Unidos
            </option>
            <option value="Ciudad de Mexico">
              (MEX) Aeropuerto Internacional Benito Juárez - Ciudad de México, México
            </option>
          </select>
        </div>

        <div className="relative pt-5">
          <label className="absolute left-0 top-0 ml-7 h-1 w-36 bg-slate-50 px-3  py-3 align-top text-xs font-light">
            Ciudad de destino:{" "}
          </label>
          <select
            name="destino"
            className="h-14 w-[1000px] border-2 border-gray-300 pl-5"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          >
            <option value="Bogota">(BOG) Aeropuerto Internacional El Dorado - Bogotá</option>
            <option value="Cali">(CLO) Aeropuerto Internacional Alfonso Bonilla Aragón - Cali</option>
            <option value="Cartagena">(CTG) Aeropuerto Internacional Rafael Núñez - Cartagena</option>
            <option value="Medellin">(MDE) Aeropuerto Internacional José María Córdova - Rionegro/Medellín</option>
            <option value="Paris">(CDG) Aeropuerto Charles de Gaulle - París, Francia</option>
            <option value="Dubai">(DXB) Aeropuerto Internacional de Dubái - Dubái, Emiratos Árabes Unidos</option>
            <option value="Nueva York">
              (JFK) Aeropuerto Internacional John F. Kennedy - Nueva York, Estados Unidos
            </option>
            <option value="Ciudad de Mexico">
              (MEX) Aeropuerto Internacional Benito Juárez - Ciudad de México, México
            </option>
          </select>
        </div>

        <div className="flex">
          <div className="relative pr-12 pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-32 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Fecha de salida:{" "}
            </label>
            <input
              type="date"
              className="h-14 w-[474px] border-2 border-gray-300 pl-5"
              name="fechaSalida"
              value={salida}
              onChange={(e) => setSalida(e.target.value)}
            ></input>
          </div>

          <div className="relative pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-28 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Hora de salida:{" "}
            </label>
            <input
              type="time"
              className="h-14 w-[476px] border-2 border-gray-300 pl-5"
              value={horaSalida}
              name="horaSalida"
              onChange={(e) => setHoraSalida(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="flex">
          <div className="relative pr-12 pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-36 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Fecha de llegada:{" "}
            </label>
            <input
              type="date"
              className="h-14 w-[474px] border-2 border-gray-300 pl-5"
              value={llegada}
              name="fechaLlegada"
              onChange={(e) => setLlegada(e.target.value)}
            ></input>
          </div>

          <div className="relative pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-32 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Hora de llegada:{" "}
            </label>
            <input
              type="time"
              className="h-14 w-[476px] border-2 border-gray-300 pl-5"
              value={horaLlegada}
              name="horaLlegada"
              onChange={(e) => setHoraLlegada(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="flex">
          <div className="relative pr-12 pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-32 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Tipo de aeronave:{" "}
            </label>
            <input
              type="text"
              className="h-14 w-[600px] border-2 border-gray-300 pl-5"
              value={aeronave}
              name="tipoAeronave"
              onChange={(e) => setAeronave(e.target.value)}
            ></input>
          </div>

          <div className="relative pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-52 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Cantidad máxima de pasajeros:{" "}
            </label>
            <input
              type="number"
              className="h-14 w-[350px] border-2 border-gray-300 pl-5"
              value={pasajeros}
              name="cantidadPasajeros"
              onChange={handlePasajeros}
            ></input>
          </div>
        </div>

        <div className="flex">
          <div className="relative pr-8 pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-32 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Precio de tiquete:{" "}
            </label>
            <input
              type="number"
              className="h-14 w-[435px] border-2 border-gray-300 pl-5"
              value={tiquete}
              name="precioTicket"
              onChange={handleTiquete}
            ></input>
          </div>

          <div className="relative pr-8 pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-24 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Impuestos(%):{" "}
            </label>
            <input
              type="number"
              className="h-14 w-[250px] border-2 border-gray-300 pl-5"
              value={impuestos}
              name="impuestos"
              onChange={handleImpuestos}
            ></input>
          </div>

          <div className="relative pt-5">
            <label className="absolute left-0 top-0 ml-7 h-1 w-24 bg-slate-50 px-3 py-3 align-top text-xs font-light">
              Sobretasa(%):{" "}
            </label>
            <input
              type="number"
              className="h-14 w-[250px] border-2 border-gray-300 pl-5"
              value={sobretasa}
              name="sobretasa"
              onChange={handleSobretasa}
            ></input>
          </div>
        </div>

        <button className="mt-4 h-10 rounded-sm bg-blue-400 px-6 text-white" type="submit">
          CREAR VUELO{" "}
        </button>
      </form>
    </div>
  )
}

export default Form
