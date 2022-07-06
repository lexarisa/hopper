import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Messages } from './Messages';
import { Profile } from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { CityDetail } from './CityDetail';
import { Home } from './Home';
import { AntDesign } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { View, Button, StyleSheet } from 'react-native';

const ProtectedRoutesStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStackScreen = createNativeStackNavigator();

export const ProtectedRoutes = () => {
  return (
    <ProtectedRoutesStack.Navigator>
      <ProtectedRoutesStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <ProtectedRoutesStack.Screen name="CityDetail" component={CityDetail} />
      <ProtectedRoutesStack.Screen name="Messages" component={Messages} />
      <ProtectedRoutesStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </ProtectedRoutesStack.Navigator>
  );
};

const ProfileStack = () => {
  const { logout } = useUser();
  return (
    <ProfileStackScreen.Navigator>
      <ProfileStackScreen.Screen
        name="ProfilePage"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: '#4A56E2',
          },
          headerTintColor: '#fff',
          headerTitle: 'Profile',
          headerTitleStyle: {
            fontWeight: '700',
          },
          headerRight: () => {
            return (
              <View style={[styles.logoutBtn]}>
                <Button onPress={() => logout()} title="Logout" color="none" />
              </View>
            );
          },
        }}
      />
      <ProfileStackScreen.Screen
        name="MessagesPage"
        component={Messages}
        options={({ route }) => ({ title: 'Chat Log' })}
      />
    </ProfileStackScreen.Navigator>
  );
};
export const HomeStackScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Explore"
          component={ProtectedRoutes}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    marginRight: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
});
