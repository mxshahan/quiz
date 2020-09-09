// import 'bootstrap/dist/css/bootstrap.min.css';
import "semantic-ui-css/semantic.min.css";
import "../assets/css/episode.css";
import "antd/dist/antd.css";
// import 'react-multi-carousel/lib/styles.css';
// import 'assets/css/fontawesome-all.css';
// import 'assets/css/flaticon.css';
// import 'assets/css/meanmenu.css';
// import 'assets/css/video.min.css';
// import 'assets/css/progess.css';
// import 'assets/css/animate.min.css';
// import '../assets/scss/style.scss';
// import 'react-perfect-scrollbar/dist/css/styles.css';
import "react-circular-progressbar/dist/styles.css";
import "../styles/lastpage.scss";

import "../styles/style.scss";
import { Provider } from "react-redux";
import store from "../store";

const OmniducateStudentApp = ({ Component, pageProps, reduxStore, org }) => {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

// const makeStore = () => store;

export default OmniducateStudentApp;
