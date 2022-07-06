import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { NavigationContainer } from '@react-navigation/native';
import { CityDetail } from './CityDetail';
import { View, StyleSheet, Button } from 'react-native';

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
        <PublicRoutesStack.Screen
          name="CityDetail"
          component={CityDetail}
          options={{
            headerStyle: {
              backgroundColor: '#4A56E2',
            },
            headerTintColor: '#fff',
            headerTitle: 'City Detail',
            headerTitleStyle: {
              fontWeight: '700',
            },
          }}
        />
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

const styles = StyleSheet.create({
  logoutBtn: {
    marginRight: 5,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
});
