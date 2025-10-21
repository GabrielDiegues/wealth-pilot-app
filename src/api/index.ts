import axios from 'axios';
import {WEALTH_PILOT_API_LOGIN, CHAT_GPT_API_KEY, BASE_WEALTH_PILOT_API_URL} from '@env';

const WealthPilotApi = axios.create({
    baseURL: BASE_WEALTH_PILOT_API_URL,
    headers: {
        Authorization: 'Basic ' + btoa(WEALTH_PILOT_API_LOGIN),
    },
});


const ChatGptApi = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Authorization': `Bearer ${CHAT_GPT_API_KEY}`,
        'Content-Type': 'application/json',
    },
});

export {WealthPilotApi, ChatGptApi};
