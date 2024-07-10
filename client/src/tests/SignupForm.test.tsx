import { fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import SignupForm from '../LoginAuth/sign-up-form'
import userEvent from "@testing-library/user-event"
const queryClient = new QueryClient()
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);

describe('Signup From', () => {
  
    
    it('test element present in the form',()=>{
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <SignupForm />
                </BrowserRouter>
            </QueryClientProvider>
        )
      
      

        const email= screen.getByPlaceholderText(/Enter your email/i) as HTMLInputElement
        const fullName= screen.getByPlaceholderText(/Enter your full name/i) as HTMLInputElement
        const userName= screen.getByPlaceholderText(/Enter Your User Name/i) as HTMLInputElement
        const password= screen.getByPlaceholderText(/Password/i) as HTMLInputElement
    
        expect(email).toBeInTheDocument()
        expect(fullName).toBeInTheDocument()
        expect(userName).toBeInTheDocument()
        expect(password).toBeInTheDocument()

        expect(email).toHaveAttribute('name',"email")
        expect(fullName).toHaveAttribute('name',"fullName")
        expect(userName).toHaveAttribute('name',"userName")
        expect(password).toHaveAttribute('name',"password")

        expect(email).toHaveAttribute('id',"email")
        expect(fullName).toHaveAttribute('id',"fullName")
        expect(userName).toHaveAttribute('id',"userName")
        expect(password).toHaveAttribute('id',"password")

        fireEvent.change(email,{target:{value:'a'}})
        fireEvent.change(fullName,{target:{value:'a'}})
        fireEvent.change(userName,{target:{value:'a'}})
        fireEvent.change(password,{target:{value:'a'}})
        expect(email.value).toBe('a')
        expect(fullName.value).toBe('a')
        expect(userName.value).toBe('a')
        expect(password.value).toBe('a')
        // expect(fullName).toHaveAttribute('fullName')

    })


    it('input validation',async()=>{
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <SignupForm />
                </BrowserRouter>
            </QueryClientProvider>
        )
        // screen.getByRole('button',{name:/Signup/i})
        const email= screen.getByPlaceholderText(/Enter your email/i) as HTMLInputElement
        const password= screen.getByPlaceholderText(/Password/i) as HTMLInputElement

        const button=screen.getByRole('button',{name:/signup/i})
        expect(button).toBeInTheDocument()
        const user=userEvent.setup()

        await user.click(button);

        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Fullname required/i)).toBeInTheDocument();
        expect(screen.getByText(/UserName required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password Required/i)).toBeInTheDocument();

        await user.click(button);
        
        fireEvent.change(email,{target:{value:'invalid-email'}})
        fireEvent.change(password,{target:{value:'invalid'}})

        await user.click(button);
        expect(screen.getByText('Must be a valid email')).toBeInTheDocument()
        expect(screen.getByText('Min 8 Characters')).toBeInTheDocument()

    })

    it("handle api response",()=>{
        mock.onPost('/api/post').reply(200,{message:'user created'})

        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <SignupForm />
                </BrowserRouter>
            </QueryClientProvider>
        )

    })

 })