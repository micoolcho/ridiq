import React from 'react';
import ReactDOM from 'react-dom';
import AnswerService from './services.jsx';

class AskQuestionFrom extends React.Component {
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

class MoreAnswer extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      isLoading: false,
      loadedItem: 0,
      item: [],
    };

    this.onClickLoadMoreBtn = this.onClickLoadMoreBtn.bind(this);
    this.onReceiveLoadmoreResult = this.onReceiveLoadmoreResult.bind(this);
    
    AnswerService.addListener('loadmore', this.onReceiveLoadmoreResult);
  }

  render() {
    if (this.props.totalItem == 0) {
      return (<span></span>);
    }

    return (
      <div>
        {
          this.state.item.map((item)=>{
            return (
              <div className="answer" key={`answer-${item.id}`}>
                <img className="cover" src={item.cover} alt="" />
                <div className="question">{item.question}</div>
                <div className="info">
                  <span><img src="images/like_icon.png" alt="" /> {item.like}</span>
                  <span><img src="images/comment_icon.png" alt="" /> {item.comment}</span>
                </div>
              </div>
            )
          })
        }

        <div className="clearfix"></div>

        {
          this.state.loadedItem <= this.props.totalItem ? (
            <div className="text-center m-t-20">
              <div
                onClick={this.onClickLoadMoreBtn}
                className={'button button-large ' + (this.state.isLoading ? 'disabled' : '')}>
                {
                  this.state.isLoading ? 'loading...' : 'load more'
                }
              </div>
            </div>
          ) : <span></span>
        }
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      loadedItem: this.props.loadedItem,
    });
  }

  onClickLoadMoreBtn() {
    if (this.state.isLoading) return;
    this.setState({
      isLoading: true,
    });

    AnswerService.loadMore();
  }
  
  onReceiveLoadmoreResult(result) {
    result.map((newItem)=>{
      this.state.item.push(newItem);
    });

    this.state.loadedItem += result.length;
    this.state.isLoading = false;

    this.forceUpdate();
  }
}

ReactDOM.render(<AskQuestionFrom />, document.getElementById('askQuestionForm'));
ReactDOM.render(<MoreAnswer totalItem={15} loadedItem={5} />, document.getElementById('moreAnswer'));