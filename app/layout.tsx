import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import type { LayoutProps } from '../.next/types/app/layout'; // Chemin ajusté selon votre structure

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next PokeDex',
    description: 'A small application to find Pokémon.',
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="fr">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
