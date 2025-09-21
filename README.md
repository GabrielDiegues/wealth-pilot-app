# 💸 WealthPilot App

# Grupo
- Bernardo Pinto Rocha - RM99209
- Gabriel Diegues - RM550788
- Luiza Cristina - RM99367
- Pedro Palladino - RM551180
- Renato Izumi - RM99242

Aplicativo mobile desenvolvido em **React Native**, que permite aos usuários criarem uma conta, realizarem login e conversarem com uma inteligência artificial com o objetivo de receberem recomendações de carteiras de investimento.

## 🧠 Funcionalidades

* 🔐 **Autenticação**

  * Cadastro de usuário com:
    * Email
    * Senha
    * Objetivo financeiro
    * Perfil de investimento (Conservador ou Arrojado)
  * Login seguro com validação de campos e feedback de erros.
  * Integração com **Firebase Authentication** para armazenamento seguro de credenciais (email e senha).

* 💬 **Chat com IA**

  * Interface de chat com integração ao **ChatGPT**.
  * Mensagens exibidas em formato de balões, diferenciando usuário e assistente.
  * Indicador de digitação (três bolinhas) enquanto a IA processa a resposta.

## 🚀 Tecnologias Utilizadas

* [React Native](https://reactnative.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Navigation](https://reactnavigation.org/)
* [Axios](https://axios-http.com/)
* [@react-native-picker/picker](https://github.com/react-native-picker/picker)
* [Firebase Authentication](https://firebase.google.com/docs/auth)

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/wealthpilot-app.git
cd wealthpilot-app

	2.	Instale as dependências:

npm install
# ou
yarn install

	3.	Execute o projeto:

npx react-native run-android
# ou
npx react-native run-ios

🗄️ Backend e Banco de Dados

O aplicativo se conecta a uma API própria desenvolvida em Java, que é responsável por gerenciar e armazenar os dados adicionais dos usuários.

🔐 Autenticação com Firebase
	•	O Firebase Authentication é utilizado para armazenar e validar as credenciais de login (email e senha).
	•	Ao cadastrar ou autenticar um usuário, o Firebase UID é retornado.
	•	Esse UID é salvo no banco de dados da aplicação e utilizado como chave para identificar o usuário.

📊 Uso do Banco de Dados

O banco de dados é utilizado para armazenar:
	•	O Firebase UID de cada usuário.
	•	O objetivo financeiro informado no cadastro.
	•	O perfil de investimento selecionado (Conservador ou Arrojado).

🔗 Comunicação com a API

A comunicação entre o aplicativo e o backend é feita via requisições HTTP utilizando a biblioteca Axios, já configurada no projeto. A API está hospedada no serviço Render e é acessível pelo seguinte endpoint:

https://wealthpilot-api.onrender.com/api

🏛️ Funcionalidades da API
	•	Autenticação de usuários cadastrados
	•	Cadastro de novos usuários vinculados ao UID do Firebase.
	•	Gerenciamento de Dados
	•	Armazena informações no banco de dados como:
	•	Firebase UID
	•	Objetivo financeiro
	•	Perfil de risco do investidor
	•	Persistência
	•	Os dados são armazenados em um banco de dados relacional, garantindo que as informações dos usuários estejam salvas de forma consistente e segura.

⚙️ Tecnologias do Backend
	•	Linguagem: Java
	•	Framework: Spring Boot
	•	Banco de Dados: MySQL
	•	Hospedagem: Render

📡 Integração

O frontend (React Native) faz chamadas HTTP para o seguinte endpoint principal da API Java:
	•	POST /signup → Cadastro de novos usuários com UID do Firebase.

📱 Telas do App

🔑 Login
	•	Inputs: email e senha.
	•	Autenticação via Firebase Authentication.
	•	Redireciona para Home em caso de sucesso ou exibe alertas em caso de erro.

📝 Cadastro
	•	Campos obrigatórios: email, senha, objetivo financeiro e perfil de investimento.
	•	Registro de credenciais no Firebase.
	•	Salvamento do UID, objetivo financeiro e perfil de investimento no banco de dados.
	•	Escolha do perfil de risco via Picker (Conservador ou Arrojado).
	•	Botão para retornar ao login.

💬 Chat
	•	Envio de mensagens para o modelo GPT.
	•	Respostas são exibidas em balões separados.
	•	Animação de “digitando” enquanto aguarda resposta da IA.

🎨 Estilo
	•	Layout responsivo com adaptação para diferentes tamanhos de tela.
	•	Cores e estilos definidos em /Styles/GlobalStyles.ts e estilos locais nas telas.
	•	Interface limpa e focada na experiência do usuário.

🛠️ Próximas melhorias
	•	✔️ Envio de código para cliente para realizar uma validação de email
	•	✔️ Salvamento do histórico de chat localmente.
	•	✔️ Logout e persistência de sessão.

Protótipo interativo do Figma

https://www.figma.com/proto/uaNUqmknx06Vk4ncmC6KqH/Sem-t%C3%ADtulo?node-id=0-1&t=fu8O62a2ZzfXCDWt-1

🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.