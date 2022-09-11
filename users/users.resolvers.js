import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          // 내 id를 자신의 팔로워 리스트에 가지고 있는 사람이 나의 팔로잉
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          // 팔로워는 자신의 팔로잉 리스트에 내 아이디가 있는 사람들
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      // 요청한 id와 로그인된 id가 같으면 true 아니면 false
      return id === loggedInUser.id;
    },
  },
};
