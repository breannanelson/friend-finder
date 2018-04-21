// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be 
// used to handle the compatibility logic.
var friendArr = require('../data/friends.js')

exports.apiRoutes = function (app) {



    app.post('/api/friends', function (req, res) {
        var userInput = req.body;
        var userScores = userInput.scores;

		var totalDiff = 100;
		var matchName = '';
		var matchImage = '';
		

		
		for (var i = 0; i < friendArr.length; i++) {			
			var diff = 0;
			for (var j = 0; j < userScores.length; j++) {
				diff += Math.abs(friendArr[i].scores[j] - userScores[j]);
			}
			

			
			if (diff < totalDiff) {
				totalDiff = diff;
				matchName = friendArr[i].name;
				matchImage = friendArr[i].photo;
			}
		}

		friendArr.push(userInput);

        console.log(friendArr)
        console.log({matchName: matchName, matchImage: matchImage})
		res.json({matchName: matchName, matchImage: matchImage});


    });




    // With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
    app.get('/api/friends', function (req, res) {
		// res.send(matchName)
        res.json(friendArr)

    });
    app.get('/userid', function (req, res) {
        res.send(friendArr.length.toString())
    })
}
