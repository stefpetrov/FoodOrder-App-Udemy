
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        fetch('https://react-practice-a92c2-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
            .then(response => {

                if (!response.ok) {
                    throw new Error('Something went wrong!')
                }
                return response.json()
            })
            .then(data => {
                const loadedMeals = []
                for (const key in data) {
                    loadedMeals.push({
                        id: key,
                        ...data[key]
                    })
                }
                setMeals(loadedMeals)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                setError(error.message)
            })
    }, [])

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }
    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>

        )
    }

    const mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)


    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )

}

export default AvailableMeals