import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import SignupForm from '../LoginAuth/sign-up-form'
import userEvent from "@testing-library/user-event"
const queryClient = new QueryClient()

describe('Signup From', () => {
    it('desired input fields should be in from',()=>{
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <SignupForm />
                </BrowserRouter>
            </QueryClientProvider>
        )


        const email= screen.getByPlaceholderText(/Enter your email/i)
        const fullName= screen.getByPlaceholderText(/Enter your full name/i)
        const userName= screen.getByPlaceholderText(/Enter Your User Name/i)
        const password= screen.getByPlaceholderText(/Password/i)
    
        expect(email).toBeInTheDocument()
        expect(fullName).toBeInTheDocument()
        expect(userName).toBeInTheDocument()
        expect(password).toBeInTheDocument()
    })


    it('submit response',async()=>{
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <SignupForm />
                </BrowserRouter>
            </QueryClientProvider>
        )
        // screen.getByRole('button',{name:/Signup/i})
        const button=screen.getByRole('button',{name:/signup/i})
        expect(button).toBeInTheDocument()
        const user=userEvent.setup()

        await user.click(button);

        

    })

 })