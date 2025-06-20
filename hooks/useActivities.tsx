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
        return db.getAllAsync<Activity>("SELECT * FROM activities");
    }
    useEffect(() => {
        async function load(){
            const data = await getActivities();
            setActivities(data);
        }
    }, []);
    return {
        getActivities, 
        activities
    };
}