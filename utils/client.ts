import sanityClient from '@sanity/client';

//Configure client: 1- get the project id from sanity manager. 2 - create new api token 3 - save it as an env variable 4- create a new cors origins pointing to localhost:3000
export const client = sanityClient({
  projectId: 'p9e0m0dg',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
