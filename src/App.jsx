import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DarkModeProvider } from "./context/DarkModeContext";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyles";
import CustomToaster from "./ui/CustomToaster";
import NotAuthorized from "./ui/NotAuthorized";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />

        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Router />} />
            <Route path="login" element={<Login />} />
            <Route path="not-authorized" element= {<NotAuthorized/>}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <CustomToaster />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
