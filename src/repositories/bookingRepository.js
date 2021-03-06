const pool = require("../config/database.conf");

async function updateStatus(bookingId) {
  try {
    const res = await pool.query(
      "UPDATE booking SET status = 'COMPLETED' WHERE id = $1",
      [bookingId]
    );
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function getBookingForUser(userId) {
  try {
    const res = await pool.query("SELECT * FROM booking where user_id = $1", [
      userId,
    ]);
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function searchBookingAvailabality({ start, finish }) {
  try {
    const res = await pool.query(
      "SELECT * FROM route WHERE start = $1 AND finish = $2",
      [start, finish]
    );
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function addBooking(booking) {
  const { id, userId, routeId, price, status, date, seats } = booking;
  try {
    const res = await pool.query(
      "INSERT INTO Booking(id,user_id,route_id,price,status,date,seats) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [id, userId, routeId, price, status, date, seats]
    );
    return booking;
  } catch (error) {
    console.log(error);
    throw Error("Internal Server Error");
  }
}

module.exports = {
  addBooking,
  searchBookingAvailabality,
  getBookingForUser,
  updateStatus,
};
