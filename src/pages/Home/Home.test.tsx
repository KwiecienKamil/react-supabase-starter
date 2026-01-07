import {screen, render} from '@testing-library/react'
import Home from "./Home";
import {describe, it, expect} from 'vitest'
import { MemoryRouter } from 'react-router-dom';

describe("Home", () => {
    it("Renders logout button", () => {
        const mockSession = { user: { name: "Test User", email: "test@example.com" },} as any
        render(
        <MemoryRouter initialEntries={["/"]}>
        <Home session={mockSession} />
        </MemoryRouter>
        )
        expect(screen.getByText(/Wyloguj się/i)).toBeInTheDocument();
    })
})
