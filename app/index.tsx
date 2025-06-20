import { View, Alert, Text, Pressable, StyleSheet } from 'react-native';
import { useActivities }  from '../hooks/useActivities';
import { useRouter } from 'expo-router';
import React from 'react';
import { Link, router } from "expo-router";

export default function HomePage() {
  const {activities} = useActivities();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JSON.stringify(activities)</Text>
      <Link href="/add-activity-screen" replace style={styles.button}>
        <Text style={styles.buttonText}>Go to Add Activity</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
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
