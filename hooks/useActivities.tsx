import { useSQLiteContext } from "expo-sqlite";
import { useState, useEffect } from "react";
 
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type Activity = {
    id: number;
    steps: number;
    date: number;
};

export function useActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);

    const db = useSQLiteContext();

    function getActivities() {
        console.log("Fetching activities from database");

        return db.getAllAsync<Activity>("SELECT * FROM activities ORDER BY date DESC");
    }
    
    async function loadActivities(){
        console.log("Loading activities from database");
            const data = await getActivities();
            setActivities(data);
            // console.log("Activities loaded:", data);
        }

    function insertActivity(steps: number) {
        console.log("Inserting activity with steps:", steps);
    return db.runAsync(
        "INSERT INTO activities (steps) VALUES (?)",
        [steps]
    );
    }

    async function deleteAllActivities() {
        console.log("Deleting all activities from database");
        try {
            await db.runAsync("DELETE FROM activities");
            console.log("All activities deleted successfully");
            await loadActivities(); // Reload the activities list
        } catch (error) {
            console.error("❌ Error deleting activities:", error);
            throw error;
        }
    }

    async function deleteActivity(id: number) {
        console.log("Deleting activity with id:", id);
        try {
            await db.runAsync("DELETE FROM activities WHERE id = ?", [id]);
            console.log("Activity deleted successfully");
            await loadActivities(); // Reload the activities list
        } catch (error) {
            console.error("❌ Error deleting activity:", error);
            throw error;
        }
    }

    useEffect(() => {
        loadActivities();
    }, []);

    return {
        getActivities, 
        activities,
        loadActivities,
        insertActivity,
        deleteAllActivities,
        deleteActivity
    };
}