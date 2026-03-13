import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../constants';
import { X, User, Shield, Sword, Zap, Brain } from 'lucide-react';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

export function CharacterModal({ character, onClose }: CharacterModalProps) {
  if (!character) return null;

  const getPowerColor = (power: string) => {
    if (power.includes('X') || power.includes('EX')) return 'text-red-500';
    if (power.includes('SSS') || power.includes('SS')) return 'text-orange-500';
    if (power.includes('S')) return 'text-yellow-500';
    if (power.includes('A')) return 'text-green-500';
    return 'text-blue-500';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
        >
          {/* Header */}
          <div className="relative border-b border-zinc-800 bg-zinc-900/50 p-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-start justify-between pr-8">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-sans text-3xl font-bold tracking-tight text-white">
                    {character.name}
                  </h2>
                  <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-300">
                    {character.gender} / {character.age}
                  </span>
                </div>
                <p className="mt-2 font-mono text-sm text-zinc-400">
                  {character.affiliation}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`font-mono text-3xl font-black ${getPowerColor(character.combatPower)}`}>
                  {character.combatPower}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  Combat Power
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[70vh] overflow-y-auto p-6">
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Brain className="h-4 w-4" />
                    <h4 className="font-mono text-xs uppercase tracking-wider">Personality</h4>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-3">
                    <p className="text-sm text-zinc-300">{character.personality}</p>
                    <div className="mt-2 inline-block rounded border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-xs text-zinc-400">
                      {character.mbti}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <User className="h-4 w-4" />
                    <h4 className="font-mono text-xs uppercase tracking-wider">Characteristics</h4>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-3">
                    <p className="text-sm leading-relaxed text-zinc-300">{character.characteristics}</p>
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Zap className="h-4 w-4" />
                    <h4 className="font-mono text-xs uppercase tracking-wider">Aura</h4>
                  </div>
                  <div className="rounded-lg border border-red-900/30 bg-red-950/10 p-3">
                    <p className="text-sm leading-relaxed text-zinc-300">{character.aura}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Sword className="h-4 w-4" />
                    <h4 className="font-mono text-xs uppercase tracking-wider">Weapon</h4>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-3">
                    <p className="text-sm text-zinc-300">{character.weapon || 'None'}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <h4 className="font-mono text-xs uppercase tracking-wider">Image</h4>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-zinc-900">
                    <img 
                      src={`https://igx.kr/n/yQ/${character.imageCode}/1`} 
                      alt={character.name}
                      className="h-auto w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
