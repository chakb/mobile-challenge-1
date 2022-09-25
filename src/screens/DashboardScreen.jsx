import { View, Text, FlatList, StyleSheet, Share, Button } from 'react-native';
import { useEffect } from 'react';
import taxService from '../services/taxes';
import { useStateValue, initializeTaxSeasons, initializeSubmissions } from '../state';
import ItemSeparator from '../components/ItemSeparator';

function TaxSeasonRenderItem({ item, handleAddSubmission }) {
  return (
    <View style={styles.taxSeasonContainer}>
      <Text style={styles.taxSeasonName}>{item.name}</Text>
      <Button onPress={handleAddSubmission} title="Add" />
    </View>
  );
}

function DashboardScreen({ route, navigation }) {
  const { isTaxSeasonActive } = route.params;
  const [{ taxSeasons }, dispatch] = useStateValue();

  useEffect(() => {
    const initializeTaxData = async () => {
      try {
        const [taxSeasonList, submissionList] = await Promise.all([
          taxService.getSeasons(),
          taxService.getSubmissions(),
        ]);
        dispatch(initializeTaxSeasons(taxSeasonList));
        dispatch(initializeSubmissions(submissionList));
      } catch (e) {
        console.error(e);
      }
    };
    initializeTaxData();
  }, [dispatch]);

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Mobile challenge 1 | The coolest app, yay!',
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddSubmission = (id) => {
    navigation.navigate('TaxForm', { taxId: id });
  };

  return (
    <View>
      <Button onPress={onShare} title="Share" />
      <FlatList
        data={taxSeasons.filter((season) => season.active === isTaxSeasonActive)}
        renderItem={({ item }) => (
          <TaxSeasonRenderItem
            item={item}
            handleAddSubmission={() => handleAddSubmission(item.id)}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
      />
      <Button onPress={() => navigation.navigate('TaxSubmissions')} title="See all submissions" />
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  taxSeasonContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taxSeasonName: {
    fontSize: 22,
    marginLeft: 10,
  },
});
