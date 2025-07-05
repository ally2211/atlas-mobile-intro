import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useActivities } from '@/hooks/useActivities';
import { useState, useEffect } from 'react';
import { Pressable } from 'react-native';


export default function AddActivityScreen()  {
    const [steps, setSteps] = useState('');
    const [date, setDate] = useState('');
    const router = useRouter();
    const { insertActivity, loadActivities } = useActivities();

  const handleSubmit = async () => {
    if (!steps) {
      alert('Please enter steps');
      return;
    }
    
    try {
    console.log("Submitting new activity:", steps);
    await insertActivity(parseInt(steps, 10));
    console.log("Insert succeeded, now loading activities");
    await loadActivities();
    router.replace('/');
  } catch (error) {
    console.error("❌ Error inserting activity:", error);
    alert("Insert failed!");
  }
  };

   return (
    <View style={styles.container}>
      <Text style={styles.label}>Steps</Text>
      <TextInput
        style={styles.input}
        value={steps}
        onChangeText={setSteps}
        placeholder="Enter number of steps"
        keyboardType="numeric"
      />

      {/* <Button title="Save Activity" onPress={ handleSubmit } /> */}

      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Add Activity</Text>
      </Pressable>

      <Link href="/" replace style={styles.redbutton}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Link>

    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 20, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5
  },
  button: {
    backgroundColor: '#1ED2AF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  redbutton: {
    backgroundColor: '#D00414',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});