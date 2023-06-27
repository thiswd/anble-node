const prisma = require("../../prisma");

exports.findAll = (req, res) => {
  const title = req.query.title;
  const page = req.query.page ? Number(req.query.page) : 1;
  const size = req.query.size ? Number(req.query.size) : 10;
  const skip = (page - 1) * size;

  const condition = title
    ? { where: { title: { contains: title, mode: "insensitive" } }, skip, take: size }
    : { skip, take: size };

  prisma.song
    .findMany(condition)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving songs.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  prisma.song
    .findUnique({
      where: { id: Number(id) },
    })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Song with id " + id });
      else res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Song with id=" + id });
    });
};

exports.getTopTen = (req, res) => {
  prisma.song
    .findMany({
      take: 10,
      orderBy: {
        playbacks: 'desc'
      }
    })
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving songs.",
      });
    });
};
