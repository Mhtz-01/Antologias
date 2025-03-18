# Editais - CinBoraImpactar

Um projeto realizado para a disciplina de Desenvolvimento de Software para ajudar organizações não-governamentais (ONGs) a encontrar oportunidades de fomentos como editais.

## Equipe

| <img src='https://avatars.githubusercontent.com/u/98993176?v=4' alt='Felipe Oliveira' width='70' height='70'> | <img src='https://avatars.githubusercontent.com/u/175709055?v=4' alt='Paulo César' width='70' height='70'> | <img src='https://avatars.githubusercontent.com/u/167444133?v=4' alt='Thaphylla Ayanny' width='70' height='70'> | <img src='https://avatars.githubusercontent.com/u/176044570?v=4' alt='Matheus Sobreira' width='70' height='70'> | <img src='https://avatars.githubusercontent.com/u/176046281?v=4' alt='Mateus Alexandre' width='70' height='70'> |
|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| [Felipe Oliveira](https://github.com/feelps-1)                                                                                             | [Paulo César](https://github.com/paulo-cesar-pereira)                                                                                     | [Thaphylla Ayanny](https://github.com/tatudep)                                                                                             | [Matheus Sobreira](https://github.com/Mhtz-01)                                                                                             | [Mateus Alexandre](https://github.com/Alexslec)                                                                                             |

---

## Tecnologias Utilizadas (Stack)

- **Front-end:** Next.js, React, Typescript
- **Back-end:** Node.js
- **Banco de Dados:** PostgreSQL, SQL
- **Testes:** Jest

---

## Funcionalidades

- **Listar editais disponíveis**
- **Expandir detalhes de um edital**
- **Salvar editais para visualizar depois**
- **Receber recomendações de editais com base no perfil da ONG**
- **Filtrar pesquisa de editais por critérios como área de atuação, valor do fomento, etc.**

---

## Diagrama de Classes

```mermaid
classDiagram
    class Edital {
        +id: number
        +title: string
        +icon: string
        +description: string
        +funding_min: number
        +funding_max: number
        +sponsor: Sponsor
        +sdgs: SDG[]
        +causes: Cause[]
        +skills: Skill[]
    }

    class Sponsor {
        +id: number
        +name: string
        +iconUrl: string
        +description: string
        +site: string
        +contactEmail: string
        +phone?: string
    }

    class User {
        +name: string
        +email: string
        +ngo: NGO
    }

    class NGO {
        +id: number
        +name: string
        +description: string
        +is_formalized: boolean
        +start_year: number
        +contact_phone: string
        +instagram_link: string
        +x_link: string
        +facebook_link: string
        +pix_qr_code_link: string
        +gallery_images_url: string[]
        +skills: Skill[]
        +causes: Cause[]
        +sdgs: SDG[]
    }

    class Cause {
        +id: number
        +name: string
    }

    class SDG {
        +id: number
        +name: string
        +code: string
    }

    class Skill {
        +id: number
        +name: string
    }

    Edital --> Sponsor
    Edital --> SDG
    Edital --> Cause
    Edital --> Skill
    User --> NGO
    NGO --> Skill
    NGO --> Cause
    NGO --> SDG
```

---

## Contribuição

Contribuições são bem-vindas! Para contribuir, siga estas etapas:

1. **Fork** o repositório
2. Crie uma nova branch: `git checkout -b minha-feature`
3. Faça as alterações e commit: `git commit -m 'Adiciona nova feature'`
4. Envie as alterações: `git push origin minha-feature`
5. Abra um **Pull Request**

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
