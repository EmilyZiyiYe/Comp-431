import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'

//load articles from server 
export const getArticles = () => (dispatch) => {
        resource('GET', 'articles')
        .then((response) => {
            dispatch({ type: Action.LOAD_ARTICLES, articles: response.articles})
		})
}

export const addArticle_2 = (text, file) => (dispatch) => {
        if (file){
            const fd = new FormData()
            fd.append('text', text)
            fd.append('image', file)
            resource('POST', 'article', fd, false)
            .then((response) => {
                const article = response.articles[0]
                article.text = text
                article.displayflag = false
                article.commentflag = false
                dispatch({ type: Action.ADD_ARTICLE, article})
            })
        }
        else{
            const fd = {text: text}
            resource('POST', 'article', fd)
            .then((response) => {
                const article = response.articles[0]
                article.text = text
                article.displayflag = false
                article.commentflag = false
                dispatch({ type: Action.ADD_ARTICLE, article})
            })
        }
}


export const addArticle = (text, file) => (dispatch) => {
        resource('POST', 'article', {text: text})
        .then((response) => {
            const article = response.articles[0]
            article.text = text
            article.displayflag = false
            article.commentflag = false
            dispatch({ type: Action.ADD_ARTICLE, article})
        })
}







export const editArticle = (id, text, commentid = false) => (dispatch) => {
        let payload
        if (commentid){payload = {text: text, commentId:commentid}}
        else{payload = {text: text}}
        resource('PUT', 'articles'+ '/' + id, payload)
        .then((response) => {
                const article = response.articles[0]
                if (!commentid){article.text = text}
                dispatch({type: Action.EDIT_ARTICLE, article})
        })
}

//send filter-articles-action which includes the keyword to reducer 
export const filterArticle = (keyword)=>(dispatch) => {
		dispatch({
			type:Action.SEARCH_KEYWORD,
			keyword:keyword
		})
}
//return the action of changing the flag that indicates whether to show comment for the article of the given id
export function showComment(id){
		return{
			type:Action.CHANGE_FLAG,
			id:id
		}
}

export function commentArticle(id){
        return{
			type:Action.COMMENT_FLAG,
			id:id
		}
}
