import Cookies from 'js-cookie';


export const jwtCookieMiddleware = () => (next:any) => (action:any) => {
  console.log(action)
  if (action.type === 'user/loginUser/fulfilled') {
    Cookies.set('user',JSON.stringify(action.payload) , { expires: 1 }); // Adjust the expiration as needed

  } else if (action.type === 'user/logOut') {
    Cookies.remove('user');
  }

  return next(action);
};
