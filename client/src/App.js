import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Pets from './components/Pets';
import PetForm from './components/PetForm'
import OnePet from './components/OnePet';
import EditForm from './components/EditForm';

function App() {
  return (
    <div className="App">
      <h1>Pet Shelter</h1>
      <BrowserRouter>
          <Switch>
              <Route exact path="/">
                  <Pets></Pets>
              </Route>
              <Route exact path="/pets/new">
                  <PetForm></PetForm>
              </Route>
              <Route exact path="/pets/:_id">
                <OnePet></OnePet>
              </Route>
              <Route exact path="/pets/edit/:_id">
                <EditForm></EditForm>
              </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
