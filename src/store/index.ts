import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/login-page/slice";
import homeReducer from "../pages/home-page/slice";
import detailQuestionReducer from "../pages/detail-question-page/slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
    detailQuestion: detailQuestionReducer,
  },
});

const rootReducer = combineReducers({
  login: loginReducer,
  home: homeReducer,
  detailQuestion: detailQuestionReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
