import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TaskManager from 'expo-task-manager';

const ASYNC_STORAGE_TASK_ID = 'ASYNC_STORAGE_TASK';

TaskManager.defineTask(ASYNC_STORAGE_TASK_ID, async ({ data }) => {
  try {
    if(data && data.key && data.value){
        await AsyncStorage.setItem(data.key, data.value);
    }
  } catch (error) {
    console.error('Background AsyncStorage operation failed:', error);
  }
});

const saveData = async (key, value) => {
  try {
    // Schedule the task
    const taskResult = await TaskManager.scheduleTaskAsync(ASYNC_STORAGE_TASK_ID, {
      data: {key, value},
    });
    console.log('Task scheduled:', taskResult);
  } catch (error) {
    console.error('Error scheduling task:', error);
  }
};

// Example usage
saveData('@my_key', 'my_value');

// ... other app code