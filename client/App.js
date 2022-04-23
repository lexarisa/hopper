import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './src/screens/Home';
import { Profile } from './src/screens/Profile';
import { CityDetail } from './src/components/CityDetail';
import { Messages } from './src/components/Messages';
import { Login } from './src/screens/Login';
import { UserProvider } from './src/context/UserContext';
import { Register } from './src/screens/Register';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <UserProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Explore"
              component={HomeStackScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
              // screenOptions={({ route }) => {
              //   let iconName;
              //   if (route.name === 'Home') {
              //     iconName = focused
              //       ? 'ios-information-circle'
              //       : 'ios-information-circle-outline';
              //   } else if (route.name === 'Settings') {
              //     iconName = focused ? 'ios-list-box' : 'ios-list';
              //   }

              //   return <Ionicons name={iconName} />;
              // }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </UserProvider>
    </>
  );
}

//connect to socket here

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="CityDetail" component={CityDetail} />
      <HomeStack.Screen
        name="Messages"
        component={Messages}
        options={({ route }) => ({ title: route.params.city })}
      />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
