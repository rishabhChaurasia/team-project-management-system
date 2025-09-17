import { useEffect } from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  useEffect(() => {
    document.title = `TeamFlow - ${title}`;

    return () => {
      document.title = "TeamFlow";
    };
  }, [title]);

  return null;
};

export default PageTitle;
