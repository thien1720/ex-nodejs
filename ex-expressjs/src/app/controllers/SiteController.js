const Course  = require('../modules/Course')
const {mutipleMongoesToObject} = require('../../until/mongooes')

class SiteController {
    // [Get] /
    index(req, res , next) {
        // Course.find({}, function(err, course) {
        //     if(!err){
        //         res.json(course)
        //     }else{
        //         next(err)
        //         res.status(404).json({error: 'Course not found'})
        //     }
        // })

        Course.find({})
            .then(courses => {
                
                res.render("home", 
                    {courses: mutipleMongoesToObject(courses)}
                )
            }   
            )
            .catch(next)
    }

    // [Get] / search
    search(req, res) {
        res.send('search');
    }
}

module.exports = new SiteController();
