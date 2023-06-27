const prisma = require("../../prisma");

exports.findAll = (req, res) => {
  const { name } = req.query;
  const condition = name
    ? { where: { name: { contains: name, mode: "insensitive" } } }
    : {};

  prisma.artist
    .findMany(condition)
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving artists.",
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  prisma.artist
    .findUnique({ where: { id: Number(id) } })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Artist with id " + id });
      else res.send({ data });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: err.message || "Error retrieving Artist with id=" + id });
    });
};

exports.getTopThree = async (_, res) => {
  try {
    const topThreeArtists = await prisma.$queryRaw`
      SELECT "Artist"."id", "Artist"."name", SUM("Song"."playbacks") as "totalPlaybacks"
      FROM "Artist"
      LEFT JOIN "Song" ON "Artist"."id" = "Song"."artistId"
      GROUP BY "Artist"."id"
      ORDER BY "totalPlaybacks" DESC
      LIMIT 3
    `;

    res.send({ data: topThreeArtists });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving artists.",
    });
  }
};
