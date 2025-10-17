import { Image, StyleSheet, View } from 'react-native';

const LoginHeader = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 250,
        },
    });

    return (
        <View style={styles.container}>
            <Image
                style={localStyles.header}
                source={require('../../Assets/WealthPilotLogo.png')}
            />
        </View>
    );
};


const localStyles = StyleSheet.create({
    header: {
        width: 200,
        height: 200,
    },
});


export default LoginHeader;
