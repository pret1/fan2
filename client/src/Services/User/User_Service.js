import axios from 'axios';

export const getUsers = async () => {
    return await axios.get('/api/user/all');
}

export const updateUsers = async (usersData) => {
    return await axios.post('/api/user/updateUsers', usersData);
}