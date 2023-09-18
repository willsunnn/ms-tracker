import CharactersPreview from '../../resources/about/characters-preview.png'
import TodoPreview from '../../resources/about/todo-preview.png'
import OverviewPreview from '../../resources/about/overview-preview.png'

export const PagePreview = () => {
  return (<div className="flex flex-col w-full h-fit items-center justify-center py-20">
    <div className="max-w-lg h-fit text-center text-xl w-1/3 mb-4">
      View your tasks by character, by due date, or in a compact spreadsheet-like form
    </div>
    <div className="carousel w-1/3 my-4">
      <div id="characters" className="carousel-item w-full -mt-72 pt-72">
        <img src={CharactersPreview} className="w-full" />
      </div>
      <div id="todo" className="carousel-item w-full -mt-72 pt-72">
        <img src={TodoPreview} className="w-full" />
      </div>
      <div id="overview" className="carousel-item w-full -mt-72 pt-72">
        <img src={OverviewPreview} className="w-full" />
      </div>
    </div>
    <div className="flex justify-center w-full py-2 gap-2">
      <a href="#characters" className="btn btn-sm">By Character</a>
      <a href="#todo" className="btn btn-sm">By Due Date</a>
      <a href="#overview" className="btn btn-sm">Overview</a>
    </div>
  </div>)
}
