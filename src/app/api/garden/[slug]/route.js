import { SERVER_ERROR } from "@/lib/consts";
import Vegetable from "@/lib/models/Vegetables";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
  try {

    const { slug } = params

    if (!slug) {
      return NextResponse.json(null, {
        status: 404,
        statusText: "id no ingresado",
      });  
    }

    const data = await Vegetable.findOne({
      slug: slug.toLowerCase()
    }).lean()

    return NextResponse.json(data, {
      status: 200,
      statusText: "Verdura encontrada",
    });  
    
  } catch (error) {
    console.log("Error /garden/slug"+ error);

    return NextResponse.json(null, {
      status: 500,
      statusText: "Error Verdura",
    });
  }
}