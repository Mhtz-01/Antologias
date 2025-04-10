import {render, waitFor, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import EditalExpanded from "@/app/editais/[id]/page";
import { useParams, useRouter } from "next/navigation";

jest.mock('next/navigation', () =>({
    useRouter: jest.fn(),
    useParams: jest.fn()

}));

const mock_UseParams = useParams as jest.Mock;
const mock_RouterParams = useRouter as jest.Mock;

describe('EditalExpanded component', () =>{
   
    beforeEach(()=>{
        jest.clearAllMocks();
    });


    test('Exibe erro de edital não fornecido', async()=> {
        mock_UseParams.mockReturnValue({});
        mock_RouterParams.mockReturnValue({push:jest.fn()});

        render(<EditalExpanded/>);
        await waitFor(()=> expect(screen.getByText("ID do edital não fornecido.")).toBeInTheDocument());
        
    });

    test('Exibe erro de edital não encontrado', async()=> {
        render(<EditalExpanded/>);
        await waitFor(()=> expect(screen.getByText("Edital não encontrado")).toBeInTheDocument());
        
    });

    test("Testa se a mensagem de 'carregando...' é exibida", async()=>{
        mock_UseParams.mockReturnValue({id: "1"});

        global.fetch = jest.fn(()=> 
            new Promise((resolve) => 
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: () => Promise.resolve({
                            id: "1",
                            title: "---",
                            description: "...",
                            sponsor: "...",
                            causes: "...",
                            skills: "...",
                            sdgs: "...",
                            funding: "...",
                            icon: "url(/recife.webp)"
                            }),
                    });
                }, 100) //Delay
            )
        ) as jest.Mock;
        
    
        render(<EditalExpanded/>);

        expect(screen.getByText("Carregando...")).toBeInTheDocument();
        
    })


    test("Exibe os dados do edital depois do fetch", async()=>{
        mock_UseParams.mockReturnValue({id: "2"});

        const editalMock = {
            id: "2",
            title: "Edital de financiamento",
            description: "A Prefeitura do Recife abriu um edital de financiamento de ongs voltadas à educação musical de crianças no ensino funcamental e médio",
            sponsor: "Prefeitura do Recife",
            causes: "Causas sociais",
            skills: "Softskills",
            sdgs: "ODS 2, ODS 3",
            funding: "R$ 50.000,00 - 120.000,00",
            icon: "/public/recife.webp"

        }

        global.fetch = jest.fn(()=>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(editalMock),
        }) 
        )as jest.Mock;

        render(<EditalExpanded/>);

        await waitFor(()=> expect(screen.getByText("Edital de financiamento")).toBeInTheDocument());

        expect(screen.getByText("Edital de financiamento")).toBeInTheDocument();
        expect(screen.getByText("Prefeitura do Recife")).toBeInTheDocument();
        expect(screen.getByText("Causas sociais")).toBeInTheDocument();
        expect(screen.getByText("Softskills")).toBeInTheDocument();
        expect(screen.getByText("ODS 2, ODS 3")).toBeInTheDocument();
        expect(screen.getByText("R$ 50.000,00 - 120.000,00")).toBeInTheDocument();
        expect(screen.getByText("Inscreva-se!")).toBeInTheDocument();
        
    })

    test("Exibe se o ícone do edital é renderizado", async()=>{
        mock_UseParams.mockReturnValue({id: "3"});

        const editalMock = {
            id: "3",
            title: "---",
            description: "...",
            sponsor: "...",
            causes: "...",
            skills: "...",
            sdgs: "...",
            funding: "...",
            icon: "url(/recife.webp)"

        }

        global.fetch = jest.fn(()=>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(editalMock),
        }) 
        )as jest.Mock;

        render(<EditalExpanded/>);

        await waitFor(()=> expect(screen.getByText("---")).toBeInTheDocument());

        const divs = document.querySelectorAll("div")
        const iconInDiv = Array.from(divs).some((div) =>
            div.style.backgroundImage.includes(editalMock.icon)
        );
        expect(iconInDiv).toBe(true);
    })
})
