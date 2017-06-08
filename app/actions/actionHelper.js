import fetchData from '../utils/fetchData';

export function createFetchAction(action) {

  const {
    actionModel,
    onSuccess,
    onError,
    url,
    loading = true,
    options
  } = action;

  return dispatch => {
    loading && dispatch(actionModel({}, 'REQUEST'));
    fetchData(url, Object.assign({ method: 'get' }, options), (response) => {
      dispatch(actionModel(response, 'SUCCESS'));
      onSuccess && onSuccess(response, dispatch);
    }, (error) => {
      dispatch(actionModel({}, 'ERROR'))
      onError && onError(error, dispatch);
    })
  }
}