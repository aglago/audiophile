import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <Button>SEE PRODUCT</Button>
      <Button variant={"outline"}>SEE PRODUCT</Button>
      <Button variant={"ghost"}>SEE PRODUCT</Button>

      <div>
        <label htmlFor="name">Name</label>
        <Input />
      </div>
      
      <div>
        <Input type="radio" className="shadow-none" />
        <label htmlFor="radio" className="">e-mail</label>
      </div>
    </div>
  );
}
