import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../Types/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WealthPilotApi } from '../api';
import { useEventContext } from '../Navigation/Context/EventContext';
import { getAuth } from '@react-native-firebase/auth';


const Logout = (props: DrawerContentComponentProps) => {
    // Inner variables
    const {firebaseUid} = useEventContext();
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    // Inner functions
    const handleLogout = () => {
        return navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        });
    };


    const deleteUser = async () => {
        const currentUser = getAuth().currentUser;
        if(currentUser) {
            await currentUser.delete().
            then(async () => {
                await WealthPilotApi.delete(`/users/delete/${firebaseUid}`, {
                    timeout: 500000,
                });
            }).finally(() => handleLogout());
        }
    };


    return(
        <DrawerContentScrollView>
            <DrawerItemList {...props}/>
            <DrawerItem label="deletar conta" onPress={deleteUser}/>
            <DrawerItem label="logout" onPress={handleLogout} />
        </DrawerContentScrollView>
    );
};

export default Logout;
