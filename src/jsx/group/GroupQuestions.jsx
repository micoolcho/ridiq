import React from "react";
import Utils from "./../Utils.jsx"
import BasedLoadMoreComponent from "./../BasedLoadMoreComponent.jsx";
import { GroupQuestionService } from "./../services/GroupQuestionService.jsx";
import GroupQuestionTabs from "./GroupQuestionTabs.jsx";
import BasedQuestionContainer from "./BasedQuestionContainer.jsx";

class TrendingQuestion extends BasedQuestionContainer {
  constructor(...args) {
    const externalArgs = {
      service: new GroupQuestionService("public_trending"),
      total: window.ridiqConf.groupQuestion.trending.total,
    }

    super(...args, externalArgs);
  }
}

class MostRecentQuestion extends BasedQuestionContainer {
  constructor(...args) {
    const externalArgs = {
      service: new GroupQuestionService("public_questions"),
      total: window.ridiqConf.groupQuestion.mostRecent.total,
    }

    super(...args, externalArgs);
  }
}

class AllTimeQuestion extends BasedQuestionContainer {
  constructor(...args) {
    const externalArgs = {
      service: new GroupQuestionService("public_all_time"),
      total: window.ridiqConf.groupQuestion.allTime.total,
    }

    super(...args, externalArgs);
  }
}

class UnansweredQuestion extends BasedQuestionContainer {
  constructor(...args) {
    const externalArgs = {
      service: new GroupQuestionService("public_unanswered"),
      total: window.ridiqConf.groupQuestion.unanswered.total,
    }
    
    super(...args, externalArgs);
  }
}

export default class GroupQuestion extends React.Component {
  constructor(...args) {
    super(...args);

    this.state =  {
      currentActiveTabIndex: 0,
    };

    this.onSelectTabItem = this.onSelectTabItem.bind(this);
  }

  render() {
    return (
      <div className="group-questions margin-auto">
        <GroupQuestionTabs onSelectItem={ this.onSelectTabItem } />
        <TrendingQuestion active={ this.state.currentActiveTabIndex == 0 } />
        <MostRecentQuestion active={ this.state.currentActiveTabIndex == 1 } />
        <AllTimeQuestion active={ this.state.currentActiveTabIndex == 2 } />
        <UnansweredQuestion active={ this.state.currentActiveTabIndex == 3 } />
      </div>
    )
  }

  onSelectTabItem(index) {
    this.setState({
      currentActiveTabIndex: index,
    });
  }
}