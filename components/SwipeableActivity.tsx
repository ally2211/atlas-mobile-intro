import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type Activity = {
  id: number;
  steps: number;
  date: number;
};

type SwipeableActivityProps = {
  activity: Activity;
  onDelete: (id: number) => void;
};

export default function SwipeableActivity({ activity, onDelete }: SwipeableActivityProps) {
  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this activity?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive', 
        onPress: () => onDelete(activity.id)
      },
    ]);
  };

  const renderRightActions = () => {
    return (
      <View style={styles.swipeableContainer}>
        <Pressable
          style={styles.swipeableDeleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.swipeableDeleteText}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  const renderLeftActions = () => {
    return (
      <View style={styles.swipeableContainer}>
        <Pressable
          style={styles.swipeableDeleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.swipeableDeleteText}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      rightThreshold={40}
      leftThreshold={40}
    >
      <View style={styles.activityItem}>
        <View style={styles.itemContent}>
          <Text style={styles.dateText}>
            {new Date(activity.date * 1000).toLocaleString()}
          </Text>
          <Text style={styles.stepsText}>Steps: {activity.steps}</Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
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
  swipeableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#f8f8f8',
    width: 90,
  },
  swipeableDeleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  swipeableDeleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
}); 