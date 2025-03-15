const getenv = (constant, defaultValue) => {
    const value = process.env[constant] || defaultValue;
    if (!value) {
        throw new Error(`Environment variable ${constant}  is not set`);
    }
    return value;
};
export default getenv;
