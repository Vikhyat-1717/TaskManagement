import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { Task } from '../types/task';

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
  const taskData = {
    ...task,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const docRef = await addDoc(collection(db, 'tasks'), taskData);
  return { ...taskData, id: docRef.id };
};

export const updateTask = async (task: Task) => {
  const taskRef = doc(db, 'tasks', task.id);
  await updateDoc(taskRef, {
    ...task,
    updatedAt: new Date().toISOString(),
  });
};

export const deleteTask = async (taskId: string) => {
  await deleteDoc(doc(db, 'tasks', taskId));
};

export const subscribeToTasks = (
  projectId: string,
  callback: (tasks: Task[]) => void
) => {
  const q = query(
    collection(db, 'tasks'),
    where('projectId', '==', projectId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
    callback(tasks);
  });
}; 