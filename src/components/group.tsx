import { useEffect, useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { data } from "@/data/smallExample";

function Group() {
  const [allFields, setAllFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function getFields(parent: string, item: any) {
      if (!item) {
        return;
      }

      if (typeof item === "string" || typeof item === "number") {
        setAllFields((prev) => ({ ...prev, [parent]: true }));
        return;
      }

      if (Array.isArray(item)) {
        for (const subItem of item) {
          const newParent = parent ? `${parent}.[]` : "[]";
          return getFields(newParent, subItem);
        }
      }

      for (const key of Object.keys(item)) {
        const newParent = parent ? `${parent}.${key}` : key;
        getFields(newParent, item[key]);
      }
    }

    for (const item of data) {
      getFields("", item.response);
    }
  }, []);

  // useEffect(() => {
  //   const grouped = {};

  //   for (const item of defaultData) {
  //     let current = item;
  //     const field = 'info.address.city'.split('.');
  //     for (const key of field) {
  //       current = current[key];
  //     }
  //     grouped[current] = true;
  //   }

  //   console.log(Object.keys(grouped));
  // }, []);

  function walk(
    arr: any[],
    fields: string[],
    fieldIndex: number,
    grouped: Record<string, boolean>,
  ) {
    for (const item of arr) {
      let current = item;

      for (let idx = fieldIndex; idx < fields.length; idx++) {
        if (fields[idx] === "[]") {
          walk(current, fields, idx + 1, grouped);
          return;
        }
        current = current[fields[idx]];
      }

      grouped[current] = true;
    }
  }

  function groupBy(value: string) {
    const grouped = {};
    const fields = value.split(".");
    walk(data, fields, 0, grouped);
    console.log(Object.keys(grouped));
  }

  return (
    <div>
      <div>
        <Combobox
          options={Object.keys(allFields).map((field) => ({
            value: field,
            label: field,
          }))}
          callback={groupBy}
          className="min-w-2xl"
        />
      </div>
    </div>
  );
}

export { Group };
