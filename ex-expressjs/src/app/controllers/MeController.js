const Course  = require('../modules/Course')
const {mutipleMongoesToObject} = require('../../until/mongooes')

class MeController {

    // [Get] / me/course/course
    storedCouse(req, res , next) {
        let courseQuery = Course.find({})

        // res.json(res.locals._sort)

        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery,Course.countDocumentsDeleted()])
            .then(([course, deleteCount]) =>   
                res.render("me/stored-couse" , {
                    deleteCount,
                    course: mutipleMongoesToObject(course)})
            )
            .catch(next)

        // Course.countDocumentsDeleted()
        //     .then(deletedCount => {
                
        //     })  
        //     .catch(next)


        // Course.find({})
        //     .then(course =>  res.render("me/stored-couse" , {course: mutipleMongoesToObject(course)}))
        //     .catch(next)
       
    }

    trashCourse(req, res, next) {
        Course.findDeleted({})
            .then(course => res.render("me/trash-couse" , {course: mutipleMongoesToObject(course)}))
            .catch(next)
    }
}

module.exports = new MeController();
