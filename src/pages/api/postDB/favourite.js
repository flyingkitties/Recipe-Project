/* eslint-disable camelcase */
import { prisma } from '../../../utils/db';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { username, post_id, favouriteSaved } = req.body.data;

      if (post_id) {
        const createFavourite = await prisma.favourite.upsert({
          where: {
            postAndUser: {
              post_id,
              username,
            },
          },
          create: {
            post_id,
            username,
            favouriteSaved,
          },
          update: {
            post_id,
            username,
            favouriteSaved,
          },
        });
        console.log('favourite added to DB', createFavourite);
        return res.json(createFavourite);
      }
    } else if (req.method === 'GET') {
      const { post_id, email } = req.query;
      //   if (!post_id) throw new Error('Missing post_id');
      //   if (!email) throw new Error('Missing email');
      // console.log('req.body.data::', req.query.post_id);
      // const post_id = req.body.data;
      // const created_at = req.body.data.created_at;
      if (post_id) {
        const getFavourite = await prisma.favourite.findMany({
          where: {
            post_id,
          },
          orderBy: {
            created_at: 'desc',
          },
        });

        const isFavourite = getFavourite.some(
          (favourite) => favourite.username === email,
        );
        // console.log('req. query log', req.query);
        // console.log('Getting list of likes', getLikes, isLiked);
        return res.status(200).send(!!isFavourite);
      }
    }
  } catch (error) {
    console.log('🚀 ~ Favourites Get error', error);

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
