import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [employees] = await pool.query("SELECT * FROM employee");
    res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [employee] = await pool.query(`SELECT * FROM employee WHERE id = ?`, [
      req.params.id,
    ]);
    if (employee.length != 0) {
      res.json(employee[0]);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const postEmployees = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const patchEmployees = async (req, res) => {
  try {
    const [employee] = await pool.query(
      `UPDATE employee
    SET name = IFNULL(?, name), salary = IFNULL(?, salary)
    WHERE id = ?;
    `,
      [req.body.name, req.body.salary, req.params.id]
    );
    if (employee.affectedRows != 0) {
      const [rows] = await pool.query(`SELECT * FROM employee WHERE id = ?`, [
        req.params.id,
      ]);
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [employee] = await pool.query(`DELETE FROM employee WHERE id = ?`, [
      req.params.id,
    ]);
    if (employee.affectedRows != 0) {
      res.json({ message: "Success" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
