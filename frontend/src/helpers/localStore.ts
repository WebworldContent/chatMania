type LocalUser = {
    email: string,
    token: string
}

const useLocalStore = () => {
  const setToLocal = (data: LocalUser) => {
    window.localStorage.setItem("data", JSON.stringify(data));
  };

  const getLocalItem = (key: string) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  };

  return { setToLocal, getLocalItem };
};

export default useLocalStore;
