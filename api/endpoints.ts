const endpoints = {
  auth: {
    login: "v1/users/login",
    checkAuthentication: "v1/users/checkAuthentication",
  },
  users: {
    invite: "v1/users/invite-user",
    list: "v1/users",
    singleUser: (userId: string) => `v1/users/${userId}`,
  },
  branches: {
    list: "https://my-json-server.typicode.com/typicode/demo/posts",
    pharmacyLocation: "/v1/pharmacies/getPharmacyLocation",
  },
};
export default endpoints;
