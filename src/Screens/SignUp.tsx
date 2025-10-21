import {catchApiErrors, updateUserProp} from '../Utils/UserUtil';
import { WealthPilotApi } from '../api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../Types/Navigation';
import {useScreenAlert}  from '../Utils/DisplayMessages';
import { useState } from 'react';
import { SignUpUser, RegisteredUser } from '../Types/Index';
import { createUserWithEmailAndPassword, FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';
import Form from '../Components/Form';
import { InputProps } from '../Types/ComponentsProperties';

// Outside variables
const spaceAbove = 20;

const SignUp = (props: NativeStackScreenProps<AppStackParamList>) => {
    const {navigation} = props;
    const [user, setUser] = useState<SignUpUser>({
        email: '',
        password: '',
        financialGoal: '',
        riskProfile: '',
    });
    const [login, setLogin] = useState<boolean>(false);


    const inputFields: InputProps[] = [
        {
            title: 'Email',
            msg: 'Digite seu email',
            userInput: user.email,
            onChangeText: text => setUser(updateUserProp('email', text)),
            spaceAbove: spaceAbove,
        },
        {
            title: 'Senha',
            msg: 'Digite sua senha',
            userInput: user.password,
            onChangeText: text => setUser(updateUserProp('password', text)),
            spaceAbove: spaceAbove,
        },
        {
            title: 'Objetivo Financeiro',
            msg: 'Digite seu objetivo',
            userInput: user.financialGoal,
            onChangeText: text => setUser(updateUserProp('financialGoal', text)),
            spaceAbove: spaceAbove,
        },
    ];


    const navigateToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        });
    };


    const screenAlert = useScreenAlert();


    const createAccount = async () => {
        const hasEmptyFields = Object.values(user).some(value => !value.trim());
        if(hasEmptyFields) {
            screenAlert('Campos vazios', 'Por favor, preencha todos os campos');
        }
        else {
            setLogin(true);
            let userInfo!: FirebaseAuthTypes.UserCredential;
            try{
                userInfo = await createUserWithEmailAndPassword(getAuth(), user.email, user.password);
                const registeredUser: RegisteredUser = {
                     firebaseUid: userInfo.user.uid,
                     financialGoal: user.financialGoal,
                     riskProfile: user.riskProfile,
                    };
                await WealthPilotApi.post<string>('/users/signup', registeredUser, {
                    timeout: 500000,
                });
                navigateToLogin();
            }
            catch(error) {
                catchApiErrors(error, screenAlert, userInfo);
            }
            setLogin(false);
        }
    };


    return (
        <Form
            backButtonNavigation={navigateToLogin}
            title="Cadastro"
            fields={inputFields}
            formButtonProps={{buttonTitle: login ? 'Cadastrando' : 'Cadastrar', onPressFunction: createAccount}}
            user={user}
            onPickerValueChange={(itemValue: 'conservative' | 'aggressive' | '') => setUser(updateUserProp('riskProfile', itemValue))}
        />
    );
};

export default SignUp;
