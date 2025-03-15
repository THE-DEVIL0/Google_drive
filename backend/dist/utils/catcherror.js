const catcherror = (controller) => async (res, req, next) => {
    try {
        await controller(res, req, next);
    }
    catch (error) {
        next(error);
    }
};
export default catcherror;
