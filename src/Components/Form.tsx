import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { FormProps } from '../Types/ComponentsProperties';
import styles from '../Styles/GlobalStyles';
import BackButton from './HeaderStyles/HeaderRight/BackButton';
import Title from './Title';
import Input from './Input';
import { Picker } from '@react-native-picker/picker';
import FormButton from './FormButton';
import FaceCapture from './FaceCapture';
import { ScrollView } from 'react-native-gesture-handler';


// Outer variables
const {height} = Dimensions.get('window');

const Form = ({ backButtonNavigation, title, fields, formButtonProps, user, onPickerValueChange, navigation }: FormProps) => {
    return (
        <View style={localStyles.container}>
            <View style={[styles.header, { height: 200 }]}>
                <View style={{ alignItems: 'flex-start' }}>
                    <BackButton onPress={backButtonNavigation} />
                </View>

                <View style={localStyles.titleContainer}>
                    <Title text={title} />
                </View>
            </View>


            {fields.map((item, _) =>
                <Input
                    title={item.title}
                    msg={item.msg}
                    userInput={item.userInput}
                    onChangeText={item.onChangeText}
                    spaceAbove={item.spaceAbove}
                />
            )}


            <View style={localStyles.pickerContainer}>
                <Text style={styles.fields}>Perfil de Investimento</Text>
                <View style={localStyles.pickerWrapper}>
                    <Picker
                        selectedValue={user.riskProfile}
                        onValueChange={onPickerValueChange}
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
                    buttonTitle="Cadastrar rosto"
                    onPressFunction={() => navigation.navigate('camera')}
                />
                <FormButton
                    buttonTitle={formButtonProps.buttonTitle}
                    onPressFunction={formButtonProps.onPressFunction}
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

export default Form;
