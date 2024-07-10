import { useMutation } from 'react-query';
import { http } from '../utils'
import { CreateUser } from './interfaces';
import toast from 'react-simple-toasts';
import { useNavigate } from 'react-router-dom';

export function userSignup() {
  return 
}

export const useCreateUser = () => {
  let navigate = useNavigate()

    
  const { isLoading, mutate,isSuccess } = useMutation({
      mutationFn: (payload:CreateUser) => {
          return http.post('/signup',payload)
      },
      onSuccess: (data) => {
       console.log(data) 
          navigate('/auth/login')
        },
        onError:(error)=>{
          console.log(error)
          toast(error?.response?.data?.message || error?.response?.data?.error)

        }
    });
  return { mutate:mutate, isLoading: isLoading,isSuccess };
};