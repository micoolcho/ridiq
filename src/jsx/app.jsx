import React from 'react';
import ReactDOM from 'react-dom';
import UserAnswers from './UserAnswers.jsx';
import AskQuestionForm from './AskQuestionForm.jsx';
import MoreComment from './MoreComment.jsx';
import Moment from 'moment';

if (document.getElementById('askQuestionForm')) {
  ReactDOM.render(<AskQuestionForm />, document.getElementById('askQuestionForm'));
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

if (document.getElementById('answerCreatedAt')) {
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
      M : 'a month',
      MM : '%d months',
      y : 'a year',
      yy : '%d years'
    }
  });

  var ele = document.getElementById('answerCreatedAt');
  ele.innerHTML = Moment(new Date(ele.innerHTML)).fromNow();
}