export const selectById = `SELECT * FROM User WHERE id = $id`;
export const insert = `INSERT INTO User (id, email, name, creationDate) VALUES($id, $email, $name, $creationDate)`;
export const select = `SELECT * FROM User`;