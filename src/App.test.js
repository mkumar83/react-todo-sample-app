'use strict'

import App from './App'
// eslint-disable-next-line sort-imports, no-redeclare
import { render, screen } from '@testing-library/react'

test('renders Hello World', () => {
    render(<App />)
    const linkElement = screen.getByText(/Hello World/i)
    expect(linkElement).toBeInTheDocument()
})

test('renders Integrated CI', () => {
    render(<App />)
    const linkElement = screen.getByText(/Integrated CI/i)
    expect(linkElement).toBeInTheDocument()
})

test('renders Lint Staging', () => {
    render(<App />)
    const linkElement = screen.getByText(/Lint Staging/i)
    expect(linkElement).toBeInTheDocument()
})

test('renders Coverage', () => {
    render(<App />)
    const linkElement = screen.getByText(/Coverage/i)
    expect(linkElement).toBeInTheDocument()
})

test('renders Prettier', () => {
    render(<App />)
    const linkElement = screen.getByText(/Prettier/i)
    expect(linkElement).toBeInTheDocument()
})

test('renders ESlint', () => {
    render(<App />)
    const linkElement = screen.getByText(/ESlint/i)
    expect(linkElement).toBeInTheDocument()
})

test('renders Jest Test Again New', () => {
    render(<App />)
    const linkElement = screen.getByText(/Jest Test Again New/i)
    expect(linkElement).toBeInTheDocument()
})
