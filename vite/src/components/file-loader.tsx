import { useRequestStore } from "@/store";

export function FileLoader() {
  const loadFile = useRequestStore((state) => state.loadFile);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    try {
      const content = await new Promise<string>((resolve, reject) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
      loadFile(file.name, JSON.parse(content));
    } catch (error) {
      console.error("Error reading or parsing file:", error);
    }
  }

  return <input type="file" onChange={onChange} />;
}
