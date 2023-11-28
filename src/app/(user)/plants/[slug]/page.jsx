import React from 'react'
import PlantItem from './PlantItem'
import Favourites from '@/components/Favourites'

const PlantItemPage = ({params}) => {
  return <>
    <PlantItem slug={params?.slug}/>
    <Favourites/>
    </>
}

export default PlantItemPage