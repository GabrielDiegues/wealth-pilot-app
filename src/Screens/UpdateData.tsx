import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Form from "../Components/Form";
import { HomeDrawerParamList } from "../Types/Navigation";
import { useEventContext } from "../Navigation/Context/EventContext";
import { View } from "react-native";
import { RegisteredUser, SignUpUser } from "../Types/Index";
import { useState } from "react";
import { InputProps } from "../Types/ComponentsProperties";
import { updateUserProp } from "../Utils/UserUtil";
import { WealthPilotApi } from "../api";
import { useScreenAlert } from "../Utils/DisplayMessages";
import { isAxiosError } from "axios";
import Fire
import { getAuth, updateCurrentUser, updateEmail } from "@react-native-firebase/auth";

// Outside variables
const spaceAbove = 20;

const UpdateData = (props: NativeStackScreenProps<HomeDrawerParamList>) => {
    // Inner variables
    const screenAlert = useScreenAlert();
    const {firebaseUid, setfirebaseUid} = useEventContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const {navigation} = props;
    const [user, setUser] = useState<SignUpUser>({
        email: '',
        password: '',
        financialGoal: '',
        riskProfile: '',
    });

    const inputFields: InputProps[] = [
        {
            title: 'Email',
            msg: 'Digite seu email',
            userInput: user.email,
            onChangeText: text => setUser(updateUserProp('email', text)),
            spaceAbove: spaceAbove,
        },
        {
            title: 'Senha',
            msg: 'Digite sua senha',
            userInput: user.password,
            onChangeText: text => setUser(updateUserProp('password', text)),
            spaceAbove: spaceAbove,
        },
        {
            title: 'Objetivo Financeiro',
            msg: 'Digite seu objetivo',
            userInput: user.financialGoal,
            onChangeText: text => setUser(updateUserProp('financialGoal', text)),
            spaceAbove: spaceAbove,
        },
    ];

    // Inner functions
    const navigateToChat = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Chat'}],
        });
    };


    const updateUserData = async () => {
        setIsUpdating(true);
        try {
            const currentUser = getAuth().currentUser;

            await updateEmail(currentUser, "");
            const requestBody: RegisteredUser = {
                firebaseUid: firebaseUid,
                financialGoal: user.financialGoal,
                riskProfile: user.riskProfile,
            };

            const {data} = await WealthPilotApi.patch<string>('/patch', {
                timeout: 500000,
                Request: requestBody,
            });
            screenAlert('Success', data);
            navigateToChat();
        }
        catch(error) {
            if(isAxiosError(error) && error.response) {
                screenAlert('Error', error.response.data);
            }
            else {
                screenAlert('Error', 'Unexpected error. Please, try again later');
            }
        }
        setIsUpdating(false);
    };

    return (
        <Form
            backButtonNavigation={navigateToChat}
            title="Atualize suas Informações"
            fields={inputFields}
            formButtonProps={{buttonTitle: isUpdating ? 'Atualizando' : 'Atualizar', onPressFunction: updateUserData}}
            user={user}
            onPickerValueChange={(itemValue: 'conservative' | 'aggressive' | '') => setUser(updateUserProp('riskProfile', itemValue))}
        />
    );
};

export default UpdateData;
