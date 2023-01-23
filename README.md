# Typescript POC - Airbnb Password Manager

Este projeto é um protótipo de um software que permite gerenciar os aluguéis de um quarto por usuário, de modo que cada quarto terá uma senha cadastrada pelo próprio usuário e que usará para destrancar sua porta, não sendo necessária a interação entre cliente e proprietário. Posteriormente essa API será integrada um bot do Telegram.

## Documentação das rotas:

* POST: /rent
* Body: { phone: 12985467845, password: senhalegal, room: 3, startDate: 2023-01-23, endDate: 2023-01-26}


* POST: /register
* Body: { name: João, password: senhalegal, phone: 12985467845 }


* GET: /history/1


* PUT: /password/1
* Body: { password: senhalegal, newPassword: senhamuitolegal }


* DELETE: /user/1
* Header: { authorization: senhalegal }