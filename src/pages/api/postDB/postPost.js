/* eslint-disable camelcase */
import { prisma } from '../../../utils/db';
// import { Post } from '@prisma/client';
// import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const {
        external_id,
        username,
        title,
        image,
        method,
        sourceUrl,
        // types,
        // favourites,
      } = req.body.data;

      const ingredients = req.body.data.ingredients.map((ingredient) => ({
        id: ingredient.id,
        nameClean: ingredient.nameClean,
        original: ingredient.original,
        amount: ingredient.amount,
      }));

      const postExists = await prisma.post.findUnique({
        where: {
          external_id,
        },
        include: {
          comments: true,
          likes: true,
          // _count: {
          //   select: {
          //     likes: true,
          //   },
          // },
        },
      });
      // const likes = postExists.likes.filter((like) => like.liked === true);
      // const likesCount = likes.length;
      // postExists.count.likes = likesCount;

      // console.log('Post Exists in DB:', postExists);

      if (!postExists) {
        const createPost = await prisma.post.upsert({
          where: { external_id },
          update: {
            external_id,
            username: username || sourceUrl || 'None',
            title,
            image,
            ingredients,
            method: method || 'None',
            //   types,
            //   favourites,
          },
          create: {
            external_id,
            username: username || sourceUrl || 'None',
            title,
            image,
            ingredients,
            method: method || 'None',
          },
          include: {
            comments: true,
            likes: true,
            favourites: true,
            // _count: {
            //   select: {
            //     likes: {
            //       where: {
            //       liked: true,
            //       },
            //     },
            //   },
            // },
          },
        });
        // console.log('🚀 ~ createPost', createPost);

        // console.log('Creating new Post');
        return res.status(200).send(createPost);
      }
      return res.status(200).send(postExists);
    }
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
  return null;
}
