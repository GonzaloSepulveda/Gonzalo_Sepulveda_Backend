


type val = {
    is_valid:boolean,
    country:string,
    timezones:string[],
    format_international:string
}

type geo = {
    latitude:number,
    longitude:number,
}

type time = {
    hour:string,
    minute:string,
}



export const getTime=async(time:string):Promise<time>=> {
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY){throw new Error("No hay API_KEY")}
    const url = "https://api.api-ninjas.com/v1/worldtime?timezone=" + time
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status!==200){
        throw new Error("Worldtime API error");   
    }
    const response = await data.json();
    return response
}

export const validatePhone=async(telephone:string):Promise<val> =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY){throw new Error("No hay API_KEY")}

    const url = "https://api.api-ninjas.com/v1/validatephone?number=" + telephone 
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status!==200){
        throw new Error("validatePhone API error");   
    }
    const response = await data.json();
    return response

}


export const getCoordinates = async(country:string):Promise<geo[]> => {
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY){throw new Error("No hay API_KEY")}

    const url = "https://api.api-ninjas.com/v1/geocoding?city=" + country
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status!==200){
        throw new Error("geocoding API error");   
    }
    const response = await data.json();
    return response
}

export const getWeather = async(lat:number,lon:number):Promise<number> => {
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY){throw new Error("No hay API_KEY")}
    const url = "https://api.api-ninjas.com/v1/weather?lat=" + lat+"&lon="+lon
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status!==200){
        throw new Error("Weather API error");   
    }
    const response = await data.json();
    return response.temp

}


