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

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/wealthpilot-app.git
cd wealthpilot-app
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o projeto:

```bash
npx react-native run-android
# ou
npx react-native run-ios
```



## 🗄️ Backend e Banco de Dados

O aplicativo se conecta a uma **API própria desenvolvida em Java**, que é responsável por gerenciar e armazenar os dados dos usuários.

### 🔗 Comunicação com a API

A comunicação entre o aplicativo e o backend é feita via requisições HTTP utilizando a biblioteca **Axios**, já configurada no projeto. A API está hospedada no serviço **Render** e é acessível pelo seguinte endpoint:

```
https://wealthpilot-api.onrender.com/api
```

### 🏛️ Funcionalidades da API

* **Autenticação**

  * Login de usuários.
  * Cadastro de novos usuários.

* **Gerenciamento de Dados**

  * Armazena informações como:

    * E-mail.
    * Senha.
    * Objetivo financeiro.
    * Perfil de risco do investidor.

* **Persistência**

  * Os dados são armazenados em um **banco de dados relacional**, garantindo que as informações dos usuários estejam salvas de forma consistente e segura.

### ⚙️ Tecnologias do Backend

* **Linguagem:** Java
* **Framework:** Spring Boot
* **Banco de Dados:** MySQL
* **Hospedagem:** Render

### 📡 Integração

O frontend (React Native) faz chamadas HTTP para o seguinte endpoint principal da API Java:
* `POST /signup` → Cadastro de novos usuários.


## 📱 Telas do App

### 🔑 **Login**

* Inputs: email e senha.
* Redireciona para Home em caso de sucesso ou exibe alertas em caso de erro.

### 📝 **Cadastro**

* Campos obrigatórios: email, senha, objetivo financeiro e perfil de investimento.
* Escolha do perfil de risco via Picker (`Conservador` ou `Arrojado`).
* Botão para retornar ao login.

### 💬 **Chat**

* Envio de mensagens para o modelo GPT.
* Respostas são exibidas em balões separados.
* Animação de "digitando" enquanto aguarda resposta da IA.

## 🎨 Estilo

* Layout responsivo com adaptação para diferentes tamanhos de tela.
* Cores e estilos definidos em `/Styles/GlobalStyles.ts` e estilos locais nas telas.
* Interface limpa e focada na experiência do usuário.

## 🛠️ Próximas melhorias

* ✔️ Envio de código para cliente para realizar uma validação de email
* ✔️ Salvamento do histórico de chat localmente.
* ✔️ Logout e persistência de sessão.

## Protótipo interativo do Figma
https://www.figma.com/proto/uaNUqmknx06Vk4ncmC6KqH/Sem-t%C3%ADtulo?node-id=0-1&t=fu8O62a2ZzfXCDWt-1
## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
