import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Suspense, use } from 'react';
import * as SQLite from 'expo-sqlite';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';


async function loadDatabase() {
    const name = 'activities.db';
    const dbPath = `${FileSystem.documentDirectory}SQLite/${name}`;
    const fileinfo = await FileSystem.getInfoAsync(dbPath);
    if (!fileinfo.exists) {
        // If the database file does not exist, copy it from the assets folder
        const dbAsset = require('@/assets/' + name)
        const dbUri = Asset.fromModule(dbAsset).uri;
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`,
            { intermediates: true }
        );
        console.log('Copying database from assets to', dbPath);

        await FileSystem.downloadAsync(dbUri, dbPath);
 
        console.log('Database copied successfully');
    
    }
}

function useDB(){
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        loadDatabase().then(() => setLoaded(true))
}, [])

return { loaded };
}

function DatabaseProvider({ children }: { children: React.ReactNode }) {
    const { loaded } = useDB();

    if (!loaded) {
        return null; // or a loading spinner
    }

    return (
        <Suspense fallback={<View><Text>Loading</Text></View>}>
        <SQLite.SQLiteProvider useSuspense databaseName='activities.db'> {children} </SQLite.SQLiteProvider>
        </Suspense>
    );
}

export default DatabaseProvider;
