import { Image, StyleSheet, View } from 'react-native';

const LoginHeader = () => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#33363D',

        },
    });

    return (
        <View style={styles.container}>
            <Image
                style={localStyles.header}
                source={require('../../Assets/XpLogo.png')}
            />
        </View>
    );
};


const localStyles = StyleSheet.create({
    header: {
        width: 10,
        height: 10,
    },
});


export default LoginHeader;
