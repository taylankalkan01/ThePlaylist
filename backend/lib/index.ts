import app from "./app";
import { APP_PORT } from "./app";

app.listen(APP_PORT, () => {
  console.log("The Playlist is running on port: " + APP_PORT);
});
