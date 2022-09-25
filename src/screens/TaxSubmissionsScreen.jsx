import { FlatList, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useStateValue } from '../state';
import ItemSeparator from '../components/ItemSeparator';
import SubmissionRenderItem from '../components/SubmissionRenderItem';
import SearchFilter from '../components/SearchFilter';

function TaxSubmissionsScreen() {
  const [filterType, setFilterType] = useState('name');
  const [searchFilter, setSearchFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [{ submissions, taxSeasons }] = useStateValue();

  const submissionsByYear =
    yearFilter === 'all'
      ? submissions
      : submissions.filter((s) => {
          const submissionYear = taxSeasons.find((t) => t.id === s.taxId);
          return submissionYear.year === yearFilter;
        });

  const submissionsToShow =
    searchFilter === ''
      ? submissionsByYear
      : submissionsByYear.filter((s) =>
          s[filterType].toLowerCase().includes(searchFilter.toLowerCase()),
        );

  return (
    <View style={styles.container}>
      <SearchFilter
        filterType={filterType}
        setFilterType={setFilterType}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
      />
      <FlatList
        data={submissionsToShow}
        renderItem={({ item }) => <SubmissionRenderItem item={item} />}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default TaxSubmissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
