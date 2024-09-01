'use client';

//* REACT
import { useState, useEffect } from 'react';

//* TYPES
import { IPokemon } from './@types/pokemon';

//* NEXT
import Image from 'next/image';
import Link from 'next/link';

//* LOADER
import { PacmanLoader } from 'react-spinners';

export default function Home() {
    //* STATES
    const [searchInput, setSearchInput] = useState<string>('');
    const [filteredPokemons, setFilteredPokemons] = useState<IPokemon[]>([]);
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //* USE EFFECT
    // récupère les données depuis l'API au chargement du composant
    useEffect(() => {
        const getPokemons = async () => {
            // on ajoute le loader
            setIsLoading(true);

            try {
                const resultJson = await fetch(
                    'https://tyradex.vercel.app/api/v1/pokemon'
                );
                const result: IPokemon[] = await resultJson.json();

                // on ne récupère pas le premier pokemon (pokemon Bug) (car il n'a pas de type et cela provoque une erreur)
                result.shift();

                // trie les Pokémon par ordre alphabétique
                const sortedPokemons = result.sort((a, b) =>
                    a.name.fr.localeCompare(b.name.fr)
                );

                setPokemons(sortedPokemons);

                setFilteredPokemons(sortedPokemons);
            } catch (error) {
                console.error('Erreur de récupération des données:', error);
            }
            // on enlève le loader
            setIsLoading(false);
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
                        src="/Next-Pokedex.png"
                        alt="Logo Next Pokedex"
                        className="m-auto"
                        width={1200}
                        height={1000}
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
                {isLoading ? (
                    <div className="flex justify-center items-center m-10">
                        <PacmanLoader size={50} color={'#FFCC00'} />
                    </div>
                ) : (
                    ''
                )}

                {/* cartes container */}
                <div className="flex flex-wrap gap-8 justify-center mt-4 mb-6">
                    {/* carte */}
                    {filteredPokemons.map((pokemon) => (
                        <Link
                            // renvoie vers la fiche du pokemon
                            href={`/pokemon/${pokemon.pokedex_id}`}
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
                            <div className="text-4xl font-bold text-[#3561B2]">
                                {pokemon.name.fr}
                            </div>

                            {/* categories */}
                            <div className="text-xl italic text-[#FFCC00]">
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
                        </Link>
                    ))}
                </div>
            </main>
            <footer className="text-center p-4">&copy;M-RikCorp - 2024</footer>
        </div>
    );
}
