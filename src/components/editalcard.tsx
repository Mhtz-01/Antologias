import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { SDG } from '@/domain/value-objects/SDGS';
import { Cause } from '@/domain/value-objects/causes';
import { Skill } from '@/domain/value-objects/skills';
import Link from 'next/link';
import Deadline from '@/domain/value-objects/deadline';

interface EditalProps {
    id: number | null;
    title: string;
    description: string;
    icon: string;
    sponsor: string;
    funding_min: number;
    funding_max: number;
    sdgs: SDG[];
    causes: Cause[];
    skills: Skill[];
    deadline: Deadline;
}

const EditalCard: React.FC<EditalProps> = ({
    id, title, description, icon, sponsor, funding_min, funding_max,
    sdgs, causes, skills, deadline
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="bg-white rounded-xl shadow-md text-slate-800 p-4 w-11/12 cursor-pointer gap-4 transition-transform duration-200 hover:scale-105"
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex justify-between items-center">
                <div className="flex flex-row gap-4 items-start">
                    <img alt={title} src={icon} className='object-contain size-20' />
                    <div className='flex flex-col'>
                        <span className='font-bold text-lg'>{title}</span>
                        <span className='text-sm text-slate-700'>{description}</span>
                        <span className='text-blue-600 font-semibold text-sm mt-1'>{sponsor}</span>
                    </div>
                </div>

                <div className="text-sm text-right text-slate-600">
                    <p>{deadline.formatEditalDeadline()}</p>
                    {expanded ? <ChevronUp size={20} className="ml-auto mt-2" /> : <ChevronDown size={20} className="ml-auto mt-2" />}
                </div>
            </div>

            {expanded && (
                <div className="mt-4 border-t border-slate-300 pt-4 space-y-3">
                    <p><strong>Financiamento:</strong> R$ {funding_min.toLocaleString()} - R$ {funding_max.toLocaleString()}</p>

                    <div>
                        <strong>ODS:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {sdgs.map((sdg, i) => (
                                <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {sdg.name || sdg.id}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <strong>Causas:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {causes.map((cause, i) => (
                                <span key={i} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                    {cause.name || cause.id}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <strong>Habilidades:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {skills.map((skill, i) => (
                                <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {skill.name || skill.id}
                                </span>
                            ))}
                        </div>
                    </div>

                    <Link href={`/editais/${id}`}>
                        <button className="mt-3 flex items-center text-blue-600 font-semibold hover:underline">
                            Ver mais detalhes <ArrowRight size={16} className="ml-1" />
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EditalCard;
