import { View, StyleSheet } from 'react-native';

export default function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: 'lightgray',
  },
});
