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

export let baseAPIUrl = 'https://api.letsyam.com/api/v7'
// if (process.env.NODE_ENV === 'production') {
//   baseAPIUrl = 'https://api.letsyam.com/api/v7'
// } else if (process.env.NODE_ENV === 'staging') {
//    baseAPIUrl = 'https://yam-staging.herokuapp.com/api/v7'
// } else {
//   // baseAPIUrl = 'http://localhost:8000'
//   baseAPIUrl = 'https://api.letsyam.com/api/v7'
// }
