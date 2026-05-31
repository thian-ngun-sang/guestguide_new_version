const mongoose = require("mongoose");

function decodeCursor(cursor) {
  const { created_at, _id } = JSON.parse(
    Buffer.from(cursor, "base64").toString("utf8")
  );

  return {
    created_at: new Date(created_at),
    _id,
  };
}

function buildCursorFilter({ created_at, _id }) {
  return {
    $or: [
      { created_at: { $lt: created_at } },
      {
        created_at: created_at,
        _id: { $lt: new mongoose.Types.ObjectId(_id) },
      },
    ],
  };
}

module.exports = {
  decodeCursor,
  buildCursorFilter,
};
