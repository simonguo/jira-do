const AsyncStorage = jest.genMockFromModule('AsyncStorage');

AsyncStorage.db = {};

AsyncStorage.setData = (data) =>{
  AsyncStorage.db = data;
};

AsyncStorage.getItem = async (key, callback) => {
  const result = JSON.stringify(AsyncStorage.db[key]);
  callback && callback(undefined, result);
  return result;
};

module.exports = AsyncStorage;
