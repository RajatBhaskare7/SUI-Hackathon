import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Protected(props) {
    const { component: Component, ...rest } = props;
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = React.useState(false);
    const [role, setRole] = React.useState('');
    const [user, setUser] = React.useState({});
    React.useEffect(() => {

        if (!localStorage.getItem('token') && !localStorage.getItem('id')) {
            console.log('no token');
            setIsAuth(false);
            navigate('/');
        }
        else{

            axios.get(process.env.REACT_APP_BASE_URL+'/user/getuser'
        
        ).then(response => {
            response.data.filter((user) => {
                if(user._id === localStorage.getItem('id')){
                    setRole(user.role);
                    setUser(user)
                    setIsAuth(true);
                    const token = localStorage.getItem('token');
                    axios.post(process.env.REACT_APP_BASE_URL+'/auth/check-token-expiration', {token: token})
                    .then(response => {
                        if(response.data.expired){
                            alert('Session expired. Please login again');
                            localStorage.clear();
                            navigate('/');
                        }

                    });
                  
                }
            });
        }
        ).catch((error) => {
            console.log(error);
        });
        }
    }, []);
  return (
    <div>
        <Component role={role} user={user}  {...rest} />
    </div>
  )
}
