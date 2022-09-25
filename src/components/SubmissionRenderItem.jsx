import { Text, View, StyleSheet } from 'react-native';
import { useStateValue } from '../state';

export default function SubmissionRenderItem({ item }) {
  const [{ taxSeasons }] = useStateValue();
  return (
    <View style={styles.submissionContainer}>
      <Text style={styles.submissionTitle}>Submission {item.id}</Text>
      <Text style={styles.submissionField}>
        Year: {taxSeasons.find(({ id }) => id === item.taxId).year}
      </Text>
      <Text style={styles.submissionField}>Name: {item.name}</Text>
      <Text style={styles.submissionField}>Surname: {item.surname}</Text>
      <Text style={styles.submissionField}>Age: {item.age}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  submissionContainer: {
    padding: 10,
  },
  submissionTitle: {
    fontSize: 20,
  },
  submissionField: {
    fontSize: 16,
    marginLeft: 10,
  },
});
