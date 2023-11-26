"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PlantItem = ({ slug }) => {
  const { data: plantItem, isFetching } = useQuery({
    queryKey: ["plantItem"],
    queryFn: async () => {
      return await fetch(`/api/garden/${slug}`).then((res) => res.json());
    },
  });

  return (
    <main>
      {isFetching ? (
        <div> Cargando... </div>
      ) : (
        <div>
          <div>{plantItem.data.name}</div>
          <div>{plantItem.data.harvest}</div>
        </div>
      )}
    </main>
  );
};

export default PlantItem;
