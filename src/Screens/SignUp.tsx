import { Dimensions, StyleSheet, View, Text } from 'react-native';
import Title from '../Components/Title';
import styles from '../Styles/GlobalStyles';
import Input from '../Components/Input';
import {catchApiErrors, updateUserProp} from '../Utils/UserUtil';
import { Picker } from '@react-native-picker/picker';
import FormButton from '../Components/FormButton';
import { WealthPilotApi } from '../api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../Types/Navigation';
import {useScreenAlert}  from '../Utils/DisplayMessages';
import { useState } from 'react';
import BackButton from '../Components/HeaderStyles/HeaderRight/BackButton';
import { SignUpUser, RegisteredUser } from '../Types/Index';
import { createUserWithEmailAndPassword, FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';

const {height} = Dimensions.get('window');
const SignUp = (props: NativeStackScreenProps<AppStackParamList>) => {
    const {navigation} = props;
    const [user, setUser] = useState<SignUpUser>({
        email: '',
        password: '',
        financialGoal: '',
        riskProfile: '',
    });
    const [login, setLogin] = useState<boolean>(false);


    const navigateToLogin = () => {
        return navigation.reset({
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
        <View style={localStyles.container}>
            <View style={styles.header}>
                <BackButton onPress={navigateToLogin} />
                <View style={localStyles.titleContainer}>
                    <Title text="Cadastro"/>
                </View>
            </View>

            <Input
                title="Email"
                msg="Digite seu email"
                userInput={user.email}
                onChangeText={text => setUser(updateUserProp('email', text))}
            />

            <Input
                title="Senha"
                msg="Digite sua Senha"
                userInput={user.password}
                hideEntry={true}
                onChangeText={text => setUser(updateUserProp('password', text))}
            />

            <Input
                title="Objetivo Financeiro"
                msg="Digite seu objetivo"
                userInput={user.financialGoal}
                onChangeText={text => setUser(updateUserProp('financialGoal', text))}
            />

            <View style={localStyles.pickerContainer}>
                <Text style={styles.fields}>Perfil de Investimento</Text>
                <View style={localStyles.pickerWrapper}>
                    <Picker
                        selectedValue={user.riskProfile}
                        onValueChange={(itemValue) => setUser(updateUserProp('riskProfile', itemValue))}
                    >
                        <Picker.Item
                            key={1}
                            label={'Selecione'}
                            value={''}
                        />

                        <Picker.Item
                            key={2}
                            label={'Conservador'}
                            value={'conservative'}
                        />

                        <Picker.Item
                            key={3}
                            label={'Arrojado'}
                            value={'aggressive'}
                        />
                    </Picker>
                </View>

                <FormButton
                    buttonTitle={login ? 'Cadastrando' : 'Cadastrar'}
                    onPressFunction={createAccount}
                />
            </View>
        </View>
    );
};


const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33363D',
        alignItems: 'center',
    },
    pickerContainer: {
        paddingTop: (height / 25),
        alignItems: 'center',
    },
    pickerWrapper: {
        marginTop: 40,
        width: 200,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default SignUp;
