const endpoints = {
  auth: {
    login: "v1/users/login",
    logout: "v1/users/logout",
    checkAuthentication: "v1/users/check-authentication",
  },
  medicines: {
    list: "v1/medicines",
    details: (id: string) => `v1/medicines/${id}`,
  },
  users: {
    invite: "v1/users/invite-user",
    list: "v1/users",
    singleUser: (userId: string) => `v1/users/${userId}`,
  },
  branches: {
    list: "v1/branches",
    create: "v1/branches",
    delete: (branchId: string) => `v1/branches/${branchId}`,
    pharmacyLocation: "/v1/pharmacies/getPharmacyLocation",
  },
};
export default endpoints;
