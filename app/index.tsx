import { View, Alert, Text, Pressable, StyleSheet } from 'react-native';
import { useActivities }  from '../hooks/useActivities';
import { useRouter } from 'expo-router';
import React from 'react';
import { Link, router } from "expo-router";
import { FlatList } from 'react-native';


export default function HomePage() {
  const {activities} = useActivities();
  const router = useRouter();
console.log('Activities:', activities);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities:</Text>

      {activities.length === 0 ? (
        <Text>No activities found.</Text>
      ) : (  
      <FlatList
        data={activities}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text style={styles.stepsText}>Steps: {item.steps}</Text>
            <Text style={styles.dateText}>Date: {new Date(item.date * 1000).toLocaleDateString()}</Text>
          </View>
        )}
        style={styles.list}
      />
      )}

          <Link href="/add-activity-screen" replace style={styles.button}>
            <Text style={styles.buttonText}>Go to Add Activity</Text>
          </Link>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  activityItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  stepsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
