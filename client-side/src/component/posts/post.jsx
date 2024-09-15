import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { updatePost, setFriends } from "../../state/index.jsx";
import { Comment } from "./comment.jsx";
import { GetUserPost } from "../../hooks/getUserHook.jsx";
import { FollowUser } from "../../hooks/addFriendHook.jsx";
import { TiTick } from "react-icons/ti";
import { FormatTime } from "../../utils/formatDate.js";

export const Post = ({ post }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlice.user._id);
  const mode = useSelector((state) => state.userSlice.mode);
  const [seeMore, setSeeMore] = useState(false);
  const [instantLike, setInstantLike] = useState(null);
  const isLiked = Boolean(post.likes[userId]);
  const likeCount = Object.keys(post.likes).length;
  const frnds = useSelector((state) => state.userSlice.user.friends);
  // console.log(frnds)
  // console.log(frnds.friends)

  const getUserpost = GetUserPost(); //to get user posts
  const followUser = FollowUser(); // to add/remove friend

  const likePost = async (postId) => {
    try {
      setInstantLike(!isLiked)
      const res = await fetch(`https://socialera.us.to/post/like/${postId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: userId }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(updatePost({ post: data }));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div
      id={mode ? "darkPost" : ""}
      className="w-full bg-white rounded-lg my-2 max-md:my-5 py-[5px] mt-3 shadow-md border-[1px]"
    >
      <div className="w-full" key={post._id}>
        <div className="flex font-medium text-[17px] hover:cursor-pointer items-start">
          <img
            onClick={() => getUserpost(post.userId)}
            src={`https://socialera.us.to/streamId/${post.userId.userPic}`}
            className="post-profile-pic"
            alt="Post"
          />
          <div
            onClick={() => getUserpost(post.userId)}
            className="pl-[5px] flex flex-col hover:cursor-pointer"
          >
            <div className="hover:underline">{post.fullname}</div>
            <div className="text-[13px]">
              {FormatTime(new Date(post.createdAt))}
            </div>
          </div>
          {frnds.friends &&
          frnds.friends.some(
            (friend) => friend._id === post.userId._id || friend._id === userId
          ) ? (
            <div
              id={mode ? "darkFollow" : ""}
              onClick={() => {
                followUser(post.userId._id);
              }}
              className="pl-[5px] text-[17px] flex items-center
                 text-gray-500 hover:underline"
            >
              •Following <TiTick />
            </div>
          ) : (
            <div
              onClick={() => {
                followUser(post.userId._id);
              }}
              className="pl-[5px] text-[17px]
                text-blue-400 hover:underline"
            >
              •Follow
            </div>
          )}
        </div>
        <p
          className={`pl-[6px] pb-[5px] font-poppins 
              font-medium max-md:mb-1 mt-2 ${
                seeMore ? `` : `max-h-[20vh] overflow-hidden`
              }`}
        >
          {post.description}
        </p>
        {(post.description && post.description.length > 50) || seeMore ? (
          <div
            className={`font-montserrat ${mode?`text-blue-300`:`text-indigo-600` } hover:text-indigo-400 font-medium 
             cursor-pointer `}
            onClick={() => setSeeMore(!seeMore)}
          >
            {seeMore ? <>See less</> : <>See more</>}
          </div>
        ) : null}
        {post.postPicturePath && post.postPicturePath.contentType ? (
          post.postPicturePath.contentType === "image/png" ||
          post.postPicturePath.contentType === "image/jpeg" ||
          post.postPicturePath.contentType === "image/webp"? (
            <img
              src={`https://socialera.us.to/stream/${post.postPicturePath.filename}`}
              className="postPic"
              alt="Post"
            />
          ) : post.postPicturePath.contentType === "video/mp4" ? (
            <video
              src={`https://socialera.us.to/stream/${post.postPicturePath.filename}`}
              className="postPic"
              controls
            ></video>
          ) : (
            <div>Unsupported content type</div>
          )
        ) : null}
        <div className="flex pt-[5px]">
          <div
            className="flex text-[26px] hover:bg-gray-300 py-[6px] transition-all rounded-lg 
                font-medium hover:cursor-pointer text-gray-500 px-[8px]"
            onClick={() => likePost(post._id)}
          >
            {isLiked || instantLike ? (
              <GoHeartFill className="text-red-500 " />
            ) : (
              <GoHeart id={mode ? "darkLike" : ""} />
            )}
            <div
              className="text-[18px] px-1 text-gray-500"
              id={mode ? "darkLike" : ""}
            >
              {" "}
              {likeCount}
            </div>
          </div>
          <div>
            <Comment post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};
