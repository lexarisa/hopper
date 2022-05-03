import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CityDashboard from '../components/CityDashboard';


export const Home = ({navigation}) => {

  return (
    <View style={styles.app}>
      <Header navigation={navigation}/>
      <CityDashboard navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    flex: 1,
  }
});
