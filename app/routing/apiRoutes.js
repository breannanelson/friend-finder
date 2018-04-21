// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be 
// used to handle the compatibility logic.
var friendArr = require('../data/friends.js')

exports.apiRoutes = function (app) {



    app.post('/api/friends', function (req, res) {
        var userInput = req.body;
        var userScores = userInput.scores;
        friendArr.push(userInput);

        // res.json(friendArr)

		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 100; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friendArr.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userScores.length; j++) {
				diff += Math.abs(friendArr[i].scores[j] - userScores[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friendArr[i].name;
				matchImage = friendArr[i].pic;
			}
		}


        // Send appropriate response
        // res.send(friendArr)
        // console.log({status: 'OK', matchName: matchName, matchImage: matchImage})
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});


    });




    // With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
    app.get('/api/friends', function (req, res) {
		// res.send(matchName)
        // res.send(friendArr)

    });
    app.get('/userid', function (req, res) {
        res.send(friendArr.length.toString())
    })
}
