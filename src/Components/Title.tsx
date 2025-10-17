import { Text } from 'react-native';
import styles from '../Styles/GlobalStyles';

const Title = ({text}: {text: string}) => {
    return (
        <Text style={[styles.title]}>{text}</Text>
    );
};

export default Title;
