// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'

type Data = {
    name: string
}

// req, res -> after the colon we specify the parameter types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
       
        const user = req.body
        // create a new user in sanity database
        client.createIfNotExists(user)
            .then(() => res.status(200).json('Login success'))

    }
}