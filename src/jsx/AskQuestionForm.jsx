import React from 'react';
import QuestionService from './services/QuestionService.jsx';

export default class AskQuestionForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      openForm: false,
      submit: 0, // 0: not submited, 1: submitting, 2: submitted
      submitResult: false,
      txtLength: 0,
    };

    this.maxTxtLength = 250;

    this.submitForm = this.submitForm.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.onPostedQuestion = this.onPostedQuestion.bind(this);
  }

  render() {
    if (this.state.openForm == false) {
      return (
        <div className="text-center">
          <div
            className="button button-small"
            onClick={this.openForm}
          >ask a question</div>
        </div>
      )
    }

    return (
      <div className="text-center">

        {
          this.state.submit == 2 ? (
            <div>
              <div className="notice blue">
                {
                  this.state.submitResult ? 'Your question has been submitted!' : 'Error !!'
                }
              </div>
              <div
                className="button button-small btn-submit m-t-15"
                onClick={this.resetForm}
              >ASK ANOTHER QUESTION</div>
            </div>
          ) : (
            <div 
              className={ "ask-question-form" + (this.state.submit == 1 ? ' disabled' : '') }
            >
              <div className="ask-question-input margin-auto">
                <textarea
                  ref="textarea"
                  placeholder="Ask a question" name="" id="" cols="30" rows="5"
                  onChange={this.onTextareaChange}
                  disabled={this.state.submit == 1}
                ></textarea>
                <div className="counter">
                  <span className={ (this.state.txtLength + 10) > this.maxTxtLength ? 'active' : '' }>
                    {this.state.txtLength}
                  </span>/{this.maxTxtLength}
                </div>
              </div>

              <div
                className="button button-small m-t-15"
                onClick={this.submitForm}
              >
                {this.state.submit == 1 ? 'Submitting...' : 'submit question'}
              </div>
            </div>
          )
        }
      </div>
    );
  }

  componentDidMount() {
    QuestionService.addListener('posted', this.onPostedQuestion);
  }

  onPostedQuestion(result) {
    this.setState({
      submit: 2,
      submitResult: result,
    });
  }

  onTextareaChange(e) {
    let txtLength = this.refs.textarea.value.length;

    if (txtLength > this.maxTxtLength) {
      this.refs.textarea.value = this.refs.textarea.value.substring(0, this.maxTxtLength);
      txtLength = this.maxTxtLength;
    }

    this.setState({
      txtLength: txtLength
    });
  }

  submitForm() {
    // submiting form
    if (this.state.submit == 1) {
      return;
    }

    this.setState({
      submit: 1,
    });

    const txtValue = this.refs.textarea.value;
    QuestionService.post(txtValue);
  }

  resetForm() {
    this.setState({
      submit: 0,
      txtLength: 0,
    });

    setTimeout(()=>{
      this.refs.textarea.focus();
    }, 100);
  }

  openForm() {
    this.setState({
      openForm: true,
    });
  }
}