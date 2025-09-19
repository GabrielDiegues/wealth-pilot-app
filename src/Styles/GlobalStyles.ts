import { StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#33363D',
        },
        title: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 31,
            textAlign: 'center',
        },
        fields: {
            color: 'white',
            fontSize: 20,
        },
        fieldsContainer: {
            flex: 1,
            alignItems: 'center',
        },
        buttonText: {
            color: 'white',
        },
        buttonContainer: {
            backgroundColor: 'black',
            elevation: 3,
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            paddingRight: 35,
            paddingLeft: 35,
            marginTop: 60,
        },
        signUpText: {
            marginLeft: 50,
            marginTop: 60,
            color: 'white',
        },
        signUp: {
            color: 'white',
            marginLeft: 50,
            marginTop: 10,
            fontWeight: 'bold',

        },
        header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        },
    });

export default styles;
