import Action from './actions'

const Reducer = (state =  {location: "", errormsg:"",successmsg:"",keyword:"",followers: [],profile: {username:'', headline: '', avatar: '', zipcode: '', email: '', dob: ''},articles: [],articles_shown: []}
    , action)=> {
    const reset_msg = {errormsg:"", successmsg:""}
    switch (action.type) {
        case Action.NAV_PROFILE:
            return {...state, ...reset_msg, location: "PROFILE_PAGE"}
        case Action.NAV_MAIN:
            return {...state, ...reset_msg, location: "MAIN_PAGE"}
        case Action.NAV_OUT://clear the state when logging out(to landing page)
            return {location: "", errormsg:"",successmsg:"",keyword:"",followers: [],profile: {username:'', headline: '', avatar: '', zipcode: '', email: '', dob: ''},articles: [],articles_shown: []}
        case Action.LOGIN:
            return {...state, profile: {...state.profile, username: action.username}}
        case Action.UPDATE_PROFILEINFO:
            return{ ...state, profile: {...state.profile, headline: action.headline, avatar: action.avatar, zipcode: action.zipcode, email: action.email, dob: action.dob}}      
        case Action.UPDATE_HEADLINE:
            return {...state,profile: {...state.profile, headline: action.headline}}
        case Action.UPDATE_DISPLAY:
            return {...state,profile: {...state.profile, displayName: action.displayName}}
        case Action.UPDATE_PHONE:
            return {...state, profile: {...state.profile, phoneNumber: action.phoneNum}}
        case Action.UPDATE_EMAIL:
            return {...state,profile: {...state.profile, email: action.email}}
        case Action.UPDATE_ZIPCODE:
            return {...state, profile: {...state.profile, zipcode: action.zipcode}}
        case Action.UPDATE_PASSWORD:
            return {...state, profile: {...state.profile, password: action.password}}
        case Action.UPDATE_AVATAR:
            return {...state, profile: {...state.profile, avatar: action.avatar}}
        case Action.LOAD_ARTICLES:{//add a boolean variable to each article which is to record whether to show article's comments or not
            return { ...state, 
                    articles_shown: Object.keys(action.articles).map((_id)=> action.articles[_id]).map((article)=>({...article, displayflag:false, commentflag: false})), 
                    articles: Object.keys(action.articles).map((_id)=> action.articles[_id]).map((article)=>({...article,displayflag:false, commentflag: false})) 
        }}
        case Action.ADD_ARTICLE: {
            return {...state,articles:[action.article, ...state.articles],articles_shown:[action.article, ...state.articles_shown]}}
        case Action.SEARCH_KEYWORD:
            return {...state,keyword: action.keyword,articles_shown: state.articles.filter(
                    article => {
                        if (article.text){return article.text.toLowerCase().includes(action.keyword.toLowerCase())}
        })}
        case Action.EDIT_ARTICLE:{
            return {...state, articles_shown: state.articles_shown.map(article => 
                {if (article._id == action.article._id){article = {...article, text:action.article.text, comments:action.article.comments }
                                                        return article }
                 else{return article}}),
                articles: state.articles.map(article => 
                {if (article._id == action.article._id){article = {...article, text:action.article.text, comments:action.article.comments }
                                                        return article }
                 else{return article}
        })}}
        case Action.ERROR:
            return{...state, ...reset_msg, errormsg: action.errormsg}
        case Action.CHANGE_FLAG://This action changes the flag of whether to show comments or not 
            return {...state, 
                articles:state.articles.map((article)=>{let displayflag
                                                        if(article._id==action.id){displayflag = !article.displayflag}
                                                        else{displayflag = article.displayflag}
                                                        return {...article,displayflag}}),
                                articles_shown: state.articles_shown.map((article)=>{let displayflag
                                                            if(article._id==action.id){displayflag = !article.displayflag}
                                                            else{displayflag = article.displayflag}
                                                            return {...article,displayflag}})
            }
        case Action.COMMENT_FLAG://This action changes the flag of whether to allow comment(i.e. show the textarea for commenting) on the article or not
            return {...state, 
                articles:state.articles.map((article)=>{let commentflag
                                                        if(article._id==action.id){commentflag = !article.commentflag}
                                                        else{commentflag = article.commentflag}
                                                        return {...article,commentflag}}),
                                articles_shown: state.articles_shown.map((article)=>{let commentflag
                                                            if(article._id==action.id){commentflag = !article.commentflag}
                                                            else{commentflag = article.commentflag}
                                                            return {...article,commentflag}})
            }

        case Action.SUCCESS:
            return{...state, ...reset_msg, successmsg: action.successmsg}
        case Action.LOAD_FOLLOWERS:
            return { ...state, followers: action.followers}
        default:
            return state
        }
	}

export default Reducer

