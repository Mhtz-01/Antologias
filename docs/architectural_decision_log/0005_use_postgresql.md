# 5. Usar PostgreSQL  

**Data:** 10/12/2024  

## Contexto  

Para armazenar os dados da aplicação de forma segura e eficiente, precisamos de um banco de dados relacional. A escolha do banco de dados deve garantir desempenho e compatibilidade com a stack escolhida.  

## Decisão  

Optamos por utilizar **PostgreSQL** como banco de dados principal do projeto. O PostgreSQL é um banco de dados relacional de código aberto, conhecido por sua confiabilidade, conformidade com ACID e suporte a recursos avançados como transações, índices e consultas complexas. Além disso, ele pode ser facilmente hospedado na **Vercel** por meio de provedores compatíveis, como Neon e Supabase, garantindo uma infraestrutura escalável e de fácil configuração.  

## Consequências  

- A aplicação armazenará os dados em um banco relacional, garantindo integridade e consistência.  
- O PostgreSQL oferece suporte avançado para consultas complexas, melhorando a eficiência na manipulação dos dados.  
- A compatibilidade com diversas bibliotecas e ORM (como Prisma e TypeORM) facilita a integração com o backend.  
- A hospedagem na **Vercel** facilita a integração com a infraestrutura do projeto, proporcionando maior praticidade na configuração e manutenção do banco de dados.  
