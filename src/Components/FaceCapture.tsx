import { View, Text, StyleSheet } from "react-native";
import LoginHeader from "./HeaderStyles/LoginHeader";
import Title from "./Title";

const FaceCapture = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bem-vindo!</Text>
            <Text style={styles.profileText}>Perfil de investimento: <Text style={styles.profileValue}>Conservador</Text></Text>

            <Text style={styles.sectionTitle}>Sugestão de carteira de investimento:</Text>

            <View style={styles.investmentItem}>
                <Text style={styles.investmentName}>Tesouro Selic</Text>
                <Text style={styles.investmentAllocation}>Alocação: 60%</Text>
            </View>

            <View style={styles.investmentItem}>
                <Text style={styles.investmentName}>Fundo Multimercado Conservador</Text>
                <Text style={styles.investmentAllocation}>Alocação: 30%</Text>
            </View>

            <View style={styles.investmentItem}>
                <Text style={styles.investmentName}>CDB 2 anos</Text>
                <Text style={styles.investmentAllocation}>Alocação: 10%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 60,
        backgroundColor: "#33363D",
        flex: 1,
    },
    welcomeText: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    profileText: {
        color: "#ffffff",
        fontSize: 18,
        marginBottom: 16,
        textAlign: "center",
    },
    profileValue: {
        color: "#AD0177",
        fontWeight: "bold",
    },
    sectionTitle: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },
    investmentItem: {
        backgroundColor: "#44464F",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
    },
    investmentName: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
    investmentAllocation: {
        color: "#AD0177",
        fontSize: 14,
        marginTop: 4,
    },
});

export default FaceCapture;
