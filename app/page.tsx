'use client';

//* REACT
import { useState, useEffect } from 'react';

//* TYPES
import { IPokemon } from './@types/pokemon';

import Image from 'next/image';

export default function Home() {
    //* STATES
    const [searchInput, setSearchInput] = useState<string>('');
    const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    //* USE EFFECT
    // récupère les données depuis l'API au chargement du composant
    useEffect(() => {
        const getPokemons = async () => {
            try {
                const resultJson = await fetch(
                    'https://tyradex.vercel.app/api/v1/pokemon'
                );
                const result: IPokemon[] = await resultJson.json();

                // on ne récupère pas le premier pokemon (pokemon Bug) (car il n'a pas de type et cela provoque une erreur)
                result.shift();

                setPokemons(result);
                setFilteredPokemons(result);
            } catch (error) {
                console.error('Erreur de récupération des données:', error);
            }
        };
        getPokemons();
    }, []);

    // filtre les Pokémon en fonction de la recherche
    useEffect(() => {
        const results = pokemons.filter((pokemon) =>
            pokemon.name.fr.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredPokemons(results);
    }, [searchInput, pokemons]);

    return (
        <div className="flex flex-col justify-between h-screen p-3">
            <main className="text-center">
                <h1 className="" aria-label="Next Pokedex">
                    <Image
                        src="/next-pokedex.png"
                        alt="Logo Next Pokedex"
                        className="m-auto"
                        width={1000}
                        height={1}
                    />
                </h1>
                <h2 className="text-xl">Un Pokédex codé avec NextJS !</h2>

                {/* barre de recherche */}
                <input
                    type="text"
                    placeholder="Rechercher un Pokémon..."
                    value={searchInput.toUpperCase()}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="mt-10 mb-10 p-4 border-2 border-[#FFCC00] text-gray-700 w-80 rounded-full"
                />

                {/* cartes container */}
                <div className="flex flex-wrap gap-8 justify-center mt-4 mb-6">
                    {/* carte */}
                    {filteredPokemons.map((pokemon) => (
                        <div
                            key={pokemon.pokedex_id}
                            className="border border-[#FFCC00] rounded-lg p-4 hover:bg-[#0E417C] hover:scale-105 hover:z-20 hover:shadow-[0px_0px_40px_0px_#FFCC00] transition transform duration-500 w-full md:w-auto"
                        >
                            {/* image */}
                            <Image
                                src={pokemon.sprites.regular}
                                alt={pokemon.name.fr}
                                className="mb-4 w-[200px] md:w-[300px] m-auto"
                                width={200}
                                height={1}
                            />

                            {/* nom */}
                            <div className="text-4xl font-bold text-cyan-600">
                                {pokemon.name.fr}
                            </div>

                            {/* categories */}
                            <div className="text-xl italic">
                                {pokemon.category}
                            </div>

                            {/* types */}
                            {pokemon.types.map((type) => (
                                <div
                                    key={type.name}
                                    className="flex items-center m-4"
                                >
                                    <Image
                                        alt=""
                                        src={type.image}
                                        height={1}
                                        width={50}
                                        className="rounded-full"
                                    />
                                    <div className="ml-4">{type.name}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
            <footer className="text-center mt-4">&copy;M-RikCorp - 2024</footer>
        </div>
    );
}
