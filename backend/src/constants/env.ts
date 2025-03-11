const getenv = (constant : string , defaultValue? : string) : string =>{

    const value =  process.env[constant] || constant

    if(!value){
        if(defaultValue){
            return defaultValue
        }
        throw new Error(`Environment variable ${constant}  is not set`)
    }

    return value
}

export default getenv