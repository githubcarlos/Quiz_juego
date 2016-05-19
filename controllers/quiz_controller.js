var models = require('../models');

//Autoload el quiz asociado a :quizId
exports.load = function(rea, res, next, quizId){
	models.Quiz.findById(quizId)
		.then(function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			}else{
				next(new Error ('Noe existe quizId = ' + quizId));
			}
		}).catch(function(error){
			next(error);
		});
};

// GET /quizzes
exports.index = function(req, res, next) {
	models.Quiz.findAll()
		.then(function(quizzes) {
			res.render('quizzes/index.ejs', { quizzes: quizzes});
		})
		.catch(function(error) {
			next(error);
		});
};


// GET /quizzes/:id
exports.show = function(req, res, next) {
	var answer = req.query.answer || '';
	res.render('quizzes/show', { quiz: req.quiz, answer: answer});
};


// GET /quizzes/:id/check
exports.check = function(req, res next) {
	var answer = req.query.answer || '';
	var result = answer === req.quiz.answer ? 'Correcta' : 'Incorrecta';
	res.render('quizzes/result', { quiz: req.quiz, 
									result: result, 
									answer: answer });

};


//GET /Author
exports.author = function(req, res, next){
	res.render('quizzes/author');
};

