import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import Signup from '../LoginAuth/Signup'

describe('Signup', () => {
    const queryClient = new QueryClient()

    test('renders the sign-up form', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Signup />
                </BrowserRouter>
            </QueryClientProvider>
        )
        const logoUrl =
            'https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png'
        const logo = screen.getByRole('img')

        expect(logo).toHaveAttribute('src', logoUrl)
    })
})
