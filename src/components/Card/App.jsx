import { cn } from "../../../lib/utils";

export function CardDemo() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <div
        className={cn(
          "group w-full h-full cursor-pointer overflow-hidden relative rounded-md shadow-xl flex flex-col justify-end p-8 border border-transparent dark:border-neutral-800",
          "bg-[url('https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80')] bg-cover bg-center",
          "before:bg-[url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif')] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
          "hover:bg-[url('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif')]",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500"
        )}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-2xl md:text-4xl text-gray-50">
            Background Overlays
          </h1>
          <p className="font-normal text-base md:text-lg text-gray-50 mt-4">
            This card is designed with responsive elements, displaying background
            GIFs on hover for an engaging user experience across all devices.
          </p>
        </div>
      </div>
    </div>
  );
}
