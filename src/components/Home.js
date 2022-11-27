import AddNote from "./AddNote"
import Notes from "./Notes"

const Home = (props) => {
  return (
    <div className="container">
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
