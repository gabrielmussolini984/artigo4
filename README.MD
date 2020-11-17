# Aplicativo Web de Votação.
## É possivel votar em dois tópicos fixos: frontend e backend, há também uma página isolada do resultado da votação.

## Tecnologias utilizada:

  1. NodeJS
  2. WebSockets
  3. Javascript Vanilla
  4. Redis
  5. Postgres
  6. Nginx
  7. Docker Swarm


## Explicação dos serviços:

  - O **frontend de votação** é exposto utilizando o **nginx** como webserver, ao ser escolhido uma opção de voto é chamado o endpoint da aplicação localizada na pasta **vote-app**, o mesmo publica uma mensagem que é lida pelo **backend** que grava o voto no **postgres** e transmite em **tempo de execução** o resultado da votação para o **frontend de resultado**.

  - A estrutura do **docker swarm** está no arquivo **docker-stack.yml**.

## Para testar o projeto:
  - Pode ser testado via **docker-compose** ou se iniciado um **cluster swarm** pode-se fazer o deploy da aplicação.