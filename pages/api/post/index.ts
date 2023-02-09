// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { allPostsQuery } from '../../../utils/queries'

type Data = {
    name: string
}

// req, res -> after the colon we specify the parameter types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // get all posted videos from the allPostsQuery query located on utils/queries
    if (req.method === 'GET') {
        const query = allPostsQuery()

        // client request on utils/client.ts. Client needs to be configured beforehand
        const data = await client.fetch(query)

        // gets the response and formats as json
        res.status(200).json(data)

    } else if(req.method === 'POST') {
        const document = req.body
        client.create(document)
            .then(() => res.status(201).json('video created'))
    }
}
