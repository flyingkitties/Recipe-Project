import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { recipeId, number } = req.query;

    if (!recipeId) {
      res.status(500).send('Must include a recipeId');
    }

    let { data } = await axios({
      method: 'GET',
      url: `https://api.spoonacular.com/recipes/${recipeId}/similar`,
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
      params: {
        number: number || 5,
      },
    });

    let updatedRecipes = [];

    for (let index = 0; index < data.length; index++) {
      const recipe = data[index];
      if (!recipe.id) {
        throw new Error('No id');
      }

      let response = await axios({
        method: 'GET',
        url: `https://api.spoonacular.com/recipes/${recipe.id}/information`,
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
        params: {
          includeNutrition: 'true',
          // addRecipeInformation: true,
        },
      });

      updatedRecipes.push(response.data);
    }
    res.status(200).json(updatedRecipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Oops an error has occurred!', error: error });
    // if (error.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //   res.status(500).json({ message: 'Oops an error has occurred!', error });
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //   // http.ClientRequest in node.js
    //   console.log(error.request);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   console.log('Error', error.message);
    // }
    // console.log(error.config);
  }
}
