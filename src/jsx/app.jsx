import React from 'react';
import ReactDOM from 'react-dom';
import MoreAnswer from './MoreAnswer.jsx';
import AskQuestionForm from './AskQuestionForm.jsx';

if (document.getElementById('askQuestionForm')) {
  ReactDOM.render(<AskQuestionForm />, document.getElementById('askQuestionForm'));
}

if (document.getElementById('moreAnswer')) {
  ReactDOM.render(<MoreAnswer totalItem={15} loadedItem={5} />, document.getElementById('moreAnswer'));
}