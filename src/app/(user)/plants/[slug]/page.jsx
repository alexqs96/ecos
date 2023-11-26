import React from 'react'
import PlantItem from './PlantItem'

const PlantItemPage = ({params}) => {
  return (
    <PlantItem slug={params?.slug}/>
  )
}

export default PlantItemPage