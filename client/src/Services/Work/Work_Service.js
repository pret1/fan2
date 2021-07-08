import axios from 'axios';

export const getAllWork = async () => {
    return await axios.get('/api/work/getAllWork');
}

export const getUserWork = async userData => {
    return await axios.post('/api/work/getUserWork', {username: userData});
}

export const saveWork = async workData => {
    return await axios.post('/api/work/saveWork', workData);
}

export const saveRating = async ratingData => {
    return await axios.post('/api/work/rating', ratingData)
}