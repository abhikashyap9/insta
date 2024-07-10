import { ApiError } from "../../../utils/ErrorResponse"
import { AuthRepository } from "./auth.repository"
import bcrypt from 'bcrypt'


const authRepository=new AuthRepository()

class AuthService{
    async SignUp(userData){
        const {email, fullName, userName, password} = userData

        if(!email || !fullName || !userName || !password){
            // return res.status(400).send({error: 'missing params',message:'missing params',status:0})
            throw new ApiError(400,"missing params")
        }

        if(userName.length<6){
            throw new ApiError(400,"user name is short")
		}
		
		if(fullName.length<6){
            throw new ApiError(400,"full name is short")
		}

		const userEmailExist = await authRepository.FindUserByEmail(email)
		
		const userNameExist = await authRepository.FindUserByName(userName)

        if(userEmailExist ){
            throw new ApiError(409,"email already exist")
        }

        if(userNameExist ){
            throw new ApiError(409,"user name already exist")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await authRepository.CreateUser({...userData,password:hashedPassword})

        const user = await authRepository.FindUserByEmail(email) 

        return user
    }
}

export {AuthService}