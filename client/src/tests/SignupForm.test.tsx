import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import Signup from '../LoginAuth/Signup'
import userEvent from "@testing-library/user-event"

const queryClient = new QueryClient()

describe('Signup From', () => {
    it('desired input fields should be in from',()=>{
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Signup />
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


    it('Test some outputs',()=>{
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Signup />
                </BrowserRouter>
            </QueryClientProvider>
        )

        const signUpButton= screen.queryByRole('button',{name:'Signup'})
        const user=userEvent.setup()
        await user.click(showMoreButton)
    })

 })