import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AlbumIcon from "@mui/icons-material/Album";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

const Widget = ({ type }) => {
  let data;

  const thisWeekValue = (value) => {
    return value;
  };

  const diff = (lastWeekValue, thisWeekValue) => {
    return Math.floor((thisWeekValue - lastWeekValue) * 100);
  };

  switch (type) {
    case "artists":
      data = {
        title: "New Artist",
        value: thisWeekValue(30),
        diff: diff(30, 34),
        isMoney: false,
        link: "See All Artist",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "albums":
      data = {
        title: "New Albums",
        value: thisWeekValue(30),
        diff: diff(23, 26),
        isMoney: false,
        link: "See All Albums",
        icon: (
          <AlbumIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 65, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    case "earnings":
      data = {
        title: "EARNINGS",
        value: thisWeekValue(30),
        diff: diff(800, 900),
        isMoney: true,
        link: "View Earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "new-songs":
      data = {
        title: "New Songs",
        value: thisWeekValue(30),
        diff: diff(17, 15),
        isMoney: false,
        link: "See Details",
        icon: (
          <LibraryMusicIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.value}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.diff < 0 ? (
          <div className="percentage negative">
            <KeyboardArrowDownIcon />
            {data.diff}%
          </div>
        ) : (
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
            {data.diff}%
          </div>
        )}

        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
