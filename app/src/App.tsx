import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const SongList = lazy(() => import("./views/SongList"));
const NewSong = lazy(() => import("./views/NewSong"));
const SongDetails = lazy(() => import("./views/SongDetails"));

function App() {
  return (
    <Suspense fallback="loading resources...">
      <Switch>
        <Route path="/" exact component={SongList} />
        <Route path="/songs/new" exact component={NewSong} />
        <Route path="/songs/:id" exact component={SongDetails} />
      </Switch>
    </Suspense>
  );
}

export default App;
