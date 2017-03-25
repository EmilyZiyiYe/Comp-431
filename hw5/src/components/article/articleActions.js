import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'

//load articles from server 
export const getArticles = () => (dispatch) => {
        resource('GET', 'articles')
        .then((response) => {
            dispatch({ type: Action.LOAD_ARTICLES, articles: response.articles})
		})
}

export const addArticle = (text) => (dispatch) => {
        resource('POST', 'article', {text: text})
        .then((response) => {
            const article = response.articles[0]
            //add 
            article.text = text
            article.displayflag = false
            dispatch({ type: Action.ADD_ARTICLE, article})
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