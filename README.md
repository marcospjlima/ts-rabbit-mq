# Projeto webservice para utilização da mensageria Rabbitmq utilizando Typescript
#### Esse projeto é um exemplo simples para verificar se um número é par ou impar e de acordo com o tipo é adicionado em sua respectiva fila para ser consumido.

> **Comandos utilizados:**

* yarn init -y
* yarn add typescript -D
* yarn tsc --init 
* yarn add typescript ts-node nodemon -D
* yarn add express
* yarn add @types/express -D
* yarn add cors
* yard add @types/cors -D
* yarn add dotenv
* yarn add @types/dotenv -D
* yarn add amqplib-plus
* yarn add amqplib
* yarn add @types/amqplib -D

> Para instalar as bibliotecas do projeto: 
* **yarn install** ou **npm install**

> Docker
>> * Para baixar a imagem:
docker pull rabbitmq

>> * Para instalar o container do rabbitmq: 
>> Ex: docker run -d --hostname rabbit_02 -p 15672:15672 -p 5672:5672 rabbitmq:3-management

> Rabbitmq
>> URL do gerenciador do Rabbitmq http://localhost:15672/.
>> * Usuario e Senha: guest
>> * Necessário criar os itens abaixo: 
>> 1. Exchange: Numeros 
>> 2. Filas: Par e Impar
>> 3. Rotas: par e impar (minúsculo) 

> **Executar as funcionalidade desse projeto**
>> * Obs: O Rabbitmq tem que estar ativo/online 

> **Comando para executar os serviços Produtor e Consumidor por FILA**
>> 1. yarn start (servidor)
>> 2. yarn worker (consumidor)

> **URL para testar por Fila **
>> localhost:3333/queue

> **JSON**
```
{
	"name": "John W"
}
```

> **Comando para executar os serviços Produtor e Consumidor por ROTA**
>> 1. yarn start (servidor)
>> 2. yarn worker_par (consumidor da fila PAR)
>> 3. yarn worker_impar (consumidor da fila IMPAR)

> **URL para testar por Rota**
>> localhost:3333/exchange

> **JSON**
```
{
	"numInicio": "1",
	"total": "150"
}
```
