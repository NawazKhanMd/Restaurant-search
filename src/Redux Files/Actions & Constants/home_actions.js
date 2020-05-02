import { home_action_types as action_types } from '../Actions & Constants/constants'
import {restApiUrls,RequestAPI} from '../../Utils/fetchInterceptor'
export const getCities = () => (dispatch) => {
  dispatch(toogleLoader(true))
  let fetchObj = {
    url: restApiUrls.CitiesURL,
    method: 'GET'
}
return RequestAPI(fetchObj).then(resp => {
  dispatch(toogleLoader(false))
    if (resp.type == 'success') {
        dispatch({
          type:action_types.get_cities_success,
          payload:resp.data
        })
    } else {
      dispatch(toogleLoader(false))
    }
})
}
export const toogleLoader = (flag) => (dispatch)=>{
  dispatch({
    type:action_types.loading,
    flag:flag
  })
}
export const filterRestaurants= (address)=>(dispatch)=>{
  dispatch({
    type:action_types.filter_restaurants,
    address:address
  })
}

export const getRestaurants = (City) => (dispatch) => {
  dispatch(toogleLoader(true))
  let fetchObj = {
    url: restApiUrls.RestaurantURL.replace('#{CITY}#',City),
    method: 'GET'
}
return RequestAPI(fetchObj).then(resp => {
  dispatch(toogleLoader(false))
    if (resp.type == 'success') {
        dispatch({
          type:action_types.get_restaurants_success,
          payload:resp.data
        })
    } else {
      dispatch(toogleLoader(false))
    }
})
}

