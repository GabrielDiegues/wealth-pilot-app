import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatGptApi } from '../api';
import { ChatGptResponse } from '../Types/Index';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

type Message = {
    role: 'user' | 'assistant';
    content: string;
}


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
                <TouchableOpacity style={localStyles.sendButton} onPress={sendMessage}>
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
