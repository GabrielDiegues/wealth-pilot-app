import { Text, TouchableOpacity } from 'react-native';
import styles from '../Styles/GlobalStyles';
import { FormButtonProps } from '../Types/ComponentsProperties';

const FormButton = ({buttonTitle, onPressFunction}: FormButtonProps) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPressFunction}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default FormButton;
