import "./totalUser.scss";
import "react-circular-progressbar/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";

const TotalUser = () => {
  return (
    <div className="totalUser">
      <div className="top">
        <h1 className="title">Total User</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <span className="achieved">Weekly Target Achieved: </span>
        <div className="userBar">
          <CircularProgressbar value={23} text={"23%"} strokeWidth={5} />
        </div>
        <p className="title">New Users for today:</p>
        <p className="data">500</p>
      </div>
    </div>
  );
};

export default TotalUser;
