import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
        //include 원하는 사용자 관계를 갖고 올 수 있게 해줌 (사용자가 적을때 사용)
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};
