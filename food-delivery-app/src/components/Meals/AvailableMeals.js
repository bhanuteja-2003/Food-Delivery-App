import { useState, useEffect } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

function AvailableMeals(props) {

	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch('http://localhost:3001/foodItems');
			
			if(!response.ok) {
				throw new Error("Something went wrong!");
			}

			const responseData  = await response.json();

			const loadedMeals = [];

			for(const key in responseData) {
				loadedMeals.push({
					id : key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price
				});
			}

			setIsLoading(false);
			setMeals(loadedMeals);
		}

		fetchMeals().catch(error => {
			setIsLoading(false);
			setHttpError(error.message);
		});
		
  	}, []);

	if(isLoading) {
		return <section className= {classes.MealsLoading}>
			<p>Loading..</p>
		</section>
	}

	if(httpError) {
		return <section className={classes.MealsError}>
			<p>{httpError}</p>
		</section>
	}
    
    const mealsList = meals.map(meal => (
        <MealItem 
            id= {meal.id}
            key= {meal.id} 
            name= {meal.name} 
            description= {meal.description} 
            price= {meal.price}
        />
    ));

    return <section className= {classes.meals} style={{marginLeft:"20%"}}>
        <Card >
            <ul>
                {mealsList}
            </ul>
        </Card>
        
    </section>
}

export default AvailableMeals;