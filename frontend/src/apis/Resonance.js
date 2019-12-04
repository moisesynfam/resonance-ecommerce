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
        getAll: async (page, perPage) => {
            const response = await axios.get(`/api/furniture?page=${page}&perPage=${perPage}`);
            const { data } = response;
            if(!data.success) throw new Error(data.message);

            return data;
        },
        getItem: async (itemId) => {
            const response = await axios.get(`/api/furniture/${itemId}`);
            const { data } = response;
            if(!data.success) throw new Error(data.message);

            return data.item;
        },
        //since this call won't be used by actions, we're going to handle errors here
        emailItem: async (itemId) => {
            try {
                const response = await axios.get(`/api/furniture/emailItem?itemId=${itemId}`);
                return response.data;
            } catch ( err ) {
                console.log('Error sending email', err);
                return {success: false, message: err.message};
            }
           
        }
    },
    vendors: {
        getAll: async (page, perPage) => {
            const response = await axios.get(`/api/vendors`);
            const { data } = response;
            if(!data.success) throw new Error(data.message);

            return data.vendors;
        },
        getItem: async (vendorId) => {
            const response = await axios.get(`/api/vendors/${vendorId}`);
            const { data } = response;
            if(!data.success) throw new Error(data.message);

            return data.vendor;
        }
    },

}