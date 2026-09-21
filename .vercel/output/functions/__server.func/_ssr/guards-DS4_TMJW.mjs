//#region node_modules/.nitro/vite/services/ssr/assets/guards-DS4_TMJW.js
var DEV_BLOCK = "Mock/dev authorization is disabled for Crayons Bridge";
function assertNotDevUser(userId) {
	if (userId === "dev-user") throw new Error(DEV_BLOCK);
}
//#endregion
export { assertNotDevUser as t };
