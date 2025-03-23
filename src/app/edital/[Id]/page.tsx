
export default async function editalexpanded({params}: {params: {id: string}})
{
    
   return(


       <section className="flex flex-row justify-between items-center p-2 w-full h-screen"
        style={{ backgroundImage: "url(/recife.webp)", backgroundSize: "cover", backgroundPosition: "center" }}
        >


            <div className = "h-5/6 flex flex-col justify-start items-start grow m-6">

                <div className="w-full h-5/6 flex flex-col items-center justify-center">

                    <div className="w-full h-1/6 bg-[#F5F5F5] opacity-95 text-black flex items-center justify-center">
                       Title
                    </div>
                    <div className="w-full h-4/6 bg-[#F5F5F5] opacity-95 text-black flex items-center justify-center">
                        Description
                    </div>
                    <div className="w-full h-1/6 bg-[#F5F5F5] opacity-95 flex items-center justify-center">
                        <button className="px-6 py-3 bg-[#009FE3] opacity-100 hover:bg-green-700 transition-all text-white font-semibold rounded-lg">
                            Inscreva-se!
                        </button>
                    </div>

               </div>
                <div className="w-full h-1/6 bg-[#009FE3] opacity-95 text-white flex items-center justify-center">
                    ODS
                </div>

            </div>

            <div className="w-1/3 h-5/6 flex flex-col justify-start items-start m-6">

                <div className="w-full h-2/6 flex items-center justify-center" style={{ backgroundImage: "url(/recife.webp)", backgroundSize: "contain", backgroundPosition: "start" }}>
                </div>
                <div className="w-full h-3/6 bg-[#F5F5F5] opacity-95 flex flex-col items-center justify-center">
                    <div className="w-full h-1/6 bg-[#F5F5F5] opacity-95 text-blue-600 font-semibold flex items-center justify-center">
                        Sponsor
                    </div>
                    <div className="w-full h-4/6 bg-[#F5F5F5] opacity-95 text-black flex items-center justify-center">
                        Causes
                    </div>
                    <div className="w-full h-1/6 bg-[#F5F5F5] opacity-95 text-black flex items-center justify-center">
                        Skills
                    </div>
                </div>
                <div className="w-full h-1/6 bg-[#009FE3] opacity-95 text-white flex items-center justify-center">
                    Financiamento
                </div>

            </div>
            
        </section>
    )

}



    
