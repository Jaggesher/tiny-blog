export const selectByPostId = `SELECT * from Comment WHERE postId = $id`;
export const selectById = `SELECT * FROM Comment WHERE id = $id`;
export const insert = `INSERT INTO Comment (id, text, creationDate, postId, userId) VALUES($id, $text, $creationDate, $postId, $userId)`;
