// This component is not in use
import React, { useEffect } from "react";
import firebase from "../../firebase";


// const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || api_key});
const storage = firebase.storage();
const db = firebase.firestore();
// const db = app.firestore();

function Upload() {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers] = React.useState([]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    // const fileUrl = await fileRef.getDownloadURL();
    setFileUrl(await fileRef.getDownloadURL());
  };



  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection("users").get();
      setUsers(
        usersCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchUsers();
  }, []);

  return (
    <>
      <form >
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" placeholder="NAME" />
        <button>Submit</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.name}>
              <img width="100" height="100" src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Upload;