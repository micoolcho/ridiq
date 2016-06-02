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