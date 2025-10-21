import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Form from "../Components/Form";
import { HomeDrawerParamList } from "../Types/Navigation";
import { useEventContext } from "../Navigation/Context/EventContext";
import { View } from "react-native";

const UpdateData = (props: NativeStackScreenProps<HomeDrawerParamList>) => {
    // Inner variables
    const {loggedUser, setLoggedUser} = useEventContext();
    const {navigation} = props;

    // Inner functions
    const navigateToChat = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Chat'}],
        });
    };


    return (
        // <Form
        //     backButtonNavigation={navigateToChat}
        //     title="Atualize suas Informações"
        //     fields={}

        // />
        <View></View>
    );
};

export default UpdateData;
