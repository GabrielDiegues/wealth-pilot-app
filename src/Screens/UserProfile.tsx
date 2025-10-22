import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useEventContext } from '../Navigation/Context/EventContext';
import { useEffect, useState } from 'react';
import { WealthPilotApi } from '../api';
import { User } from '../Types/Index';
import { catchApiErrors } from '../Utils/UserUtil';
import { useScreenAlert } from '../Utils/DisplayMessages';

const UserProfile = () => {
    // Inner variables
    const screenAlert = useScreenAlert();
    const { firebaseUid } = useEventContext();
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Inner functions
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await WealthPilotApi.get<User>(`/users/${firebaseUid}`, {
                    timeout: 500000,
                });
                setLoggedUser(data);
            } catch (error) {
                catchApiErrors(error, screenAlert);
            }
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Carregando informações...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil do Usuário</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Objetivo financeiro:</Text>
                <Text style={styles.value}>
                    {loggedUser ? loggedUser.financialGoal : 'Indefinido'}
                </Text>

                <Text style={styles.label}>Perfil de investidor:</Text>
                <Text style={styles.value}>
                    {loggedUser ? loggedUser.riskProfile : 'Indefinido'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33363D',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 30,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#444854',
        borderRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 30,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 6,
    },
    label: {
        color: '#bbb',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
    },
    value: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#33363D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: 'white',
        marginTop: 15,
        fontSize: 16,
    },
});

export default UserProfile;
