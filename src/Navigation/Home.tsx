import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../Types/Navigation';
import Chat from '../Screens/Chat';
import Logout from '../Components/Logout';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const Home = () => {
    return (
        <Drawer.Navigator drawerContent={Logout}>
            <Drawer.Screen name="Chat" component={Chat}/>
        </Drawer.Navigator>
    );
};

export default Home;
