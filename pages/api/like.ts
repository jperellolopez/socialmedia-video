
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { uuid } from 'uuidv4'

type Data = {
    name: string
}

// req, res -> after the colon we specify the parameter types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
       
        const {userId, postId, like} = req.body 

        // if a post is liked, inserts a new object of 'like' type at the end of an array named 'likes'. If is disliked, checks the likes given by a certain user id and removes it (unset) from the likes array.
        const data = 
        like ? 
           await client.patch(postId).setIfMissing({likes: []}).insert('after', 'likes[-1]', [{_key: uuid(), _ref: userId}]).commit() 
        : await client.patch(postId).unset([`likes[_ref=="${userId}"]`]).commit()

        res.status(200).json(data)
    }
}