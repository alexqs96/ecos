import { SERVER_ERROR } from "@/lib/consts";
import Vegetable from "@/lib/models/Vegetables";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
  try {

    const { slug } = params

    if (!slug) {
      return NextResponse.json({
        message: "Ingresa el id de la verdura que queres buscar",
        data: null
      }, {
        status: 404,
        statusText: "id no ingresado",
      });  
    }

    const data = await Vegetable.findOne({
      slug: slug.toLowerCase()
    }).lean()

    if (data) {
      return NextResponse.json({
        message: "Verdura Encontrada",
        data
      }, {
        status: 200,
        statusText: "Verdura encontrada",
      });  
    }
    else
    {
      return NextResponse.json({
        message: "Esta verdura no existe, en nuestros registros.",
        data: null
      }, {
        status: 200,
        statusText: "Verdura encontrada",
      });
    }
    
  } catch (error) {
    console.log("Error /garden/slug"+ error);

    return NextResponse.json({
      message: SERVER_ERROR,
      data: null
    }, {
      status: 500,
      statusText: "Error Verdura",
    });
  }
}