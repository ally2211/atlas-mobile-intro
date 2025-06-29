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
            console.log("Activities loaded:", data);
        }

    function insertActivity(steps: number) {
        console.log("Inserting activity with steps:", steps);
    return db.runAsync(
        "INSERT INTO activities (steps) VALUES (?)",
        [steps]
    );
    }

    useEffect(() => {
        loadActivities();
    }, []);

    return {
        getActivities, 
        activities,
        loadActivities,
        insertActivity
    };
}