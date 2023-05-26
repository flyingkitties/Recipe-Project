//Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from '@/utils/db';

export default async function handler(req, res) {
  try {
    const newPost = await prisma.post.create({
      data: {
        external_id: '123456789',
        ingredients: 'tomatoes , carrots',
        username: 'something@gmail.com',
        title: 'salad ala ',
        image: 'image.com',
        instructions: 'cut and serve',
      },
    });

    console.log(newPost);

    return res.status(200).send(newPost);
  } catch (error) {
    console.log(error);
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
    res.status(500).json({ message: 'Oops an error has occurred!', error });
    console.log(error.config);
  }
}
