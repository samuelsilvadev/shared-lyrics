import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const SongList = lazy(() => import("./views/SongList"));
const NewSong = lazy(() => import("./views/NewSong"));

function App() {
  return (
    <Suspense fallback="loading resources...">
      <Switch>
        <Route path="/" exact component={SongList} />
        <Route path="/songs/new" exact component={NewSong} />
      </Switch>
    </Suspense>
  );
}

export default App;
