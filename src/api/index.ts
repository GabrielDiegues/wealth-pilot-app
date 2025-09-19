import axios from 'axios';
import {WEALTH_PILOT_API_LOGIN, CHAT_GPT_API_KEY} from '@env';

const WealthPilotApi = axios.create({
    baseURL: 'https://wealthpilot-api.onrender.com/api',
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
