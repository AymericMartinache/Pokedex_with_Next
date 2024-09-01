'use client';

//* TYPES
import { IPokemon } from '@/app/@types/pokemon';

//* NEXT
import Image from 'next/image';
import Link from 'next/link';

//* REACT
import { useEffect, useState } from 'react';

//* fetch de récupération du pokemon
const getPokemonDetails = async (id: number): Promise<IPokemon> => {
    try {
        const resultJson = await fetch(
            `https://tyradex.vercel.app/api/v1/pokemon/${id}`
        );
        if (!resultJson.ok) {
            throw new Error(`Erreur HTTP: ${resultJson.status}`);
        }
        const result = await resultJson.json();
        return result as IPokemon;
    } catch (error) {
        console.error('Erreur de récupération des données:', error);
        throw new Error('Impossible de récupérer les détails du Pokémon');
    }
};

export default function Details({ params }: any) {
    //* STATES
    // Pokemon à afficher
    const [pokemonToDisplay, setPokemonToDisplay] = useState<IPokemon | null>(
        null
    );

    useEffect(() => {
        // défilement en haut de la page à chaque chargement du composant
        window.scrollTo(0, 0);

        //* FECTCH
        const fetchPokemonDetails = async () => {
            try {
                const data = await getPokemonDetails(params.id);
                setPokemonToDisplay(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPokemonDetails();
    }, [params.id]);

    if (!pokemonToDisplay) {
        return <div>Erreur ! Pokémon introuvable !</div>;
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-4">
                <Link href={'/'} className="p-4 text-[#FFCC00] text-lg">
                    ⬅ Retour
                </Link>
                <div className="shadow-md rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Image du Pokémon */}
                        <div className=" p-4">
                            <Image
                                src={pokemonToDisplay.sprites.regular}
                                alt={pokemonToDisplay.name.fr}
                                width={600}
                                height={400}
                                className="mx-auto"
                            />
                        </div>

                        {/* Informations principales */}
                        <div className="md:w-2/3 p-4">
                            <h1 className="text-5xl font-bold text-[#3561B2] mb-2">
                                {pokemonToDisplay.name.fr}{' '}
                                <span className="text-xl text-gray-500">
                                    ({pokemonToDisplay.name.en})
                                </span>
                            </h1>
                            <p className="text-xl italic text-[#FFCC00] mb-4">
                                {pokemonToDisplay.category}
                            </p>
                            <p className="text-md  mb-2">
                                Numéro Pokédex: {pokemonToDisplay.pokedex_id}
                            </p>
                            <p className="text-md  mb-2">
                                Génération: {pokemonToDisplay.generation}
                            </p>
                            <p className="text-md  mb-2">
                                Taille: {pokemonToDisplay.height}
                            </p>
                            <p className="text-md  mb-2">
                                Poids: {pokemonToDisplay.weight}
                            </p>
                        </div>
                    </div>

                    {/* Types */}
                    <div className="p-4 border-t border-[#FFCC00] mt-8">
                        <h2 className="text-2xl font-bold ">Types</h2>
                        <div className="flex space-x-4 mt-2">
                            {pokemonToDisplay.types.map((type) => (
                                <div
                                    key={type.name}
                                    className="flex items-center mt-4"
                                >
                                    <Image
                                        src={type.image}
                                        alt={type.name}
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />
                                    <span className="text-xl font-semibold ml-4">
                                        {type.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Talents */}
                    <div className="p-4 border-t border-[#FFCC00] mt-8">
                        <h2 className="text-2xl font-bold ">Talents</h2>
                        <ul className="list-inside mt-2 list-none">
                            {pokemonToDisplay.talents.map((talent) => (
                                <li key={talent.name} className="text-md">
                                    👉 {talent.name}
                                    {talent.tc ? ' (Talent Caché)' : ''}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Statistiques */}
                    <div className="p-4 border-t border-[#FFCC00] mt-8">
                        <h2 className="text-2xl font-bold ">Statistiques</h2>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="text-md">
                                PV: {pokemonToDisplay.stats.hp}
                            </div>
                            <div className="text-md">
                                Attaque: {pokemonToDisplay.stats.atk}
                            </div>
                            <div className="text-md">
                                Défense: {pokemonToDisplay.stats.def}
                            </div>
                            <div className="text-md">
                                Attaque Spé.: {pokemonToDisplay.stats.spe_atk}
                            </div>
                            <div className="text-md">
                                Défense Spé.: {pokemonToDisplay.stats.spe_def}
                            </div>
                            <div className="text-md">
                                Vitesse: {pokemonToDisplay.stats.vit}
                            </div>
                        </div>
                    </div>

                    {/* Résistances */}
                    <div className="p-4 border-t border-[#FFCC00] mt-8">
                        <h2 className="text-2xl font-bold ">Résistances</h2>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {pokemonToDisplay.resistances.map((resistance) => (
                                <div key={resistance.name} className="text-md">
                                    {resistance.name}: x{resistance.multiplier}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Évolutions */}
                    <div className="p-4 border-t border-[#FFCC00] mt-8">
                        <h2 className="text-2xl font-bold ">Évolutions</h2>
                        {pokemonToDisplay.evolution &&
                            pokemonToDisplay.evolution.next && (
                                <ul className="list-inside mt-2 list-none">
                                    {pokemonToDisplay.evolution.next.map(
                                        (evo) => (
                                            <li
                                                key={evo.pokedex_id}
                                                className="text-md"
                                            >
                                                👉 {evo.name} - {evo.condition}
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                    </div>
                </div>
            </div>
            <footer className="text-center p-4">&copy;M-RikCorp - 2024</footer>
        </>
    );
}
