import { connect } from "react-redux";
import styled from "styled-components";
import PostModal from "./PostModal";
import { useState } from "react";
const Main = (props) => {
  const [showModal, setshowModal] = useState(false);
  const handleOpen = () => {
    setshowModal(true);
  };
  const handleClose = () => {
    setshowModal(false);
    // console.log(showModal);
  };
  return (
    <Container>
      <ShareBox>
        <div>
          <img src={props.user.photoURL} />
          <button onClick={handleOpen}>Share a post....</button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon1.png" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.png" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon1.png" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon1.png" />
            <span>Write Article</span>
          </button>
        </div>
      </ShareBox>
      <div>
        <Article>
          <SharedActor>
            <a>
              <img src="/images/user.svg" />
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src="/images/elipsis.png" />
            </button>
          </SharedActor>
          <Description>Descripton</Description>
          <SharedImg>
            <img src="/images/shared-image.jpg" />
          </SharedImg>
          <SocialCounts>
            <li>
              <button>
                <img src="/images/like1.png" />
                <img src="/images/comment.png" />
                <span>75</span>
              </button>
            </li>
            <li>
              <a>2 Comments</a>
            </li>
          </SocialCounts>
          <SocialActions>
            <button>
              <img src="/images/like1.png" />
              <span>Like</span>
            </button>
            <button>
              <img src="/images/comment.png" />
              <span>Comment</span>
            </button>
            <button>
              <img src="/images/share.png" />
              <span>Share</span>
            </button>
            <button>
              <img src="/images/send.png" />
              <span>Send</span>
            </button>
          </SocialActions>
        </Article>
      </div>
      <PostModal showModal={showModal} handleClose={handleClose} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  margin: 0 0 8px;
  color: #958b7b;
  background: white;
  div {
    img {
      width: 25px;
      margin: 4px;
    }
    button {
      outline: none;
      color: rgba(0 0 0 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      &:hover {
        cursor: pointer;
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        padding-left: 16px;
        background: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bootom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      height: 48px;
      width: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  img {
    width: 24px;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    background: transparent;
    outline: none;
    border: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  text-align: left;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  background: #faf9fb;
  position: relative;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  // justify-content: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e6df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      img {
        width: 16px;
      }
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    color: #0a66c2;
    padding: 8px;
    img {
      width: 24px;
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState,
  };
};
export default connect(mapStateToProps)(Main);
