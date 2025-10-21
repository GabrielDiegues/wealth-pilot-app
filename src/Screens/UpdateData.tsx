import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Form from '../Components/Form';
import { HomeDrawerParamList } from '../Types/Navigation';
import { useEventContext } from '../Navigation/Context/EventContext';
import { RegisteredUser, SignUpUser } from '../Types/Index';
import { useState } from 'react';
import { InputProps } from '../Types/ComponentsProperties';
import { catchApiErrors, updateUserProp } from '../Utils/UserUtil';
import { WealthPilotApi } from '../api';
import { useScreenAlert } from '../Utils/DisplayMessages';

// Outside variables
const spaceAbove = 20;

const UpdateData = (props: NativeStackScreenProps<HomeDrawerParamList>) => {
    // Inner variables
    const screenAlert = useScreenAlert();
    const {firebaseUid} = useEventContext();
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
            // const currentUser = getAuth().currentUser;

            // if(currentUser) {
            //     const credential = EmailAuthProvider.credential(currentUser.email!, user.password);
            //     await reauthenticateWithCredential(currentUser, credential);
            //     user.password && await currentUser.updatePassword(user.password);
            //     user.email && await currentUser.updateEmail(user.email);
                const requestBody: RegisteredUser = {
                    firebaseUid: firebaseUid,
                    financialGoal: user.financialGoal,
                    riskProfile: user.riskProfile,
                };

                const {data} = await WealthPilotApi.patch<string>('/patch', requestBody, {
                    timeout: 500000,
                });
                screenAlert('Success', data);
                navigateToChat();
        }
        catch(error) {
            catchApiErrors(error, screenAlert);
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
