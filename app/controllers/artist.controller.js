const prisma = require("../../prisma");

exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name
    ? { where: { name: { contains: name, mode: "insensitive" } } }
    : {};

  prisma.artist
    .findMany(condition)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving artists.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  prisma.artist
    .findUnique({ where: { id: Number(id) } })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Artist with id " + id });
      else res.send({ data });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Artist with id=" + id });
    });
};

exports.getTopThree = async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        songs: true,
      },
    });

    const artistsWithTotalPlaybacks = artists.map((artist) => {
      const totalPlaybacks = artist.songs.reduce((sum, song) => sum + song.playbacks, 0);
      return { ...artist, totalPlaybacks };
    });

    const topThreeArtists = artistsWithTotalPlaybacks
      .sort((a, b) => b.totalPlaybacks - a.totalPlaybacks)
      .slice(0, 3);

    res.send({ data: topThreeArtists });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving artists.",
    });
  }
};
