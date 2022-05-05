import { Text, View, FlatList, StyleSheet } from 'react-native';
import { CustomCard } from '../components/CustomCard';


export default function CityPriceInfo({ cityPrices }) {

  const averageSalary = function () {
    if (cityPrices) {
      const salary = cityPrices.filter((category) => category.id === 105);
      return salary[0];
    }
  };

  return (
    <View>
      <Text style={styles.header}>Average Monthly Salary</Text>
      <View style={styles.salaryCard}>
        {cityPrices && (
          <CustomCard
            colorHex="#4A56E2"
            fontColor="#FFF"
            descriptionColor="#EFF1F3"
            description="USD"
            width="90%"
            price={Math.round(averageSalary().itemPrice)}
          />
        )}
      </View>

      <Text style={styles.header}>Cost of Living</Text>
      {cityPrices && (
        <FlatList
          horizontal={true}
          data={cityPrices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.container}>
              <CustomCard
                colorHex="#FFF"
                fontColor="#1C2126"
                descriptionColor="#727981"
                width={200}
                description={item.item}
                price={Math.round(item.itemPrice)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'column',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  salaryCard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
})