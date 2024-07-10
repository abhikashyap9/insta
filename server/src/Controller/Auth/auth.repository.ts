import Signupuser from '../../Models/Signupschema'
import bcrypt from 'bcrypt'

class AuthRepository{
   async CreateUser(userData){
    const signupuser = new Signupuser(userData)
    const newUser = await signupuser.save()
    return newUser
   } 


   async FindUserByEmail(userEmail){
    const signupuser = await Signupuser.findOne({userEmail})
    return signupuser
   } 

   async FindUserByName(userName){
    const signupuser = await Signupuser.findOne({userName})
    return signupuser
   } 

   async FindUserById(id){
    const signupuser = await Signupuser.findOne({id})
    return signupuser
   } 


   async comparePasswords(userPassword, hashedPassword) {
    return await bcrypt.compare(userPassword, hashedPassword);
  }
}


export {AuthRepository}