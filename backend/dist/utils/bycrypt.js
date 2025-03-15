import bycrypt from 'bcrypt';
export const hashPassword = async (password, roundNumber) => {
    return await bycrypt.hash(password, roundNumber || 10);
};
export const comparePassoword = async (password, hashedPassword) => {
    return bycrypt.compare(password, hashedPassword).catch(() => false);
};
