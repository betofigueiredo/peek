import { useRequestStore } from "@/store";
import { FileLoader } from "@/components/file-loader";
import { SearchInput } from "@/components/search-input";
import { RequestsList } from "@/components/requests-list";
import { StatusInput } from "@/components/status-input";

function App() {
  const fileName = useRequestStore((state) => state.fileName);

  if (!fileName) {
    return <FileLoader />;
  }

  return (
    <>
      <h1 className="text-2xl">Hello</h1>
      <div>
        <SearchInput />
        <StatusInput />
      </div>
      <RequestsList />
    </>
  );
}

export default App;
