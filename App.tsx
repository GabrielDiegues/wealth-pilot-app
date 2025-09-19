import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './src/Screens/Login';
import { AppStackParamList } from './src/Types/Navigation';
import LoginHeader from './src/Components/HeaderStyles/LoginHeader';
import Home from './src/Navigation/Home';
import SignUp from './src/Screens/SignUp';
import { EventProvider } from './src/Navigation/Context/EventContext';

//const renderLoginHeader = () => <LoginHeader />;

const Stack = createNativeStackNavigator<AppStackParamList>();
function App(): React.JSX.Element {
  return (
    <EventProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              header: LoginHeader,
            }}
            />

            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: false,
              }}
            />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EventProvider>
  );
}

export default App;
