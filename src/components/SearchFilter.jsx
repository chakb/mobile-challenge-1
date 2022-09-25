import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStateValue } from '../state';

export default function SearchFilter({
  filterType,
  setFilterType,
  searchFilter,
  setSearchFilter,
  yearFilter,
  setYearFilter,
}) {
  const [{ taxSeasons }] = useStateValue();

  return (
    <View style={styles.filtersContainer}>
      <View style={styles.textFilterContainer}>
        <Picker
          style={styles.textPicker}
          selectedValue={filterType}
          onValueChange={(itemValue) => setFilterType(itemValue)}
        >
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Surname" value="surname" />
          <Picker.Item label="Age" value="age" />
        </Picker>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchFilter}
          onChangeText={(text) => setSearchFilter(text)}
        />
      </View>
      <View style={styles.textFilterContainer}>
        <Text style={styles.yearText}>Tax year:</Text>
        <Picker
          style={styles.yearPicker}
          selectedValue={yearFilter}
          onValueChange={(itemValue) => setYearFilter(itemValue)}
        >
          <Picker.Item label="All" value="all" />
          {taxSeasons.map(({ year, id }) => (
            <Picker.Item label={year} value={year} key={id} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: 'lightgray',
  },
  textFilterContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 10,
  },
  textPicker: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    flex: 2,
  },
  yearText: {
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  yearPicker: {
    flex: 2,
  },
});
