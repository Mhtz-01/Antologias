import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { SDG } from '@/domain/value-objects/SDGS';
import { Cause } from '@/domain/value-objects/causes';
import { Skill } from '@/domain/value-objects/skills';

interface EditalProps {
    title: string;
    description: string;
    icon: string;
    sponsor: string;
    funding_min: number;
    funding_max: number;
    sdgs: SDG[];
    causes: Cause[];
    skills: Skill[];
}

const EditalCard: React.FC<EditalProps> = ({ 
    title, description, icon, sponsor, funding_min, funding_max, sdgs, causes, skills 
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div 
            className="bg-white rounded-xl shadow-md text-slate-800 p-3 w-11/12 cursor-pointer gap-4 transition-transform duration-200 hover:scale-105"
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-4">
                    <img alt={title} src={icon} className='object-contain size-20' />
                    <div className='flex flex-col'>
                        <span className='font-bold text-lg'>{title}</span>
                        <span>{description}</span>
                        <span className='text-blue-600 font-semibold'>{sponsor}</span>
                    </div>
                </div>
                {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden mt-4 border-t border-slate-300 pt-4"
                    >
                        <p><strong>Financiamento:</strong> R$ {funding_min.toLocaleString()} - R$ {funding_max.toLocaleString()}</p>
                        <p><strong>ODS:</strong> {sdgs.join(', ')}</p>
                        <p><strong>Causas:</strong> {causes.join(', ')}</p>
                        <p><strong>Habilidades:</strong> {skills.join(', ')}</p>
                        <button 
                            className="mt-3 flex items-center text-blue-600 font-semibold hover:underline"
                        >
                            Ver mais detalhes <ArrowRight size={16} className="ml-1" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EditalCard;
