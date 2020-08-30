module.exports = app => {
    const post = require("../controllers/post.controller.js");

    let router = require("express").Router();

    //memanggil method yang sudah dibuat di post.controller
    //menyimpan data
    router.post("/", post.create);

    //mengambil semua data
    router.get("/", post.findAll);

    //mengambil data dengan ID
    router.get("/:id", post.findOne);

    //update data
    router.put("/:id", post.update);

    //hapus data dengan ID
    router.delete("/:id", post.delete);

    //hapus semua data
    router.delete("/", post.deleteAll);

    //untuk peruteaan di URL
    app.use("/resep/", router);

}