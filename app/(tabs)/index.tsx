import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button } from "react-native-paper";

export default function Index() {
  const {signOut, user} = useAuth();
  const [habits, setHabits] = useState<Habit[]>();

  useEffect(() =>{
    if(user){
      fetchHabits();
    }
  },[user]);

  const fetchHabits = async () =>{
    try {
      const res = await database.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal("user_id", user?.$id || "")]
      )
      setHabits(res.documents as unknown as Habit[]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx</Text>
      <Button mode="contained" onPress={signOut}>Sign Out</Button>
    </View>
  );
}
