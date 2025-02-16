import { Button } from "@/components/ui/button";

const HeaderEnd = () => {
  return (
    <div className="sm:ml-auto">
      <a href="#contactSection">
        <Button className="px-4 py-2 sm:px-7 sm:py-2.5 bg-primary text-white font-medium rounded-lg transition-all hover:bg-primary/80">
          Hire Me
        </Button>
      </a>
    </div>
  );
};

export default HeaderEnd;
