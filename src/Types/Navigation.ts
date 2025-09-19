import { NavigatorScreenParams } from '@react-navigation/native';
import { RegisteredUser } from './Index';

type HomeProps = {
    params: NavigatorScreenParams<HomeDrawerParamList>;
    user: RegisteredUser;
}


type HomeDrawerParamList = {
    Chat: {user: RegisteredUser};
    Configurations: {user: RegisteredUser};
}


type AppStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: HomeProps;
}

export type {HomeDrawerParamList, AppStackParamList};
