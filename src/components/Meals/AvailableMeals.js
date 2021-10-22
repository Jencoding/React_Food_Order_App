import React from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  // Fetch data from firebase
  useEffect(() => {
    const fetchMeals = async () => { 
      const response = await fetch('https://food-app-57b63-default-rtdb.firebaseio.com/meals.json');

    if (!response.ok) {
      throw new Error('Something went wrong!')
    };

    const responseData = await response.json();

    const loadedMeals = [];

    for (const key in responseData) {
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price,
      })
    };
    setMeals(loadedMeals);
    setIsLoading(false);
  };


  fetchMeals().catch(err => {
    setIsLoading(false);
    setHttpError(err.message);
  });


  }, []);


  // Loading message
  if (isLoading) {
      return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
      )
  };

  // Fail-to-load message
  if (httpError) {
      return (
      <section className={classes.error}>
        <p>Fail to obtain the information</p>
      </section>
      )
  };

    const mealsList = meals.map(meals => <MealItem id={meals.id} key={meals.id} name={meals.name} description={meals.description} price={meals.price}/>);

    return <section className={classes.meals}>
    <Card>
    <ul>
      {mealsList}
    </ul>
    </Card>
    </section>
}

export default AvailableMeals