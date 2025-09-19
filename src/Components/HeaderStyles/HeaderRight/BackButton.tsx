import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';

const BackButton = ({onPress}: {onPress: () => void}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesomeIcon icon={faArrowLeft} color="#FFFFFF" />
        </TouchableOpacity>
    );
};

export default BackButton;
