const { validateToken } = require("../services/authentication.js")

function checkForAuthenticationCookie(cookieName){
    return(req, res, next) => {
        // here we are accessing the value of the cokkie by it's name
        // apparently the name is token while using the above checkForAuth
        // use the token as string as its paramter
        const tokenCookieValue = req.cookies[cookieName];

        // if there is no cookie simply return the next()
        if(!tokenCookieValue){
            return next();
        }
        // validateToken returns the payload by verifing the token with 
        // the secretkey we have
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }catch(error){}

        next();
    }
}

module.exports = {
    checkForAuthenticationCookie,
}