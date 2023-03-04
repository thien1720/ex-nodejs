module.exports = {
    mutipleMongoesToObject: function(mongooseArray){
        return mongooseArray.map(mongooes => mongooes.toObject())
    },

    mutipleMongoes : function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose
    }
}