const Helpers = {
  parseIfJson(value: any): any {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  },
};

export default Helpers;
