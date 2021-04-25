export const selectById = `SELECT * FROM Post WHERE id = $id`;
export const select = `SELECT * FROM Post`;
export const insert = `INSERT INTO Post (id, title, description, userId, creationDate) VALUES($id, $title, $description, $userId, $creationDate)`;
