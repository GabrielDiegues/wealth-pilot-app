import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignUpUser } from './Index';
import { AppStackParamList } from './Navigation';

type InputProps = {
    msg: string;
    title: string;
    userInput: string;
    onChangeText: (text: string) => void;
    spaceAbove: number;
    hideEntry?: boolean;
};


type FormButtonProps = {
    buttonTitle: string;
    onPressFunction: () => void;
}


type FormProps = {
    backButtonNavigation: () => void;
    title: string;
    fields: InputProps[];
    formButtonProps: FormButtonProps;
    user: SignUpUser
    onPickerValueChange: (item: 'conservative' | 'aggressive' | '') => void;
    navigation: NativeStackNavigationProp<AppStackParamList>
}

export type {InputProps, FormButtonProps, FormProps};
