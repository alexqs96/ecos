import React from 'react';
import PlantasLanding from '../../../images/plantas.png'
import plantas1 from '../../../images/Group1plant.svg'

export default function BodyLanding() {
    return (
        <div className="bg-white h-90vh w-screen flex flex-col ">

            <div className='h-full h-1/2 flex space-around'>
                <div className=" w-1/2">
                    <p className='text-black m-8'>Entra a la comunidad, intercambia tus cultivos e infórmate para ser el mejor cultivador. </p>
                </div>

                <div className="w-1/2">
                    <img src={PlantasLanding} alt="imagenPlantas" />
                </div>
            </div>

            <div>
                <div>
                    <p className='text-black m-8'>¡Conecta con la comunidad!</p>
                    <img src={plantas1} alt="plantas1" />
                </div>
                <div>
                    <p className='text-black m-8'>¡Crea tu huerta!</p>
                </div>
                <div>
                    <p className='text-black m-8'>¡Aprende sobre plantas!</p>
                </div>
            </div>

            <div>
                <div>
                    <h2 className='text-black m-8'>Cultiva e intercambia</h2>
                    <p className='text-black m-8'>¡Convierte tu pasión por la jardinería en conexiones reales! Comparte, intercambia y crece junto a otros amantes de las plantas en nuestra comunidad. Comienza hoy a intercambiar tus plantas, frutas y verduras favoritas.</p>
                    <button className="flex flex-col justify-center items-center gap-8 flex-shrink-0 rounded-full bg-green-500">
                        <p>¡Comienza a intercambiar!</p>
                    </button>
                </div>
                <div></div>
            </div>

            <div>
                <div>
                    {/* aqui va una imagen */}
                </div>
                <div>
                <h2 className='text-black m-8'>Infórmate y diviértete cultivando</h2>
                    <p className='text-black m-8'>Descubre un mundo de diversión y aprendizaje en tu jardín virtual. Sumérgete en la magia de la agricultura, comparte tus experiencias y descubre nuevos trucos. Cultivar nunca fue tan emocionante. ¡Únete a la comunidad hoy!</p>
                    <button className="flex flex-col justify-center items-center gap-8 flex-shrink-0 rounded-full bg-green-500">
                        <p>¡Comienza a intercambiar!</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
