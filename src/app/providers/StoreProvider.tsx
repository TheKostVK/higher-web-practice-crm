import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import {store} from "../redux";

type TStoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: TStoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
