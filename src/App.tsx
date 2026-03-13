/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CHARACTERS, Character } from './constants';
import { CharacterCard } from './components/CharacterCard';
import { CharacterModal } from './components/CharacterModal';
import { Search, Filter } from 'lucide-react';

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAffiliation, setFilterAffiliation] = useState('All');

  const affiliations = ['All', ...new Set(CHARACTERS.map(c => c.affiliation))];

  const filteredCharacters = CHARACTERS.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          char.aura.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAffiliation = filterAffiliation === 'All' || char.affiliation === filterAffiliation;
    return matchesSearch && matchesAffiliation;
  });

  const groupedCharacters = filteredCharacters.reduce((acc, char) => {
    if (!acc[char.affiliation]) {
      acc[char.affiliation] = [];
    }
    acc[char.affiliation].push(char);
    return acc;
  }, {} as Record<string, Character[]>);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-red-900/50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-sans text-3xl font-black tracking-tighter text-white sm:text-4xl">
                PROJECT AKAI
              </h1>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-red-500">
                Deathmatch Roster // 2035
              </p>
            </div>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 font-mono text-sm text-zinc-300 placeholder-zinc-600 focus:border-red-900/50 focus:outline-none focus:ring-1 focus:ring-red-900/50 sm:w-64"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <select
                  value={filterAffiliation}
                  onChange={(e) => setFilterAffiliation(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-8 font-mono text-sm text-zinc-300 focus:border-red-900/50 focus:outline-none focus:ring-1 focus:ring-red-900/50 sm:w-48"
                >
                  {affiliations.map(aff => (
                    <option key={aff} value={aff}>{aff}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-mono text-sm text-zinc-500">
            Showing {filteredCharacters.length} participants
          </h2>
        </div>

        <div className="space-y-16">
          {Object.entries(groupedCharacters).map(([affiliation, chars]) => (
            <section key={affiliation}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="font-sans text-2xl font-bold tracking-tight text-white">
                  {affiliation}
                </h2>
                <div className="h-px flex-1 bg-zinc-800"></div>
                <span className="font-mono text-xs text-zinc-500">{chars.length} Members</span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {chars.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onClick={setSelectedCharacter}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="mt-20 text-center">
            <p className="font-mono text-zinc-500">No participants found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
}
