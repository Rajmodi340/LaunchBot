  export const extractjson=async(text)=>{
if(!text){
    return 
}
const cleaned=text.replace(/```json/g,"").replace(/```/g,"").trim()
const firstBrace=cleaned.indexOf("{")
const lastBrace=cleaned.lastIndexOf("}")
if(firstBrace===-1||lastBrace===-1||firstBrace>lastBrace){
    return null
}
const jsonString=cleaned.substring(firstBrace,lastBrace+1)
try{
    const jsonData=JSON.parse(jsonString)
    return jsonData
}
catch(error){
    console.error("Error parsing JSON:",error)
    return null
}
}
