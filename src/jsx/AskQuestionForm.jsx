import React from 'react';
import AnswerService from './services/AnserServices.jsx';

export default class AskQuestionForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      openForm: false,
      submitted: false,
      txtLength: 0,
    };

    this.maxTxtLength = 250;

    this.submitForm = this.submitForm.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.openForm = this.openForm.bind(this);
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
          this.state.submitted ? (
            <div>
              <div className="notice blue">
                Your question has been submitted!
              </div>
              <div
                className="button button-small btn-submit m-t-15"
                onClick={this.resetForm}
              >ASK ANOTHER QUESTION</div>
            </div>
          ) : (
            <div>
              <div className="ask-question-input margin-auto">
                <textarea
                  ref="textarea"
                  placeholder="Ask a question" name="" id="" cols="30" rows="5"
                  onChange={this.onTextareaChange}
                ></textarea>
                <div className="counter">
                  <span>{this.state.txtLength}</span>/{this.maxTxtLength}
                </div>
              </div>

              <div
                className="button button-small m-t-15"
                onClick={this.submitForm}
              >submit question</div>
            </div>
          )
        }
      </div>
    );
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
    const txtValue = this.refs.textarea.value;

    this.setState({
      submitted: true,
    });
  }

  resetForm() {
    this.setState({
      submitted: false,
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