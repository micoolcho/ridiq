import React from 'react';
import ReactDOM from 'react-dom';
import UserAnswers from './UserAnswers.jsx';
import AskQuestionForm from './AskQuestionForm.jsx';
import MoreComment from './MoreComment.jsx';
import GroupQuestions from "./group/GroupQuestions.jsx";
import SingleQuestion from "./SingleQuestion.jsx";
import Moment from 'moment';

console.log("App v." + "05.07.16.2");

// Config moment
Moment.updateLocale('en', {
  relativeTime: {
    future : 'in %s',
    past : '%s',
    s : 'now',
    m : '1m',
    mm : '%dm',
    h : '1h',
    hh : '%dh',
    d : '1d',
    dd : '%dd',
    M : '4w',
    MM : (number)=>{
      return `${number * 4}w`;
    },
    y : 'a year',
    yy : '%d years'
  }
});

// Ask question form for User or Group.
if (document.getElementById('askQuestionForm')) {
  ReactDOM.render(
    <AskQuestionForm 
      subject_id={window.ridiqConf.askQuestion.subject_id}
      subject_type={window.ridiqConf.askQuestion.subject_type}
    />, 
    document.getElementById('askQuestionForm')
  );
}

// Public profile page: user answers.
if (document.getElementById('moreAnswer')) {
  ReactDOM.render(
    <UserAnswers totalItem={window.ridiqConf.answer.answerCount} perPage={window.ridiqConf.answer.perPage} />,
    document.getElementById('moreAnswer')
  );
}

// Single answer page: comments of answer.
if (document.getElementById('moreComment')) {
  ReactDOM.render(<MoreComment totalItem={window.ridiqConf.comment.commentCount} perPage={window.ridiqConf.comment.perPage} />, document.getElementById('moreComment'));
}

// Single answer page: translate from timestamp to `1h, 1w ... ago`.
if (document.getElementById('answerCreatedAt')) {
  var ele = document.getElementById('answerCreatedAt');
  ele.innerHTML = Moment(new Date(parseInt(ele.dataset.answerCreatedAt) * 1000)).fromNow();
}

// Group page: questions in group. Including 4 types: trending, most recent, all time, unanswered.
if (document.getElementById('groupQuestions')) {
  ReactDOM.render(<GroupQuestions />, document.getElementById('groupQuestions'));
}

// Single question page: answers of question.
if (document.getElementById('singleQuestionAnswers')) {
  ReactDOM.render(<SingleQuestion />, document.getElementById('singleQuestionAnswers'));
}