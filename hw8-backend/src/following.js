'use strict';
const models = require('./model.js')

const getFollowing = (req, res) => {
	const username = req.params.user ? req.params.user : req.username
    //get all the followers of the supplied user
	models.Profile.find({username:username}).exec(function(err,users){
        if(!err){
            if(!users || users.length === 0){
                res.status(400).send("can not find the user")
                return
            }
           	res.status(200).send({username:username, following:users[0].following})
            
        }
    })
}

const putFollowing = (req, res) => {
    const username = req.username
	const follower_id = req.params.user
	if(!follower_id){
		res.status(400).send({result: "You should supply the follower to add"})
        return
	}
    models.Profile.find({username:follower_id}).exec(function(err,users){
        if(!users || users.length === 0){
            res.status(400).send("The follower you want to add does not exist")
            return 
        }
        else{
            models.Profile.find({username:username}).exec(function(err,users){
                const add_followers = users[0].following
                
                if (add_followers.indexOf(follower_id) == -1){
                    //if the supplied follower is not in the loggedin user's follower list, then add it
                    add_followers.push(follower_id)
                    //at the same time, add the loggedin user in supplied follower's follower list
                    models.Profile.update({username:username}, {$set:{following:add_followers}}, {new:true}, function(err){
                        res.status(200).send({username:username, following: add_followers})
                    })
                }
                else{
                    res.status(400).send("You already followed the user")
                    return 
                }
            })
    }

    })
}

const deleteFollowing = (req, res) => {
	const username = req.username
    const follower_id = req.params.user
    if(!follower_id){
        res.status(400).send("You should supply the follower to delete")
        return
    }
    models.Profile.find({username:username}).exec(function(err, users){
        //obtain the new follower list by filtering all the followers such that only the followers whoese id is not the to-be-deleted follower id are kept
    	const update_followers = users[0].following.filter((follower) => {return follower != follower_id})
    	models.Profile.update({username:username}, {$set:{following:update_followers}}, {new:true}, function(err){
            res.status(200).send({username:username, following: update_followers})
	    })
    })
}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}