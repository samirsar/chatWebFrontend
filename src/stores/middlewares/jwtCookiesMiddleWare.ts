import Cookies from 'js-cookie';


export const jwtCookieMiddleware = () => (next:any) => (action:any) => {
  if (action.type === 'user/loginUser/fulfilled') {
    Cookies.set('user',JSON.stringify(action.payload) , { expires: 1 }); 

  } else if (action.type === 'user/logOut') {
    Cookies.remove('user');
  }

  return next(action);
};
