import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../Types/Navigation';
import Chat from '../Screens/Chat';
import Logout from '../Components/Logout';
import UpdateData from '../Screens/UpdateData';

// Outter variables
const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const Home = () => {


    return (
        <Drawer.Navigator drawerContent={Logout}>
            <Drawer.Screen name="Chat" component={Chat}/>
            <Drawer.Screen name="UpdateData" component={UpdateData}/>
        </Drawer.Navigator>
    );
};

export default Home;
