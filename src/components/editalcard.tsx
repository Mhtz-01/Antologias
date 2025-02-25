import React from 'react';

interface EditalProps {
    title: string;
    description: string;
    icon: string;
}

const EditalCard: React.FC<EditalProps> = ({ title, description, icon}) => {
    return (
        <div className="bg-white rounded-xl shadow-md flex flex-row text-slate-800 p-3 w-11/12 hover:bg-slate-100 cursor-pointer gap-4">
            <img alt={icon} src="https://i.postimg.cc/QMQgBLBs/Azul-2-2021.png" className='size-14'></img>
            
            <div className='w-px h-full bg-slate-500'></div>
            
            <div className='flex flex-col'>
                <span className='font-bold'>
                    {title}    
                </span>
                <span>
                    {description}    
                </span>
            </div>
                  
        </div>
    );
};

export default EditalCard;
