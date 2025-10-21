import {Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Input from '../Components/Input';
import styles from '../Styles/GlobalStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../Types/Navigation';
import Title from '../Components/Title';
import { useEventContext } from '../Navigation/Context/EventContext';
import {catchApiErrors, updateUserProp} from '../Utils/UserUtil';
import FormButton from '../Components/FormButton';
import { useState } from 'react';
import { SignInUser, User } from '../Types/Index';
import {useScreenAlert} from '../Utils/DisplayMessages';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import LoginHeader from '../Components/HeaderStyles/LoginHeader';
import { WealthPilotApi } from '../api';


const Login = (props: NativeStackScreenProps<AppStackParamList>) => {
    const {navigation} = props;
    const {height} = Dimensions.get('window');
    const {loggedUser, setLoggedUser} = useEventContext();
    const [user, setUser] = useState<SignInUser>({
        email: '',
        password: '',
    });


    const [login, setLogin] = useState<boolean>(false);

    const screenAlert = useScreenAlert();

    // Functions inside the component


    //const changeText = (value: string, prop: string) => setUser(prev => ({...prev, [prop]: value}));


    const navigateToHome = () => {
        return navigation.reset({
        index: 0,
        routes: [{name: 'camera'}],
    });
    };


    const checkLogin = async () => {
        const hasEmptyField = !user.email.trim() || !user.password.trim();
        if(!hasEmptyField && !login) {
            setLogin(true);
            try {
                const userCredential = await signInWithEmailAndPassword(getAuth(), user.email, user.password);
                const uid = userCredential.user.uid;
                const {data} = await WealthPilotApi.get<User>(`/users/${uid}`, {
                    timeout: 500000,
                });
                console.log(data.financialGoal);
                console.log(data.riskProfile);
                setLoggedUser({firebaseUid: uid, financialGoal: data.financialGoal, riskProfile: data.riskProfile});
                console.log(loggedUser);
                navigateToHome();
            }
            catch(error) {
                //screenAlert('Network error', 'Something went wrong. Please try verify your network connection');
                catchApiErrors(error, screenAlert);
            }
        }
        else {
            screenAlert('Campos vazios', 'Por favor, preencha todos os campos');
        }
        setLogin(false);
    };


    return (
        <ScrollView style={styles.container}>
            <View>
                <LoginHeader />
                <Title text="Login"/>
            </View>

            <View style={[styles.fieldsContainer, {paddingTop: (height / 60)}]}>
                <Input
                    title="Email"
                    msg="Digite seu e-mail"
                    userInput={user.email}
                    onChangeText={(text: string) => setUser(updateUserProp('email', text))}
                    spaceAbove={10}
                />

                <Input
                    title="Senha"
                    msg="Digite sua senha"
                    userInput={user.password}
                    hideEntry={true}
                    onChangeText={(text: string) => setUser(updateUserProp('password', text))}
                    spaceAbove={10}
                />

                <FormButton
                    buttonTitle={login ? 'logando' : 'logar'}
                    onPressFunction={checkLogin}
                />
            </View>

            <View>
                <Text style={styles.signUpText}>Não tem uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUp}>Criar conta {'>'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
export default Login;
