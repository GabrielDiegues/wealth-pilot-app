import { StyleSheet, TextInput, View, Text, Dimensions } from 'react-native';
import styles from '../Styles/GlobalStyles';
import { InputProps } from '../Types/ComponentsProperties';

const Input = ({msg, userInput, onChangeText, title, hideEntry, spaceAbove}: InputProps) => {
    const {height} = Dimensions.get('window');


    return (
        <View style={localStyles.fieldsContainer}>
            <Text style={[styles.fields, {paddingTop: (height / spaceAbove)}]}>{title}</Text>
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
