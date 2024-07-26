# processoseletivo

# Relatório de Implementação Docker

## Objetivo

Meu objetivo principal era implementar a aplicação utilizando Docker para garantir um ambiente de desenvolvimento consistente e facilitar a implantação em produção.

## Desafios e Soluções

Durante o processo de implementação, encontrei um problema na configuração do Docker Compose para gerenciar os múltiplos contêineres da aplicação (frontend, backend e banco de dados). O erro persistente de "UnknownHostException: database" indicava que o backend não conseguia se conectar ao banco de dados PostgreSQL, mesmo após diversas tentativas de configuração.

Devido à limitação de tempo, não foi possível investigar e solucionar completamente esse problema dentro do prazo estabelecido.

## Trabalhando Localmente

Para o desenvolvimento local da aplicação, optei por uma solução alternativa:

1. **Criação de um Contêiner PostgreSQL Isolado:** Utilizei o Docker para criar um contêiner isolado para o banco de dados PostgreSQL, executando o seguinte comando:

   ```bash
   docker run -d --name postgres-local -e POSTGRES_PASSWORD=admin -p 5432:5432 postgres:latest
   ```

2. **Configuração do `application.properties`:** Ajustei o arquivo `application.properties` da aplicação Spring Boot para se conectar ao banco de dados local:

   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/bd_app_cadastro
   spring.datasource.username=postgres
   spring.datasource.password=admin
   ```

Com essa configuração, a aplicação consegue se conectar ao banco de dados PostgreSQL em execução no contêiner Docker local, permitindo o desenvolvimento e testes da aplicação.


