import { Text, View, StyleSheet } from "react-native";
import { Bar } from "react-native-progress";

export default function CityLifeQualityInfo({qualityOfLife}) {
  return (
    <View style={styles.barCharts}>
      <View style={styles.bar}>
        <Text style={styles.index}>Crime</Text>
        <Bar
          unfilledColor="#eceefc"
          height={20}
          color="#4A56E2"
          borderRadius={8}
          progress={Math.round((qualityOfLife.crimeIndex / 120) * 100) / 100}
          width={330}
        />
      </View>
      <View style={styles.bar}>
        <Text style={styles.index}>Quality of Life</Text>
        <Bar
          unfilledColor="#eceefc"
          height={20}
          color="#4A56E2"
          borderRadius={8}
          progress={Math.round(qualityOfLife.qualityOfLife) / 240}
          width={330}
        />
      </View>
      <View style={styles.bar}>
        <Text style={styles.index}>Rent</Text>
        <Bar
          unfilledColor="#eceefc"
          height={20}
          color="#4A56E2"
          borderRadius={8}
          progress={Math.round((qualityOfLife.rentIndex / 100) * 100) / 100}
          width={330}
        />
      </View>
      <View style={styles.bar}>
        <Text style={styles.index}>Safety</Text>
        <Bar
          unfilledColor="#eceefc"
          height={20}
          color="#4A56E2"
          borderRadius={8}
          progress={Math.round(qualityOfLife.safetyIndex) / 100}
          width={330}
        />
      </View>
      <View style={styles.bar}>
        <Text style={styles.index}>Restaurant Price</Text>
        <Bar
          unfilledColor="#eceefc"
          progress={Math.round((qualityOfLife.restaurantPriceIndex / 170) * 100) / 100}
          color="#4A56E2"
          borderRadius={8}
          height={20}
          width={330}
        />
      </View>
      <View style={styles.bar}>
        <Text style={styles.index}>Traffic</Text>
        <Bar
          unfilledColor="#eceefc"
          color="#4A56E2"
          height={20}
          borderRadius={8}
          progress={Math.round((qualityOfLife.trafficIndex / 350) * 100) / 100}
          width={330}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  barCharts: {
    alignItems: 'center',
  },
  bar: {
    marginBottom: 7,
  },
  index: {
    fontSize: 17,
    marginBottom: 10,
  },
})