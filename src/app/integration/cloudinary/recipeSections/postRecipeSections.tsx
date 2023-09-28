import { RecipeSection } from "@/app/types";

export default async function PostRecipeSections(data: RecipeSection[], recipeId: string){
    const recipeSections: RecipeSection[] = []

    data.forEach(e => {
        recipeSections.push({
            recipeId: recipeId,
            title: e.title,
            richText: e.richText,
            order: 0
        })
    });

    let response = await fetch(`http://localhost:3004/recipeSections/`,
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(recipeSections)
                        }
    )

    let body = await response.json()          
    return await body
}