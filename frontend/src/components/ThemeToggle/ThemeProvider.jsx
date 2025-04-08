import { createContext, useState } from "react";
export const Themecontext = createContext(true);

function ThemeProvider({ children }) {
  const [lightTheme, setlightTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme !== "dark" : true;
  });
  return (
    <>
      <Themecontext.Provider value={[lightTheme, setlightTheme]}>
        {children}
      </Themecontext.Provider>
    </>
  );
}

export default ThemeProvider;
