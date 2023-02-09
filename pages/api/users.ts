// Endpoint for the query to fetch all users, comes from authstore.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
// allUsersQuery contains the final query
import { allUsersQuery } from '../../utils/queries'

type Data = {
    name: string
}

// req, res -> after the colon we specify the parameter types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const data = await client.fetch(allUsersQuery())

        // if data exists
        if (data) {
            res.status(200).json(data)
        } else {
            res.json([])
        }

    }
}