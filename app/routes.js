module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('home.ejs')
    })
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') })
    })

    app.get('/signup', function(req, res) {

        res.render('signup.ejs', { message: req.flash('signupMessage') })
    })

    app.get('/user', isLoggedIn, function(req, res) {
        res.render('index.ejs', {user : req.user})
    })

    app.get('/money_transfer', isLoggedIn, function(req, res) {
        res.render('transfer', {user : req.user, message: req.flash('transferMessage')})
    })

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {user: req.user})
    })

    app.get('/calculator', function(req, res) {
        res.render('calc')
    })

    app.get('/holidays', function(req, res) {
        res.render('holidays')
    })

    app.get('/logout', function(req, res) {
        req.logout()
        res.redirect('/login')
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/user', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))

    app.post('/money_transfer', passport.authenticate('local-transfer', {
        successRedirect : '/user',
        failureRedirect : '/money_transfer',
        failureFlash : true
    }))
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next()

    // if they aren't redirect them to the home page
    res.redirect('/')
}