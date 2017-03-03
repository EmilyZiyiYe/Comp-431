import Action, {showError} from '../../actions'

//post an article 
export function addArticle(article){
	return (dispatch) => {
		if (article){
		dispatch({
			type:Action.ADD_ARTICLE,
			text: article,
            date: Date().toString()
		});
	}
	}
}
//filter articles based on key words
export function filterArticle(keyword){
	return (dispatch)=>{
		dispatch({
			type:Action.SEARCH_KEYWORD,
			keyword:keyword
		});
	}
}
