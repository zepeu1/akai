import { motion } from 'motion/react';
import { Character } from '../constants';
import { Shield, Sword, Zap } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  const getPowerColor = (power: string) => {
    if (power.includes('X') || power.includes('EX')) return 'text-red-500';
    if (power.includes('SSS') || power.includes('SS')) return 'text-orange-500';
    if (power.includes('S')) return 'text-yellow-500';
    if (power.includes('A')) return 'text-green-500';
    return 'text-blue-500';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(character)}
      className="relative cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 shadow-lg backdrop-blur-sm transition-colors hover:border-red-900/50 hover:bg-zinc-900"
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-red-900/10 blur-2xl transition-all group-hover:bg-red-900/20" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">
            <img 
              src={`https://igx.kr/n/yQ/${character.imageCode}/1`} 
              alt={character.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-zinc-100">
              {character.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-zinc-500">
              {character.affiliation}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`font-mono text-lg font-bold ${getPowerColor(character.combatPower)}`}>
            {character.combatPower}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
            Power Level
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-md bg-zinc-950/50 p-2">
          <Shield className="h-3 w-3 text-zinc-400" />
          <span className="font-mono text-xs text-zinc-300">{character.mbti}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-zinc-950/50 p-2">
          <Sword className="h-3 w-3 text-zinc-400" />
          <span className="truncate font-mono text-xs text-zinc-300">{character.weapon || 'None'}</span>
        </div>
      </div>

      <div className="relative z-10 mt-4 border-t border-zinc-800/50 pt-4">
        <div className="flex items-start gap-2">
          <Zap className="mt-0.5 h-3 w-3 shrink-0 text-yellow-500/70" />
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
            {character.aura}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
