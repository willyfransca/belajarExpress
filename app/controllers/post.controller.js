const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

//membuat post
exports.create = (req, res) => {
    //mengecek body kosong
    if (!req.body.title) {
        res.status(400).send({
            message: "kontent tidak boleh kosong"
        });
        return;
    }
    const post = {
        title: req.body.title,
        description: req.body.description,
        images: req.body.images
    }

    Post.create(post)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "ada eror ketika melakukan post ke database"
            });
        });
};

//pencarian bedasarkan ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then((data) => {
            if (data == null) {
                res.send({
                    message: "data tidak ditemukan"
                })
            } else {
                res.send(data);
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "ada eror ketika mencari di database"
            });
        });
};

// mengambil semua data
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({ where: condition })
        .then((data) => {
            if (data == 0) {
                res.send({
                    message: `tidak ada data yang mengandung kata ` + title
                })
            } else {
                res.send(data);
            }
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "ada eror ketika mencari di database "
            });
        });
};

// update data dengan ID
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "resep sudah di update"
            });
        } else {
            res.send({
                message: `tidak dapat mencari resep dengan id=${id}.`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "error dalam mengupdate resep dengan id=" + id
        })
    });
};

// hapus data dengan ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "resep dengan id= " + $id + " sudah di hapus"
            })
        } else {
            res.send({
                message: `tidak dapat menghapus resep dengan id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "error dalam menghapus resep di databese id=" + id
        })
    });
};

// // hapus semua data
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},

        //truncate untuk ngeset index id jadi 1 lagi
        truncate: true
    }).then((result) => {
        res.send({
            message: `${result} resep sudah di hapus semuanya!!!`
        });
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "ada error ketika menghapus semua resep."
        });
    });
};
