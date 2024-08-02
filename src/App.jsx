import React from "react";
import { createBrowserRouter, RouterProvider, useLocation, Routes, Route } from "react-router-dom";
import Books from "./Book-finder/Books";
import BookDetail from "./Book-finder/BookDetail";
import Page404 from "./Page404";
import { AnimatePresence } from "framer-motion";



const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Books />,
    },
    {
      path: "/bookDetail/:id",
      element: <BookDetail />,
    },
    {
      path: "/*",
      element: <Page404 />,
    },
  ],
  { basename: "/Books" }
);

function App() {
  return (
    <RouterProvider router={router}>
      <AppContent />
    </RouterProvider>
  );
}

function AppContent() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Books />} />
        <Route path="/bookDetail/:id" element={<BookDetail />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

