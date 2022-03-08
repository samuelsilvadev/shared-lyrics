import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const SongList = lazy(() => import("./views/SongList"));

function App() {
  return (
    <Suspense fallback="loading resources...">
      <Switch>
        <Route path="/" component={SongList} />
      </Switch>
    </Suspense>
  );
}

export default App;
