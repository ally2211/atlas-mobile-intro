import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function AddActivityScreen()  {
    return (
      <View>
        <Text> AddActivityScreen </Text>
              <Link href="/" style={styles.button}>
                <Text style={styles.buttonText}>Back to HomeScreen</Text>
              </Link>
      </View>
    );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});