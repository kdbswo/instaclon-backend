import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const searchedUsers = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      });
      const totalsearch = await client.user.count({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      return {
        searchedUsers,
        totalSearchPages: Math.ceil(totalsearch / 5),
      };
    },
  },
};
