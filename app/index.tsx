import { View, Alert, Text, Pressable, StyleSheet } from 'react-native';
import { useActivitiesContext }  from '../components/ActivitiesProvider';
import { useRouter } from 'expo-router';
import React from 'react';
import { Link, router } from "expo-router";
// import { FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import SwipeableActivity from '@/components/SwipeableActivity';

export default function HomePage() {
  const {activities, deleteAllActivities, deleteActivity} = useActivitiesContext();
  const router = useRouter();
// console.log('Activities:', activities);

  // Delete handler for individual activities
  const handleDelete = (id: number) => {
    Alert.alert('Delete', 'Are you sure you want to delete this activity?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: async () => {
          try {
            await deleteActivity(id);
            Alert.alert('Success', 'Activity deleted successfully!');
          } catch (error) {
            console.error("❌ Error deleting activity:", error);
            Alert.alert('Error', 'Failed to delete activity!');
          }
        }
      },
    ]);
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      'Delete All Activities',
      'Are you sure you want to delete all activities? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete All', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await deleteAllActivities();
              Alert.alert('Success', 'All activities deleted successfully!');
            } catch (error) {
              console.error("❌ Error deleting activities:", error);
              Alert.alert('Error', 'Failed to delete activities!');
            }
          }
        },
      ]
    );
  };

  const renderActivityItem = ({ item }: { item: any }) => (
    <SwipeableActivity 
      activity={item} 
      onDelete={handleDelete} 
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities:</Text>

      {activities.length === 0 ? (
        <Text>No activities found.</Text>
      ) : (  
        <View style={styles.list}>
          <FlashList
            data={activities}
            renderItem={renderActivityItem}
            estimatedItemSize={100}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}

          <Link href="/add-activity-screen" replace style={styles.button}>
            <Text style={styles.buttonText}>Go to Add Activity</Text>
          </Link>

          <Pressable onPress={handleDeleteAll} style={styles.deleteAllButton}>
            <Text style={styles.buttonText}>Delete All Activities</Text>
          </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FEF9E6',
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    // borderLeftWidth: 4,
    // borderLeftColor: '#007AFF',
    justifyContent: 'space-between',
  },
  itemContent: {
    flex: 1,
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
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1ED2AF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteAllButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
