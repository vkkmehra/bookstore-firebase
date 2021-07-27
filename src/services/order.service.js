import firebase from "../firebase";
const db = firebase.firestore().collection("orders");

class OrderDataService {
  async getAll() {
    return await db.get();
  }

  async create(order) {
    return await db.doc().set(order);
  }
}

export default new OrderDataService();