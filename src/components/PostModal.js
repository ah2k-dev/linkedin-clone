import React, { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import styled from "styled-components";
import firebase from "firebase/compat";
import { uploadPostApi } from "../actions";
// import ReactPlayer from "react-player"
function PostModal(props) {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setshareImage] = useState("");
  const [shareVideo, setshareVideo] = useState("");
  const [assetArea, setassetArea] = useState("");
  // console.log(props.user);
  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not valid format. Format is ${typeof image}`);
      return;
    }
    setshareImage(image);
  };
  const switchArea = (area) => {
    setshareImage("");
    setshareVideo("");
    setassetArea(area);
  };
  const postArticle = (e) => {
    // console.log('post articlee working');
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      console.log("returns back");
      return;
    }
    const payload = {
      image: shareImage,
      video: shareVideo,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e);
  };
  const reset = (e) => {
    setshareImage("");
    setshareVideo("");
    setEditorText("");
    setassetArea("");
    props.handleClose();
  };
  return (
    <>
      {props.showModal && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/images/lclose.png" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                <img src={props.user.photoURL} />
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What you wanna talk about..."
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/jpeg, image/jpg, image/gif, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select image</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter link for video"
                        value={shareVideo}
                        onChange={(e) => setshareVideo(e.target.value)}
                      />
                      {shareVideo && (
                        <ReactPlayer width="100%" url={shareVideo} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedActions>
              <Attachassets>
                <AssetButton onClick={() => switchArea("image")}>
                  <img src="/images/lphoto.png" />
                </AssetButton>
                <AssetButton onClick={() => switchArea("media")}>
                  <img src="/images/llvideo.png" />
                </AssetButton>
              </Attachassets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/lcomments.png" />
                  Comment
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </PostButton>
            </SharedActions>
          </Content>
        </Container>
      )}
    </>
  );
}

const mapSateToProps = (state) => {
  return {
    user: state.userState,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(uploadPostApi(payload)),
});

export default connect(mapSateToProps, mapDispatchToProps)(PostModal);

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  color: black;
  background: rgba(0, 0, 0, 0.8);
  // display: none;
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  max-height: 80%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    cursor: pointer;
    img{
      width: 24px;

    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    line-height: 1.5;
    margin-left: 5px;
    font-size: 16px;
  }
`;
const SharedActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  img{
    width: 24px;
  }
`;
const Attachassets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 5px;
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: blue;
  color: white;
  &:hover {
    background-color: #004182;
    cursor: pointer;
  }
  &:disabled {
    background-color: black;
    color: #fefefe;
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    input {
      width: 100%;
      height: 35px;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
