import Action from './actions'
const following = require('./data/followers.json')
const profileinfo = require('./data/profile.json')
const articlesinfo = require('./data/articles.json')

const Reducer = (state =  {
	nextId: 4,
    nextArticleId:1,
	location: "", 
    msg:"",
    keyword:"",
    followers: following.followers,
    profile: profileinfo.profileItems,
    articles: articlesinfo.articles,
    articles_shown: articlesinfo.articles
	}, action)=> {
    switch (action.type) {
    	case Action.NAV_PROFILE:
    		return {
    			...state,
    			location: "PROFILE_PAGE"
    		}
    	case Action.NAV_MAIN:
    		return {
    			...state,
    			location: "MAIN_PAGE"
    		}
    	case Action.NAV_OUT:
    		return {
    			...state,
    			location: "LANDING_PAGE"
    		}
        case Action.LOGIN:
            return {
                ...state,
                profile: {...state.profile, username: action.username}
            }
        case Action.UPDATE_HEADLINE:
            return {
                ...state,
                profile: {...state.profile, headline: action.headline}
            }

        case Action.UPDATE_DISPLAY:
            return {
                ...state,
                profile: {...state.profile, displayName: action.displayName}
            }

        case Action.UPDATE_PHONE:
            return {
                ...state,
                profile: {...state.profile, phoneNumber: action.phoneNum}
            }

        case Action.UPDATE_EMAIL:
            return {
                ...state,
                profile: {...state.profile, email: action.emailAdd}
            }

        case Action.UPDATE_ZIPCODE:
            return {
                ...state,
                profile: {...state.profile, zipcode: action.zipCode}
            }
        case Action.UPDATE_PASSWORD:
            return {
                ...state,
                profile: {...state.profile, password: action.passWord}
            }


        case Action.ADD_ARTICLE: {
        return {
            ...state,
            nextArticleId:state.nextArticleId+1,
            articles:[{
                _id:state.nextArticleId,
                author:state.profile.username,
                comments:[],
                date:action.date,
                img:null,
                text:action.text            
            },...state.articles],
            articles_shown:[{
                _id:state.nextArticleId,
                author:state.profile.username,
                comments:[],
                date:action.date,
                img:null,
                text:action.text            
            },...state.articles]
                

        }
    }
        case Action.SEARCH_KEYWORD:
            return {
                ...state,
                keyword: action.keyword,
                articles_shown: state.articles.filter(
                    article => {
                        return article.text.includes(action.keyword)
                    }

                )
            }

        case Action.ERROR:
            return{
                 ...state,
                 msg: action.errormsg
            }
    	case Action.REMOVE_FOLLOWER:
    		return {
                ...state,
                followers: state.followers.filter(
                    follower => {
                        return follower.id !== action.id
                    }
                )
            }
        case Action.ADD_FOLLOWER:
            return {
                ...state,
                followers: [
                    ...state.followers,
                    {
                        id: state.nextId,
                        username: action.username,
                        img: 'http://magento2.demo.ubertheme.com/pub/media//ubmegamenu/images/n/e/new.png',
                        headline: 'I am new here'
                    }
                ]
            }
        default:
            return state
		}
	}

export default Reducer

