import axios from 'axios';
import jwt_decode from 'jwt-decode'

// uses the url provided in the env file so we only need to change it there when project is deployed
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// create a function to generate an user if there's not one yet or fetch it if it there's already one. Create the function and use it from Navbar component.
export const createOrGetUser = async (response: any, addUser: any) => {
  // decode the response token so we can get an object with properties as the email, user picture or the user name. Atfer the variable we specify the types of the properties we want to get
  const decoded: {name: string, picture: string, sub: string} = jwt_decode(response.credential)

  // destructure the properties of the object
  const {name, picture, sub} = decoded

  // create an user object
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }

  addUser(user)

  // post request with the user data. Create an auth.ts file inside pages/api
  await axios.post(`${BASE_URL}/api/auth`, user)
};  