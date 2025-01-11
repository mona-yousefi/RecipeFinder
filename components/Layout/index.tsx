import { Provider } from "react-redux";
import Navbar from "../Navbar";
import styles from "./layout.module.css";
import store from "../../src/redux/store"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = ({ children }: any) => {
  return (
    <div className={styles.nav}>
      <Navbar />
      <Provider store={store}>
            {children}
        </Provider>
    </div>
  );
};

export default Layout;
