const getenv = (constant : string , defaultValue? : string) : string =>{

    const value =  process.env[constant] || defaultValue

    if(!value){
        throw new Error(`Environment variable ${constant}  is not set`)
    }

    return value
}

export default getenv