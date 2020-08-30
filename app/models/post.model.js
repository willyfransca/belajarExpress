
module.exports = (sequelize, Sequelize) => {

    // isi nama table dan atributnya
    const Post = sequelize.define("resep", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        images: {
            type: Sequelize.STRING
        }
    });
    return Post;
}