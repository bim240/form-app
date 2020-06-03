var Quiz = require("../models/quiz");

module.exports = {
  createQuiz: async (req, res, next) => {
    try {
      var title = req.quiz.title;
      var newQuiz = await Quiz.create({ title });

      for (var oneQuestion of req.quiz.questions) {
        var title = oneQuestion.question;
        var option = oneQuestion.options;
        var answer = oneQuestion.answer;
      }
      //
      // push quiz id in question
      // create a question for each question
      // push queston id in quiz
      // send the response

      // take quiz from req.quiz
      // write validation for quiz - checking for title.
      // if not there - return 400
      // new Quiz. - quiz._id
      // take all questions out using req.quiz.questions
      // make a separate function called isValidQuestion
      // loop through all the questions. - check validity using isValidQuestion - n
      // weed out those that are not valid
      // use insertMany to save all questions at once. - DB operation
      // map through to find questionIds - n
      // quiz.questions = questionIds. quiz.save();
    } catch (error) {
      next(error);
    }
  },
};
