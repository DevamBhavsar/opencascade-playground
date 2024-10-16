import { initOpenCascade } from "opencascade.js";
import { useEffect, useState } from "react";

export default function OpenCascadeComponent({ code, setResult }) {
  const [oc, setOc] = useState(null);

  useEffect(() => {
    initOpenCascade().then((ocInstance) => {
      setOc(ocInstance);
    });
  }, []);

  useEffect(() => {
    if (oc && code) {
      try {
        // eslint-disable-next-line
        const shape = eval(`(() => { ${code} })()`);
        if (shape instanceof oc.TopoDS_Shape) {
          setResult("3D model generated successfully");
          // Here you would typically convert the shape to a format that ThreeJSRenderer can use
        } else {
          setResult("The code did not return a valid OpenCascade shape");
        }
      } catch (error) {
        setResult(`Error: ${error.message}`);
      }
    }
  }, [oc, code, setResult]);

  return null;
}
