import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Messages } from './Messages';
import { Profile } from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { CityDetail } from './CityDetail';
import { Home } from './Home';

const ProtectedRoutesStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const ProtectedRoutes = () => {
  return (
    <ProtectedRoutesStack.Navigator>
      <ProtectedRoutesStack.Screen name="Home" component={Home} />
      <ProtectedRoutesStack.Screen name="CityDetail" component={CityDetail} />
      <ProtectedRoutesStack.Screen name="Messages" component={Messages} />
      <ProtectedRoutesStack.Screen name="Profile" component={Profile} />
    </ProtectedRoutesStack.Navigator>
  );
};

export const HomeStackScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Explore"
          component={ProtectedRoutes}
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
  );
};
