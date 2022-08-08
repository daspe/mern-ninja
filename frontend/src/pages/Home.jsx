import { useState, useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutEditForm from '../components/WorkoutEditForm';

const Home = () => {
  const { workouts, editedWorkout, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: data });
      }
    }

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      {editedWorkout && <WorkoutEditForm workout={editedWorkout} />}
      {!editedWorkout && <WorkoutForm />}
    </div>
  );
}

export default Home;