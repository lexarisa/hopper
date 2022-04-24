import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { NavigationContainer } from '@react-navigation/native';
import { CityDetail } from './CityDetail';

const PublicRoutesStack = createNativeStackNavigator();
export const PublicRoutes = () => {
  return (
    <NavigationContainer>
      <PublicRoutesStack.Navigator>
        <PublicRoutesStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <PublicRoutesStack.Screen name="CityDetail" component={CityDetail} />
        <PublicRoutesStack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <PublicRoutesStack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </PublicRoutesStack.Navigator>
    </NavigationContainer>
  );
};
