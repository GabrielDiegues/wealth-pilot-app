import { Dimensions, Text } from 'react-native';
import styles from '../Styles/GlobalStyles';

const Title = ({text}: {text: string}) => {
    const {height} = Dimensions.get('window');
    return (
        <Text style={[styles.title, {marginTop: (height / 10)}]}>{text}</Text>
    );
};

export default Title;
