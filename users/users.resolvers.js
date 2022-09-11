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
    // user가 로그인 되어있는 사용자인지 확인
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      // 요청한 id와 로그인된 id가 같으면 true 아니면 false
      return id === loggedInUser.id;
    },
    // 로그인된 user의 팔로잉 유저인지 확인
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
};
