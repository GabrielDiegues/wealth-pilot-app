import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../Types/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const Logout = (props: DrawerContentComponentProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();


    const handleLogout = () => {
        return navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        });
    };


    return(
        <DrawerContentScrollView>
            <DrawerItemList {...props}/>
            <DrawerItem label="logout" onPress={handleLogout} />
        </DrawerContentScrollView>
    );
};

export default Logout;
