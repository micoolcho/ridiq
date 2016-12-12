import BasedLoadMoreService from "./BasedLoadMoreService.jsx";

export class AnswerService extends BasedLoadMoreService {
  getApiUrl(pageNum) {
    return [
      window.yamConf.singleQuestion.apiGet,
      "?",
      `page=${pageNum}`
    ].join("");
  }
}