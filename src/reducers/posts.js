import {
    ADD_POST,
    EDIT_POST,
    FETCH_POSTS,
    FETCH_POST_DETAILS,
    FETCH_POSTS_BY_CATEGORY,
    DELETE_POST,
    VOTE_ON_POST,
    SORT_POSTS
} from "../actions/posts";

const postsInitialState = {
    items: []
};

const posts = (state = postsInitialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                items: [...state.items, action.post]
            };

        case EDIT_POST:
            return {
                ...state,
                currentPost: { ...state.currentPost, title: action.title, body: action.body }
            };

        case VOTE_ON_POST:
            debugger;
            const { currentPost } = state;
            const newVoteScore = currentPost.voteScore + action.voteScore;

            const currentItem = state.items.filter(x => x.id === action.postId)[0];
            const item = { ...currentItem, voteScore: newVoteScore };

            return {
                items: [...state.items.filter(x => x.id !== action.postId), currentItem],
                currentPost: { ...state.currentPost, voteScore: newVoteScore }
            };

        case DELETE_POST:
            return {
                items: [...state.items.filter(x => x.id !== action.postId)]
            };

        case FETCH_POSTS:
            return {
                items: action.items
            };

        case FETCH_POST_DETAILS:
            return {
                ...state,
                currentPost: action.post
            };

        case FETCH_POSTS_BY_CATEGORY:
            return {
                items: action.items
            };

        case SORT_POSTS:
            const currentPosts = [...state.items];
            const sortKey = action.filter;

            return {
                ...state,
                items: currentPosts.sort((a, b) => {
                    if (a[sortKey] < b[sortKey]) {
                        return 1;
                    } else if (a[sortKey] > b[sortKey]) {
                        return -1;
                    }
                    return 0;
                })
            };

        default:
            return state;
    }
};

export default posts;
