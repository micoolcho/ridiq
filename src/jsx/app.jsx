import React from 'react';
import ReactDOM from 'react-dom';
import UserAnswers from './UserAnswers.jsx';
import AskQuestionForm from './AskQuestionForm.jsx';
import MoreComment from './MoreComment.jsx';
import GroupQuestions from "./GroupQuestions.jsx";
import SingleQuestion from "./SingleQuestion.jsx";
import Moment from 'moment';

console.log("App v." + "28.04.0");

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

if (document.getElementById('askQuestionForm')) {
  ReactDOM.render(
    <AskQuestionForm 
      subject_id={window.ridiqConf.askQuestion.subject_id}
      subject_type={window.ridiqConf.askQuestion.subject_type}
    />, 
    document.getElementById('askQuestionForm')
  );
}

if (document.getElementById('moreAnswer')) {
  ReactDOM.render(
    <UserAnswers totalItem={window.ridiqConf.answer.answerCount} perPage={window.ridiqConf.answer.perPage} />,
    document.getElementById('moreAnswer')
  );
}

if (document.getElementById('moreComment')) {
  ReactDOM.render(<MoreComment totalItem={window.ridiqConf.comment.commentCount} perPage={window.ridiqConf.comment.perPage} />, document.getElementById('moreComment'));
}

if (document.getElementById('groupQuestions')) {
  ReactDOM.render(<GroupQuestions />, document.getElementById('groupQuestions'));
}

if (document.getElementById('singleQuestionAnswers')) {
  ReactDOM.render(<SingleQuestion />, document.getElementById('singleQuestionAnswers'));
}

if (document.getElementById('answerCreatedAt')) {
  var ele = document.getElementById('answerCreatedAt');
  ele.innerHTML = Moment(new Date(parseInt(ele.innerHTML) * 1000)).fromNow();
}