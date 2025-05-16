/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/sendEmail/route";
exports.ids = ["app/api/sendEmail/route"];
exports.modules = {

/***/ "(rsc)/./app/api/sendEmail/route.ts":
/*!************************************!*\
  !*** ./app/api/sendEmail/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   sendMail: () => (/* binding */ sendMail)\n/* harmony export */ });\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"(rsc)/./node_modules/nodemailer/lib/nodemailer.js\");\n\nconst transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0__.createTransport({\n    service: 'gmail',\n    auth: {\n        user: process.env.EMAIL_USER,\n        pass: process.env.EMAIL_PASS\n    },\n    tls: {\n        rejectUnauthorized: false\n    }\n});\nasync function sendMail({ name, email, message }) {\n    const mailOptions = {\n        from: process.env.EMAIL_USER,\n        replyTo: email,\n        to: process.env.EMAIL_USER,\n        subject: `Support message from ${name}`,\n        text: message\n    };\n    await transporter.sendMail(mailOptions);\n}\nasync function POST(request) {\n    try {\n        const { name, email, message } = await request.json();\n        if (!name || !email || !message) {\n            return new Response(JSON.stringify({\n                error: \"Missing fields\"\n            }), {\n                status: 400\n            });\n        }\n        await sendMail({\n            name,\n            email,\n            message\n        });\n        return new Response(JSON.stringify({\n            message: \"Email sent successfully\"\n        }), {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Email send error:\", error);\n        return new Response(JSON.stringify({\n            error: error.message || \"Failed to send email\"\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NlbmRFbWFpbC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBb0M7QUFFcEMsTUFBTUMsY0FBY0QsdURBQTBCLENBQUM7SUFDN0NHLFNBQVM7SUFDVEMsTUFBTTtRQUNKQyxNQUFNQyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7UUFDNUJDLE1BQU1ILFFBQVFDLEdBQUcsQ0FBQ0csVUFBVTtJQUM5QjtJQUNBQyxLQUFLO1FBQ0hDLG9CQUFvQjtJQUN0QjtBQUNGO0FBRU8sZUFBZUMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsT0FBTyxFQUFFO0lBQ3JELE1BQU1DLGNBQWM7UUFDbEJDLE1BQU1aLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVTtRQUM1QlcsU0FBU0o7UUFDVEssSUFBSWQsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBQzFCYSxTQUFTLENBQUMscUJBQXFCLEVBQUVQLE1BQU07UUFDdkNRLE1BQU1OO0lBQ1I7SUFFQSxNQUFNZixZQUFZWSxRQUFRLENBQUNJO0FBQzdCO0FBRU8sZUFBZU0sS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU0sRUFBRVYsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRSxHQUFHLE1BQU1RLFFBQVFDLElBQUk7UUFFbkQsSUFBSSxDQUFDWCxRQUFRLENBQUNDLFNBQVMsQ0FBQ0MsU0FBUztZQUMvQixPQUFPLElBQUlVLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQztnQkFBRUMsT0FBTztZQUFpQixJQUFJO2dCQUFFQyxRQUFRO1lBQUk7UUFDakY7UUFFQSxNQUFNakIsU0FBUztZQUFFQztZQUFNQztZQUFPQztRQUFRO1FBRXRDLE9BQU8sSUFBSVUsU0FBU0MsS0FBS0MsU0FBUyxDQUFDO1lBQUVaLFNBQVM7UUFBMEIsSUFBSTtZQUFFYyxRQUFRO1FBQUk7SUFDNUYsRUFBRSxPQUFPRCxPQUFZO1FBQ25CRSxRQUFRRixLQUFLLENBQUMscUJBQXFCQTtRQUNuQyxPQUFPLElBQUlILFNBQ1RDLEtBQUtDLFNBQVMsQ0FBQztZQUFFQyxPQUFPQSxNQUFNYixPQUFPLElBQUk7UUFBdUIsSUFDaEU7WUFBRWMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkI6XFxhaS1wb3J0Zm9saW8tYnVpbGRlclxcYXBwXFxhcGlcXHNlbmRFbWFpbFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XHJcblxyXG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcclxuICBzZXJ2aWNlOiAnZ21haWwnLFxyXG4gIGF1dGg6IHtcclxuICAgIHVzZXI6IHByb2Nlc3MuZW52LkVNQUlMX1VTRVIsIC8vIHlvdXIgR21haWwgYWRkcmVzc1xyXG4gICAgcGFzczogcHJvY2Vzcy5lbnYuRU1BSUxfUEFTUywgLy8geW91ciBhcHAgcGFzc3dvcmRcclxuICB9LFxyXG4gIHRsczoge1xyXG4gICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kTWFpbCh7IG5hbWUsIGVtYWlsLCBtZXNzYWdlIH0pIHtcclxuICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcclxuICAgIGZyb206IHByb2Nlc3MuZW52LkVNQUlMX1VTRVIsIC8vIEFsd2F5cyB1c2UgeW91ciB2ZXJpZmllZCBHbWFpbCBhcyBzZW5kZXIgdG8gYXZvaWQgcmVqZWN0aW9uXHJcbiAgICByZXBseVRvOiBlbWFpbCwgICAgICAgICAgICAgICAvLyBSZXBseS10byBpcyB0aGUgdXNlciBlbWFpbCB3aG8gc2VudCB0aGUgbWVzc2FnZVxyXG4gICAgdG86IHByb2Nlc3MuZW52LkVNQUlMX1VTRVIsICAgLy8gWW91ciBHbWFpbCB0byByZWNlaXZlIHN1cHBvcnQgZW1haWxzXHJcbiAgICBzdWJqZWN0OiBgU3VwcG9ydCBtZXNzYWdlIGZyb20gJHtuYW1lfWAsXHJcbiAgICB0ZXh0OiBtZXNzYWdlLFxyXG4gIH07XHJcblxyXG4gIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIGVtYWlsLCBtZXNzYWdlIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuXHJcbiAgICBpZiAoIW5hbWUgfHwgIWVtYWlsIHx8ICFtZXNzYWdlKSB7XHJcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogXCJNaXNzaW5nIGZpZWxkc1wiIH0pLCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IHNlbmRNYWlsKHsgbmFtZSwgZW1haWwsIG1lc3NhZ2UgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IFwiRW1haWwgc2VudCBzdWNjZXNzZnVsbHlcIiB9KSwgeyBzdGF0dXM6IDIwMCB9KTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRW1haWwgc2VuZCBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShcclxuICAgICAgSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBzZW5kIGVtYWlsXCIgfSksXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIm5vZGVtYWlsZXIiLCJ0cmFuc3BvcnRlciIsImNyZWF0ZVRyYW5zcG9ydCIsInNlcnZpY2UiLCJhdXRoIiwidXNlciIsInByb2Nlc3MiLCJlbnYiLCJFTUFJTF9VU0VSIiwicGFzcyIsIkVNQUlMX1BBU1MiLCJ0bHMiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJzZW5kTWFpbCIsIm5hbWUiLCJlbWFpbCIsIm1lc3NhZ2UiLCJtYWlsT3B0aW9ucyIsImZyb20iLCJyZXBseVRvIiwidG8iLCJzdWJqZWN0IiwidGV4dCIsIlBPU1QiLCJyZXF1ZXN0IiwianNvbiIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yIiwic3RhdHVzIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/sendEmail/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FsendEmail%2Froute&page=%2Fapi%2FsendEmail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FsendEmail%2Froute.ts&appDir=B%3A%5Cai-portfolio-builder%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=B%3A%5Cai-portfolio-builder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FsendEmail%2Froute&page=%2Fapi%2FsendEmail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FsendEmail%2Froute.ts&appDir=B%3A%5Cai-portfolio-builder%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=B%3A%5Cai-portfolio-builder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var B_ai_portfolio_builder_app_api_sendEmail_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/sendEmail/route.ts */ \"(rsc)/./app/api/sendEmail/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/sendEmail/route\",\n        pathname: \"/api/sendEmail\",\n        filename: \"route\",\n        bundlePath: \"app/api/sendEmail/route\"\n    },\n    resolvedPagePath: \"B:\\\\ai-portfolio-builder\\\\app\\\\api\\\\sendEmail\\\\route.ts\",\n    nextConfigOutput,\n    userland: B_ai_portfolio_builder_app_api_sendEmail_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzZW5kRW1haWwlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnNlbmRFbWFpbCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnNlbmRFbWFpbCUyRnJvdXRlLnRzJmFwcERpcj1CJTNBJTVDYWktcG9ydGZvbGlvLWJ1aWxkZXIlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUIlM0ElNUNhaS1wb3J0Zm9saW8tYnVpbGRlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDTztBQUNwRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQjpcXFxcYWktcG9ydGZvbGlvLWJ1aWxkZXJcXFxcYXBwXFxcXGFwaVxcXFxzZW5kRW1haWxcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3NlbmRFbWFpbC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3NlbmRFbWFpbFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc2VuZEVtYWlsL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQjpcXFxcYWktcG9ydGZvbGlvLWJ1aWxkZXJcXFxcYXBwXFxcXGFwaVxcXFxzZW5kRW1haWxcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FsendEmail%2Froute&page=%2Fapi%2FsendEmail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FsendEmail%2Froute.ts&appDir=B%3A%5Cai-portfolio-builder%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=B%3A%5Cai-portfolio-builder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/nodemailer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FsendEmail%2Froute&page=%2Fapi%2FsendEmail%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FsendEmail%2Froute.ts&appDir=B%3A%5Cai-portfolio-builder%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=B%3A%5Cai-portfolio-builder&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();