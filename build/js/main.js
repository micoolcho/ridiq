class AskQuestionFrom extends React.Component {
  constructor(...args) {
    super(args);

    this.state = {
      submitted: false,
      txtLength: 0,
    };

    this.submitForm = this.submitForm.bind(this);
    this.countTxt = this.countTxt.bind(this);
  }

  render() {
    return (
      <div className="text-center">
        <div className="ask-question-input margin-auto">
          <textarea
            ref="textarea"
            placeholder="Ask a question" name="" id="" cols="30" rows="5"
            onChange={this.countTxt}
          ></textarea>
          <div className="counter">
            <span>{this.state.txtLength}</span>/250
          </div>
        </div>

        {
          this.state.submitted ? (
            <div className="notice blue">
              Your question has been submitted!
            </div>
          ) : <span></span>
        }

        <div
          className="button button-small"
          onClick={this.submitForm}
        >submit question</div>
      </div>
    );
  }

  countTxt(e) {
    this.setState({
      txtLength: this.refs.textarea.value.length,
    });
  }

  submitForm() {
    console.log(this.refs.textarea.value)
  }
}

ReactDOM.render(<AskQuestionFrom />, document.getElementById('askQuestionForm'));