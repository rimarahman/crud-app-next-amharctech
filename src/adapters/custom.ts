// import { Adapter } from 'next-auth/adapters';
// import axios from 'axios';

// function MyAdapter(): Adapter  {
//     return {
//       async getUser(username: any, password: any) {
//         try {
//           const response = await axios.post('https://your-api.com/auth/login', {
//             username,
//             password,
//           });

//           if (response.status === 200) {
//             const user = response.data;
//             return user;
//           } else {
//             // Handle user retrieval error
//             throw new Error('User retrieval failed');
//           }
//         } catch (error) {
//           // Handle any errors that occur during user retrieval
//           console.error('User retrieval error:', error);
//           throw error;
//         }
//       },

//       // Other adapter methods
//     };
// };

// export default MyAdapter;
