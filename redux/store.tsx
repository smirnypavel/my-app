import { configureStore, Reducer, Action } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { IAuthState } from "../types/IAuth";
import moderateReducer, { IModerateState } from "./moderator/moderateReducer";
import postsReducer from "./posts/postsReducer";
import { IPostState } from "../types/IPost";
import dealsReducer from "./deals/dealsReducer";
import { IDealsState } from "../types/IDeals";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn", "refreshToken"],
};

// Define explicit types for state and action
type AuthReducerType = Reducer<IAuthState & PersistPartial, Action<any>>;
type ModerateReducerType = Reducer<IModerateState, Action<any>>;
type PostReducerType = Reducer<IPostState, Action<any>>;
type DealsReducerType = Reducer<IDealsState, Action<any>>;

export const store = configureStore({
  reducer: {
    auth: persistReducer<IAuthState & PersistPartial, any>(
      authPersistConfig,
      authSlice.reducer as AuthReducerType
    ),
    moderate: moderateReducer as ModerateReducerType,
    post: postsReducer as PostReducerType,
    deal: dealsReducer as DealsReducerType,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
