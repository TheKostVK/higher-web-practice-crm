import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {AntdProvider, StoreProvider, RouterProvider} from "./app";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AntdProvider>
          <StoreProvider>
              <RouterProvider />
          </StoreProvider>
      </AntdProvider>
  </StrictMode>,
)
