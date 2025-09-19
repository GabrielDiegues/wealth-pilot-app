interface User {
    financialGoal: string;
    riskProfile: 'conservative' | 'aggressive' | '';
}

interface RegisteredUser extends User {
    firebaseUid: string;
}

interface SignUpUser extends User {
    email: string;
    password: string;
}


interface SignInUser {
    email: string;
    password: string;
}

type Message = {
    content: string;
}


type Choices = {
    message: Message;
}


type ChatGptResponse = {
    choices: Choices[];
}

export type {RegisteredUser, SignUpUser, SignInUser, ChatGptResponse};
