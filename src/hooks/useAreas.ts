import axios from "axios";
import { useState,useEffect } from "react";
import { URL, COMPANY_ID } from "../constantes/string";
import { Area } from "../types";

export default function useAreas () {
    const [areas, setAreas] = useState<Area[]>([]);

    const getAreas = async () => {
        try {
            const response = await axios.get(`${URL}/company/${COMPANY_ID}/areas`,
            {
                responseType: 'json',
            }
            );
            if (Array.isArray(response.data)) {
                const transformedAreas = response.data.map((area: Area) => ({
                    name: area.Name,
                    _id: area._id,
                }));
                setAreas(transformedAreas);
            } else {
                console.error("Los datos no son un arreglo:", response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAreas();
      }, []);
    
      return  areas;
};