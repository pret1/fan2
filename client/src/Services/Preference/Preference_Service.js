import axios from 'axios';

export const getPreference = async (data) => {
    return await axios.post('/api/preference/getPreference', {username: data});
}

export const savePreference = async preferenceData => {
    return await axios.post('/api/preference/savePreference', preferenceData);
}
