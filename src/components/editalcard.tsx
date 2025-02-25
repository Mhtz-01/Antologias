import React from 'react';

interface EditalProps {
    title: string;
    description: string;
    icon: string;
    sponsor: string;
}

const EditalCard: React.FC<EditalProps> = ({ title, description, icon, sponsor }) => {
    return (
        <div className="bg-white rounded-xl shadow-md flex flex-row text-slate-800 p-3 w-11/12 hover:bg-slate-100 cursor-pointer gap-4">
            <img alt={icon} src={icon} className='object-contain size-20'></img>
            
            <div className='flex flex-col'>
                <span className='font-bold'>
                    {title}    
                </span>
                <span>
                    {description}    
                </span>
                <span>
                    {sponsor}
                </span>
            </div>

            <div className='w-px h-full bg-slate-300'></div>
                  
        </div>
    );
};

export default EditalCard;
