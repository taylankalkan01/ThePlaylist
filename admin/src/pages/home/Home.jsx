import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TotalUser from "../../components/Dashboard/total-user/TotalUser";
import Chart from "../../components/Dashboard/chart/Chart";
import Widget from "../../components/Dashboard/widgets/Widget";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="artists" />
          <Widget type="albums" />
          <Widget type="earnings" />
          <Widget type="new-songs" />
        </div>
        <div className="charts">
          <TotalUser />
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Home;
