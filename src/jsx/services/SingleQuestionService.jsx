import BasedLoadMoreService from "./BasedLoadMoreService.jsx";

export class AnswerService extends BasedLoadMoreService {
  getApiUrl(pageNum) {
    return [
      window.ridiqConf.singleQuestion.apiGet,
      "?",
      `page=${pageNum}`
    ].join("");
  }
}