/* eslint-disable camelcase */
// import { Comment } from '@prisma/client';
// import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../utils/db';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { username, post_id, text } = req.body.data;

      const createComment = await prisma.comment.create({
        data: {
          post: {
            connect: {
              id: post_id,
            },
          },
          username,
          text,
        },
      });

      return res.json(createComment);
    }
    if (req.method === 'GET') {
      const { post_id } = req.query;

      if (!post_id) return res.status(500).send('Missing Post Id in Comments');
      const getComments = await prisma.comment.findMany({
        where: {
          post_id,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      return res.status(200).send(getComments);
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
