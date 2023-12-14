export const getAccessToken = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    return storedAccessToken ? JSON.parse(storedAccessToken) : null;
};
