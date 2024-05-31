import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Protected(props) {
    const { component: Component, ...rest } = props;
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = React.useState(false);
    const [role, setRole] = React.useState('');
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        if (!localStorage.getItem('token') ) {
            setIsAuth(false);
            console.log('no token')
            navigate('/');
        }
        else{
            axios.get(process.env.REACT_APP_BASE_URL+'/admin/getadmin'
        
        ).then(response => {
            response.data.map((item) => {
                if(item._id === localStorage.getItem('id')){
                    setIsAuth(true);
                    setRole(item.role);
                    setUser(item);
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
                else{
                    setIsAuth(false);
                    navigate('/');
                }
            }
            );
            
           
        }
        ).catch((error) => {
            console.log(error);
        });
        }
        
    }, []);
  return (
    <div>
        <Component role={role} user={user} {...rest} />
    </div>
  )
}
