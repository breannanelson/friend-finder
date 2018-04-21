// A GET Route to /survey which should display the survey page.
// A default, catch-all route that leads to home.html which displays the home page.

exports.htmlRoutes = function (app, express, path) {
    // export
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });


    app.use(express.static(path.join(__dirname, '../public')));
}
