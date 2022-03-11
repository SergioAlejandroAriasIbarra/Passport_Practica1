const router = require('express').Router();
const passport = require('passport');

// path: auth/
//Nota: El path no lo voy a utilizar porque estoy utilizando el render

//GET /profile
router.get('/profile', (req, res, next) => {
    res.render('profile')
})

// GET /login
router.get('/auth/login', (req, res, next) => {
    res.render('login')
})
// GET /google/login
router.get('/google/login', passport.authenticate('google', { scope:
    ['profile', 'email'] }));

// GET /google/callback
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
     async function (req, res) {
        //capturo los datos para corroborar si funciona correctamente
        const name = req.user._json.name;
        const email = req.user._json.email;
        const picture = req.user._json.picture;
        console.log("Nombre: ",name)
        console.log("Email: ",email)
        console.log("Picture: ",picture)
        console.log(req.query.code); 
        res.render('profile');
    });

// GET /verifyLogin
router.get('/auth/verifyLogin', (req, res) => {
    req.user ? res.status(200).send('Logged In').next() : res.status(401).send('401 - Not Authorized');
});

// GET /logout

router.get("/auth/logout", (req, res) => {
    req.logout();
    req.session = null
    console.log('Sesion cerrada')
    res.render("home");
    
});
// GET /error
router.get('/error', (req, res) => {
    res.send('Error - Something went wrong.');
})

module.exports = router;
