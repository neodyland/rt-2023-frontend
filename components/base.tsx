import { ReactNode } from "react"


interface BaseProps {
    children: ReactNode,
}

export default function MainPage({ children }: BaseProps) {
    return (
        <main className="px-4">
            {children}
        </main>
    )
}