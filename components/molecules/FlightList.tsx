"use client"
import React, { useEffect, useState } from 'react';

interface Flight {
    id: number,
    vuelo: string,
    tipoVuelo: string,
    salida: string,
    horaSalida: string,
    llegada: string,
    horaLlegada: string,
    origen: string,
    destino: string
}

function FlightList() {

    const [flights, setFlights] = useState<Flight[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/flights')
            .then(response => response.json() as Promise<Flight[]>)
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));
    }, []); // Corregir el hook useEffect para que solo se ejecute una vez al montar el componente

    return (
        <>
            <table className='ml-10'>
                <tbody>
                    <tr className='border-b border-gray-300'>
                        <th className='py-4 font-semibold text-lg pr-6'>No. Vuelo</th>
                        <th className='py-4 font-semibold text-lg pr-6'>Tipo de vuelo</th>
                        <th className='py-4 font-semibold text-lg pr-6'>Origen</th>
                        <th className='py-4 font-semibold text-lg pr-6'>Destino</th>
                        <th className='py-4 font-semibold text-lg pr-6'>Fecha de salida</th>
                        <th className='py-4 font-semibold text-lg pr-6'>Hora de salida</th>
                        <th className='py-4 font-semibold text-lg pr-6'>Fecha de llegada</th>
                        <th className='py-4 font-semibold text-lg pr-6'>Hora de llegada</th>
                    </tr>
                    {flights.map((flight, index) => (
                        <tr key={index} className='border-b border-gray-300'>
                            <td className='py-4 pr-10'>{flight.vuelo}</td>
                            <td className='py-4 pr-10'>{flight.tipoVuelo}</td>
                            <td className='py-4 pr-10'>{flight.origen}</td>
                            <td className='py-4 pr-10'>{flight.destino}</td>
                            <td className='py-4 pr-10'>{flight.salida}</td>
                            <td className='py-4 pr-10'>{flight.horaSalida}</td>
                            <td className='py-4 pr-10'>{flight.llegada}</td>
                            <td className='py-4 pr-10'>{flight.horaLlegada}</td>
                            <td className='py-4 pr-6 '>Ver mas</td>
                            <td className='py-4 pr-6'>Eliminar</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default FlightList;