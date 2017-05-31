import _ from 'lodash';
import { FETCH_POSTS, CREATE_POST, FETCH_POST, DELETE_POST } from '../actions';


export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case DELETE_POST:
            debugger;
            return _.omit(state, action.payload);
        case FETCH_POST:
            // //ES 5 way
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;
            //ES 6
            return { ...state, [action.payload.data.id]: action.payload.data }; //key interpolation []

        default:
            return state;
    }
}
