import MealsItem from "./MealsItem";
import { useState, useEffect } from "react";
export default function Meals() {
    const [mealItems, setMealItems] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await fetch("http://localhost:3000/meals");
                const resData = await response.json();
                const meals = resData;
                setMealItems(meals);
            } catch (error) {}
        }
        fetchMeals();
    }, []);
    console.log(mealItems);
    return (
        <ul id="meals">
            {mealItems.map((item) => (
                <MealsItem key={item.id} {...item} />
            ))}
        </ul>
    );
}
