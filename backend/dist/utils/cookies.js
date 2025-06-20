import { fiffteenMinFromNow, thirtyDaysFromNow } from "./date.js";
const secure = process.env.NODE_ENV !== "development";
const defaults = {
    sameSite: "strict",
    httpOnly: true,
    secure,
};
const getAccessTokenCookieOptions = () => ({
    ...defaults,
    expires: fiffteenMinFromNow(),
});
const refreshTokenCookieOptions = () => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: "/",
});
export const setAuthCookies = ({ res, accessToken, refreshToken }) => {
    res
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .cookie("refreshToken", refreshToken, refreshTokenCookieOptions());
};
