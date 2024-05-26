import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import Signup from '../LoginAuth/Signup'
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

        const email= screen.getAllByPlaceholderText(/Enter your email/i)
        const fullName= screen.getAllByPlaceholderText(/Enter your full name/i)
        const userName= screen.getAllByPlaceholderText(/Enter Your User Name/i)
        const password= screen.getAllByPlaceholderText(/Password/i)
    
        expect(email)
    })


 })