import { createHashRouter, RouterProvider } from "react-router";
import routes from "@/routers/index";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queries/queryClient";
import { useState } from "react";
import { UserContext } from "./context";
const router = createHashRouter(routes);

function App() {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          buttonPosition="bottom-left"
          initialIsOpen={false}
        />
        <UserContext
          value={{
            userInfo,
            setUserInfo,
          }}
        >
          <RouterProvider router={router} />
        </UserContext>
      </QueryClientProvider>
    </>
  );
}

export default App;
