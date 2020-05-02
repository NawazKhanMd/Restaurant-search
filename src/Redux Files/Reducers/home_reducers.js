import {home_action_types as atn_typ} from '../Actions & Constants/constants'

export const initialState = {
    Cities: [],
    Restaurants:[],
    SavedRestaurants:[],
    Address:[],
    loading:false,
};


export const home = (state = initialState, action) => {

    switch (action.type) {
        case atn_typ.get_cities_success:
            state.Cities  = action.payload.data.cities.reduce((acc,val)=>{
                let obj ={label:val,value:val};
                acc.push(obj);
                return acc;
            },[])
            return {...state}
        case atn_typ.get_restaurants_success:
            state.Restaurants = action.payload.data.restaurants
            state.SavedRestaurants = action.payload.data.restaurants
            state.Address = action.payload.data.restaurants.reduce((acc,val)=>{
                let obj ={label:val.address,value:val.address};
                acc.push(obj);
                return acc;
            },[])
        return {...state}
        case atn_typ.filter_restaurants:
            if(action.address == ''){
                state.Restaurants = [...state.SavedRestaurants]
            }else if(action.address == null){
                state.Restaurants = []
                state.SavedRestaurants = []
            }else{
                state.Restaurants = state.SavedRestaurants.filter(ele=>ele.address == action.address)
            }
            
            return {...state}
       case atn_typ.loading:
           state.loading = action.flag
           return {...state}
        default:
            return state
    }
}
