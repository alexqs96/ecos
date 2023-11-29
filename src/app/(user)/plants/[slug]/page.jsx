import React from 'react'
import PlantItem from './PlantItem'
import Favourites from '@/components/Favourites'
import ContactsSidebar from '@/components/ContactsSidebar'

const PlantItemPage = ({params}) => {
  return <>
    <PlantItem slug={params?.slug}/>
    <ContactsSidebar />
    </>
}

export default PlantItemPage