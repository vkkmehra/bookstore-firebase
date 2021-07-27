import firebase from "../firebase";
const db = firebase.firestore().collection("books");

class BookDataService {
  async getAll() {
    return await db.get();
  }

  async get(id) {
    if (id.toString() !== "") {
      let ids = id.split(",").map(item => item.toString())
      return await db.where(firebase.firestore.FieldPath.documentId(), "in", ids).get()
    }
  }

  create(book) {
    return db.doc().set(book);
  }

  update(key, value) {
    return db.doc(key).set(value);
  }

  delete(key) {
    debugger
    return db.doc(key).delete();
  }

}

export default new BookDataService();