import axios from 'axios';

axios.defaults.validateStatus = (status) => {
    return status < 500;
}

export default { 
    setAuthToken: (token) => {
        if(token) {
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            delete axios.defaults.headers.common['Authorization'];

        }
    },
    auth: {
        register: async (formData) => {
            
            const response = await axios.post('/api/users/register', formData);
            const { data } = response;
            //here we don't throw an error since we want to receive the validation errors and display them on the form 
            return data;
        },
        login: async (loginData) => {
            
            const response = await axios.post('/api/users/login', loginData);
            const { data } = response;
            if(!data.success) throw new Error(data.message);

            return data.token;
        },
    },
    furniture: {
        getAll: async () => {
            const response = await axios.get('/api/furniture');
            const { data } = response;
            if(!data.success) throw new Error(data.message);

            return data.furniture;
        }
    }
}