import { NavigatorScreenParams } from '@react-navigation/native';
import { RegisteredUser } from './Index';
import { FormProps } from './ComponentsProperties';

type HomeProps = {
    params: NavigatorScreenParams<HomeDrawerParamList>;
    user: RegisteredUser;
}


type HomeDrawerParamList = {
    Chat: {user: RegisteredUser};
    UpdateData: FormProps;
}


type AppStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: HomeProps;
}

export type {HomeDrawerParamList, AppStackParamList};
