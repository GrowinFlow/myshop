import { useLayoutEffect } from "react";

function PageTitle ({title}) {
  useLayoutEffect(() => {
    if (title) {
      document.title = `${title} | Shop`;
    }
  }, [title]);
};

export default PageTitle;