import { StyleSheet, TextInput, View, Text, Dimensions } from 'react-native';
import styles from '../Styles/GlobalStyles';

type inputProps = {
    msg: string;
    title: string;
    userInput: string;
    onChangeText: (text: string) => void;
    hideEntry?: boolean;
}

const Input = ({msg, userInput, onChangeText, title, hideEntry}: inputProps) => {
    const {height} = Dimensions.get('window');


    return (
        <View style={localStyles.fieldsContainer}>
            <Text style={[styles.fields, {paddingTop: (height / 10)}]}>{title}</Text>
            <TextInput style={localStyles.input}
                onChangeText={onChangeText}
                value={userInput}
                placeholder={msg}
                placeholderTextColor={'white'}
                secureTextEntry={hideEntry}
            />
        </View>
    );
};


const localStyles = StyleSheet.create({
    input: {
        fontSize: 13,
        borderBottomWidth: 1,
    },
    fieldsContainer: {
        alignItems: 'center',
    },
});

export default Input;
