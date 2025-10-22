import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../Types/Navigation';
import Chat from '../Screens/Chat';
import Logout from '../Components/Logout';
import UpdateData from '../Screens/UpdateData';
import UserProfile from '../Screens/UserProfile';

// Outter variables
const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const Home = () => {


    return (
        <Drawer.Navigator drawerContent={Logout}>
            <Drawer.Screen name="Chat" component={Chat}/>
            <Drawer.Screen
                name="UpdateData"
                component={UpdateData}
                options={{
                    headerShown: false,
                    title: 'Atualizar Informações',
                }}
            />
            <Drawer.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                    title: 'Seu Perfil',
                }}
            />
        </Drawer.Navigator>
    );
};

export default Home;
