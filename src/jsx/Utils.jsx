export default class Utils {
  static kFormat(num) {
    if (num < 1000) {
      return num;
    }

    if (num % 1000 == 0) {
      return (num / 1000) + "k";
    }

    return (num/1000).toFixed(1) + 'k';
  }
}

export let baseAPIUrl = "https://api.letsyam.com/api/v7"
// if (process.env.NODE_ENV === 'production') {
//   baseAPIUrl = 'http://api.letsyam.com'
// } else if (process.env.NODE_ENV === 'staging') {
//    baseAPIUrl = 'http://yam-staging.herokuapp.com'
// } else {
//   baseAPIUrl = 'http://localhost:8000'
// }
