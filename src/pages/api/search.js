// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const options = {
    method: 'GET',
    url: 'https://api.spoonacular.com/recipes/random',
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    },
    params: {
      number: req.query.number,
      tags: req.query.tags,
      query: req.query.query,
      diet: req.query.diet,
      // addRecipeInformation: true,
    },
  };

  try {
    const response = await axios(options);

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(500).json({ message: 'Oops an error has occurred!', error });
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
}
