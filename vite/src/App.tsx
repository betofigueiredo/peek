import { useRequestStore } from "@/store";
import { FileLoader } from "@/components/file-loader";
import { RequestsList } from "@/components/requests-list";
import { RequestView } from "@/components/request-view";
import { Filters } from "@/components/filters";
import { Graph } from "@/components/graph";
import { NavBar } from "@/components/nav-bar";

function App() {
  const fileName = useRequestStore((state) => state.fileName);

  if (!fileName) {
    return <FileLoader />;
  }

  return (
    <div>
      <NavBar />
      <div className="bg-(--secondary-background) border-b border-(--panel-border)">
        <div className="container m-auto pt-12">
          <h1 className="font-title font-semibold text-3xl">Requests</h1>
          <Filters />
          <Graph />
        </div>
      </div>
      <RequestsList />
      <RequestView />
    </div>
  );
}

export default App;
