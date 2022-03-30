import { useEffect, useState } from "react";

const darkTheme = () => {
  document.documentElement.style.setProperty("--bg-color", "#001E3C");
  document.documentElement.style.setProperty("--text-color", "#fff");
  document.documentElement.style.setProperty("--light-color", "#ff7961");
  document.documentElement.style.setProperty("--main-color", "#f44336");
  document.documentElement.style.setProperty("--dark-color", "#ba000d");
  document.documentElement.style.setProperty("--text-contrast", "#373737");
};

const lightTheme = () => {
  document.documentElement.style.setProperty("--bg-color", "#FFE1C3");
  document.documentElement.style.setProperty("--text-color", "#373737");
  document.documentElement.style.setProperty("--light-color", "#757ce8");
  document.documentElement.style.setProperty("--main-color", "#3f50b5");
  document.documentElement.style.setProperty("--dark-color", "#002884");
  document.documentElement.style.setProperty("--text-contrast", "#fff");
};

export default () => {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
    // todo: save theme to localstorage for persistence
    if (theme) {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  useEffect(() => {
    toggleTheme();
  }, []);

  return <></>;
};
