import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatGptApi } from '../api';
import { ChatGptResponse } from '../Types/Index';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

type Message = {
    role: 'user' | 'assistant';
    content: string;
}

const sampleAnswer = `Com base no seu perfil conservador e no seu objetivo de comprar um carro de R$200.000, aqui está o plano que sugiro:

1️⃣ Horizonte e planejamento:
Para atingir seu objetivo de forma segura, considerando sua renda de R$15.000/mês, recomendamos planejar um prazo de 18 a 24 meses para acumular o valor necessário, evitando riscos elevados.

2️⃣ Estratégia de investimento:
Como você prefere baixo risco, sugiro alocar seus recursos principalmente em:

- Renda fixa de alta segurança: CDBs, Tesouro Direto IPCA+ e fundos DI — representam 70% da sua carteira.
- Renda fixa de liquidez diária: para emergências e flexibilidade — 20% da carteira.
- Pequena exposição a renda variável conservadora: ETFs de grandes empresas ou fundos de ações de baixo risco — 10%, apenas para potencializar o retorno sem comprometer sua segurança.

3️⃣ Simulação de aporte mensal:
Para atingir R$200.000 em 2 anos, considerando a rentabilidade média estimada (5-6% ao ano em renda fixa e 7-8% incluindo a pequena parcela em renda variável), você precisaria investir aproximadamente R$7.500 por mês.


4️⃣ Observação de segurança:
Mantemos diversificação e liquidez, garantindo que seu objetivo seja atingido sem expor seu capital a riscos desnecessários.

Resumo:

Investimento seguro, acompanhamento automatizado e disciplina financeira para que você compre seu carro sem preocupações em até 2 anos. 🚗💰`;


const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);

    // Functions inside the component
    const sendMessage = async () => {
        if(input.trim() && !isTyping) {
            const newMessages: Message[] = [...messages, {role: 'user', content: input}];
            setMessages(newMessages);
            setInput('');
            setIsTyping(true);

            try{
                const response = await ChatGptApi.post<ChatGptResponse>('/chat/completions', {
                    model: 'gpt-3.5-turbo',
                    messages: newMessages.map(msg => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                });

                const reply = response.data.choices[0].message.content.trim();
                setMessages([...newMessages, {role: 'assistant', content: reply}]);
            }
            catch(error: any) {
                const errorMsg = error.response?.data?.error?.message || error.message || 'Unknown error';
                setMessages([...newMessages, {role: 'assistant', content: `Error processing the response: ${errorMsg}`}]);
            }
            setIsTyping(false);
        }
    };

    const test = () => {
        if(input.trim() && !isTyping) {
            const newMessages: Message[] = [...messages, {role: 'user', content: input}];
            setMessages(newMessages);
            setInput('');
            setIsTyping(true);
            setTimeout(() => {
              setMessages([...newMessages, {role: 'assistant', content: sampleAnswer}]);
              setIsTyping(false);
            }, 3000);
        }
    };


    return (
        <View style={localStyles.container}>
            <ScrollView style={localStyles.chatArea} contentContainerStyle={localStyles.chatContainer}>
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={[localStyles.message, msg.role === 'user' ? localStyles.userMsg : localStyles.assistantMsg]}
                    >
                        <Text style={localStyles.messageText}>{msg.content}</Text>
                    </View>
                ))}

                {isTyping && (
                    <View style={localStyles.typingContainer}>
                        <View style={localStyles.typingDot}/>
                        <View style={localStyles.typingDot}/>
                        <View style={localStyles.typingDot}/>
                    </View>
                )}
            </ScrollView>

            <View style={localStyles.inputContainer}>
                <TextInput
                    placeholder="Digite uma mensagem..."
                    style={localStyles.input}
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity style={localStyles.sendButton} onPress={test}>
                    <Text style={localStyles.sendText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    paddingBottom: 100,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
  },
  userMsg: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  assistantMsg: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  typingContainer: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'flex-start',
  },
  typingDot: {
    width: 8,
    height: 8,
    marginHorizontal: 3,
    borderRadius: 4,
    backgroundColor: '#aaa',
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f1f1f1',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    marginLeft: 20,
    borderColor: '#ccc',
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat;
