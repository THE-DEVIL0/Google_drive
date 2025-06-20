import bycrypt from 'bcrypt'

export const hashPassword =  async (password: string , roundNumber?: number) =>{
 
        return await bycrypt.hash(password,roundNumber||10 )
    
}

export const comparePassoword = async(password:string, hashedPassword:string) =>{
  return  bycrypt.compare(password,hashedPassword).catch(()=>false)
}