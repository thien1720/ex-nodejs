const Course = require('../modules/Course')
const { mutipleMongoes } = require('../../until/mongooes')
const { json } = require('express')

class CourseController {

    // [Get] /:slug
    show(req, res, next) {
        console.log("request", req)
        Course.findOne({ slug: req.params.slug })
            .then(course => res.render("courses/show", { course: mutipleMongoes(course) }))
            .catch(next)
        // res.send('show');
    }

    // [Get] /create
    create(req, res, next) {
        res.render("courses/create")
    }

    // [Get] /edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render("courses/edit", { course: mutipleMongoes(course) }))
            .catch(next)

    }

    //[Post] courses/store

    store(req, res, next) {

        const formData = req.body
        formData.image = `https://www.youtube.com/embed/${req.body.videoId}`
        const courses = new Course(formData)

        courses
            .save()
            .then(() => res.redirect("/me/stored/couse"))
            .catch(next)
    }

    //[PUT] courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/couse"))
            .catch(next)
    }

    //[PUT] courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("/me/stored/couse"))
            .catch(next)
    }

    //[DELETE] courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next)
    }

    //[DELETE] courses/:id/forceDestroy
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next)
    }

    //[POST] courses/handle/form/action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case "delete":
                Course.delete({ _id: { $in: req.body.valuesId } })
                    .then(() => res.redirect("back"))
                    .catch(next)
                break;
            default:
                res.json({ messenger: 'action no isvalid' })
        }
    }

}

module.exports = new CourseController();
