import axios from 'axios';
import { useQuery } from 'react-query';

const userKeys = {
  // users: ['users'],
  // user: (id) => [...userKeys.users, id]
}

const config = {
  headers: {
    'X-CSRF': '1'
  }
}

const fetchUser = async () => 
  axios.get('/bff/user', config)
    .then((res) => res.data);


export default function useUser() {
  return useQuery(
    "user", 
    async () => fetchUser(),
    {
    }
  )
}