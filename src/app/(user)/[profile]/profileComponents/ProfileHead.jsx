import React from 'react'

export default function ProfileHead({ data }) {
    return (
        <div className='border-2 border-green-500 h-15vh p-5 flex'>
            <div className='w-8/12'> 
                <p>Este es el head</p>
                <p> Bienvenido {data.name} {data.surname} </p>
            </div>
            <div className='w-4/12'>
                <p>Este es el buscador</p>
            </div>
        </div>
    )
}

