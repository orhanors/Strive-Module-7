/**
 * MIDDLEWARE is a piece of code that gets executed after an action is dispatched and
 * before it reaches the root reducer
 */

/**
 * store: {dispatch,getState}
 * next: function (next function in our middleware pipeline,if there is no function it goes to reducer)
 * action: action represent next dispatch
 */

export const logger = (store) => (next) => (action) => {
	console.log("store", store);
	console.log("next", next);
	console.log("action", action);
	next(action); //if this part is missing, middlewares stays here reducer wont work
};

export const middWithParam = (param) => (state) => (next) => (action) => {
	console.log("param: ", param);
	next(action);
};
