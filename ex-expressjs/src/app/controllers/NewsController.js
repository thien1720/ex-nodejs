class NewsController {
    // [Get] /news
    index(req, res) {
        res.render('news');
    }

    // [Get] /news: slug
    show(req, res) {
        res.send('helloo');
    }
}

module.exports = new NewsController();
