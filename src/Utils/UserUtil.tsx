import { FirebaseError } from '@firebase/util';
import { SignInUser, SignUpUser } from '../Types/Index';
import { getErrorMessage } from '../Config/Errors';
import { isAxiosError } from 'axios';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { dataBaseConnectionError } from './DisplayMessages';

// Functions
const updateUserProp = <T extends SignUpUser | SignInUser, K extends keyof T>(prop: K, value: string) => (prev: T):T => ({...prev, [prop]: value});

const catchApiErrors = async (error: unknown, screenAlert: (title: string, description: string) => void, userInfo?: FirebaseAuthTypes.UserCredential) => {
        if(error instanceof FirebaseError) {
            screenAlert('Erro de autenticacao', getErrorMessage(error.code));
            return;
        }

        if(isAxiosError(error)) {
            screenAlert('Axios error', `Message: ${error.message}\nCode: ${error.code}\nStatus: ${error.status}`);
        }
        else {
            dataBaseConnectionError(error, screenAlert);
        }

        userInfo && await userInfo.user.delete();
};

// function updateUserProp<K extends keyof User>(prop: K, value: User[K]) {
//   return (prev: User): User => ({
//     ...prev,
//     [prop]: value,
//   });
// }


// Types



export {updateUserProp, catchApiErrors};
