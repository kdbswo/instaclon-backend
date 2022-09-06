import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        }; // 유저가 존재하는지 체크
      }
      const following = await client.user
        .findUnique({
          where: { username },
        })
        .following({
          take: 5,
          skip: lastId ? 1 : 0, // lastId가 존재한다면 하나를 스킵, 아닐경우 0 스킵
          ...(lastId && { cursor: { id: lastId } }),
        }); // cursor pagination
      return {
        ok: true,
        following,
      };
    },
  },
};
