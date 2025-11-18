import { useRequestStore, type RawRequest } from "@/store";
import { Upload, FileJson, Sparkles } from "lucide-react";
import { useState } from "react";
import exampleData from "@/example-data.json";

export function FileLoader() {
  const loadFile = useRequestStore((state) => state.loadFile);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
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
      setError(
        "Failed to read or parse the file. Please ensure it's a valid JSON file.",
      );
    }
  }

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    await handleFile(file);
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  async function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await handleFile(file);
  }

  async function loadExampleFile() {
    setError(null);
    try {
      loadFile("example-data.json", exampleData as RawRequest[]);
    } catch (error) {
      console.error("Error loading example file:", error);
      setError("Failed to load example file.");
    }
  }

  return (
    <div className="container m-auto pt-14 px-4 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 font-title">
          Upload Your JSON File
        </h1>
        <p className="text-lg opacity-50">
          Analyze and inspect HTTP requests with ease
        </p>
      </div>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 transition-all duration-200
          ${
            isDragging
              ? "border-gray-400 bg-gray-50 dark:bg-gray-800/20 scale-[1.02]"
              : "border-border hover:border-gray-400 hover:bg-accent/30"
          }
        `}
      >
        <input
          type="file"
          onChange={onChange}
          accept=".json,.har"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />

        <div className="flex flex-col items-center justify-center text-center space-y-4 pointer-events-none">
          <div
            className={`
            p-4 rounded-full transition-all duration-200
            ${
              isDragging
                ? "bg-gray-500 text-white scale-110"
                : "bg-accent text-muted-foreground"
            }
          `}
          >
            <Upload className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <p className="text-xl font-semibold">
              {isDragging ? "Drop your file here" : "Drop your file here"}
            </p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/50 px-4 py-2 rounded-full">
            <FileJson className="w-4 h-4" />
            <span>Supports .json files</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg blur opacity-25"></div>
          <button
            onClick={loadExampleFile}
            className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            <span>Try Example File</span>
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Your files are processed locally and never uploaded to any server</p>
      </div>
    </div>
  );
}
