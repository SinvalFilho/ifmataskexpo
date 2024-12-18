import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Tasks = () => {
    const [tasks, satTasks] = useState([])
    const { token } = useAuth()
    async function getTasks() {
        const response = await axios.get('http://localhost:3333/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    useEffect(() => {
        getTasks()
    },) 
    return(
        <View>
            <Text>Tasks</Text>
            {tasks.map(task => (
                <Text key={task.id}>{task.title}</Text>
            ))}
        </View>
    );
}

export default Tasks;