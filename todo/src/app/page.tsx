
import TodoList from "./components/TodoList"


export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-secondary to-primary h-screen flex justify-center items-center ">
      <div className="px-3 py-4 rounded-xl bg-gradient-to-br from-white/50 to-white/30 backdrop w-full max-w-md  ">
    
        <TodoList/>
    
        <div className="w-1/2 h-1.5 bg-black/80 rounded mx-auto mt-6">

        </div>

      </div>
    </main>
  );
}
