import { Text, View } from "react-native";
import { useEventContext } from "../Navigation/Context/EventContext";
import { useEffect } from "react";

const UserProfile = () => {
    // Inner variables
    const {firebaseUid} = useEventContext();

    // Inner functions
    useEffect(() => {
        try {
            
        }
    }, []);

    return (
        <View>
            <Text>Objetivo financeiro: </Text>
        </View>
    )
}

export default UserProfile;