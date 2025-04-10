export default function Footer(){
    return (
        <>
            {/* Rodapé */}
            <footer className="w-full bg-pcr text-white flex flex-col md:flex-row items-center justify-center gap-4 p-4 text-sm text-center md:text-left">
                <a href="https://portal.cin.ufpe.br/" target="_blank" rel="noopener noreferrer">
                    <img
                        className="w-20 md:w-28 object-contain"
                        src="https://i.postimg.cc/W4d6s9r6/HMB.png"
                        alt="CIn UFPE"
                    />
                </a>
                <span>
                    Esse site é feito por alunos por meio do projeto CIn-Bora Impactar em parceria com a Prefeitura de Recife.
                </span>
            </footer>
        </>
    )
}
