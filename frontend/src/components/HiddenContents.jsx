import AddNoteBtn from "./AddNoteBtn"
import LoginBtn from "./LoginBtn"

const HiddenContents = ({logged}) => {
  return (
    <div className="sm:hidden flex justify-center p-3 mt-2 mb-4 bg-base-200">
      <AddNoteBtn />
      {logged ? <LoginBtn type={"out"} /> : <LoginBtn />}
    </div>
  )
}

export default HiddenContents
