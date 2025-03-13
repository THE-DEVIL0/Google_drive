import bycrypt from 'bcrypt'

export const hashPassword =  async (password: string , roundNumber?: number) =>{
    try{
        return await bycrypt.hash(password,roundNumber||10 )
    }
    catch(error){
        throw new error("Bycrypt is not working",error.message)
    }
   

}

export const comparePassoword = async(password:string, hashedPassword:string) =>{
  return  bycrypt.compare(password,hashedPassword).catch(()=>false)
}