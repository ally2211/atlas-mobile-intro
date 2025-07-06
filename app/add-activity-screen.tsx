import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useActivitiesContext } from '@/components/ActivitiesProvider';
import { useState, useEffect } from 'react';
import { Pressable } from 'react-native';


export default function AddActivityScreen()  {
    const [steps, setSteps] = useState<number>();
    const [date, setDate] = useState(new Date().toISOString());
    const router = useRouter();
    const { insertActivity, loadActivities } = useActivitiesContext();

  const handleSubmit = async () => {
    if (!steps) {
      alert('Please enter steps');
      return;
    }
    
    try {
    console.log("Submitting new activity:", steps);
    await insertActivity(steps);
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
      <Text style={styles.label}>Add Activity</Text>
      <TextInput
        style={styles.input}
        value={steps?.toString() || ''}
        onChangeText={(value) => setSteps(parseInt(value) || undefined)}
        placeholder="Enter steps"
        keyboardType="number-pad"
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
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#FEF9E6',
  },
  label: { 
    marginTop: 20, 
    // fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: '700',
    textAlign: 'center',
    // lineHeight: 10, // 100% of font-size (10px)
    // letterSpacing: 0,
    // width: 61,
    // height: 12,
    opacity: 1,
    color: 'black',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
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