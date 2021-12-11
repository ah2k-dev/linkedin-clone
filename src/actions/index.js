import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import { SET_USER, SET_LOADING, GET_POSTS } from "./actionTypes";
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});
export const setLoading = (status) => ({
  type: SET_LOADING,
  status: status,
});
export const getPosts = (payload) => ({
  type: GET_POSTS,
  payload: payload,
});
export function signInApi() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        // console.log(payload);
        dispatch(setUser(payload.user));
      })
      .catch((err) => alert(err.message));
  };
}
export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}
export function signOutApi() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        // console.log();
        dispatch(setUser({}));
      })
      .catch((err) => alert(err.message));
  };
}

export function uploadPostApi(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image != "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress: ${progress}`);
          if (snapshot.state === "running") {
            console.log(`Progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: "",
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      db.collection("articles").add({
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}
export function getPostsApi() {
  return (dispatch) => {
    let payload;
    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        // console.log(payload);
        dispatch(getPosts(payload));
      });
  };
}
