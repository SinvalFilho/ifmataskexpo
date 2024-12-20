import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import useAuth from "../hooks/useAuth";

type Task = {
    id: number;
    title: string;
    description: string;
    done: boolean;
};

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { token } = useAuth();

    async function getTasks() {
        try {
            const response = await axios.get("http://localhost:3333/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <View>
            <FlatList
                data={tasks}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}
            />
        </View>
    );
};

export default Tasks;
