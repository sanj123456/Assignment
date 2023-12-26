import { Container } from "react-bootstrap";
import Router from "./routes/Router";

function App() {

  return (
    <div className="app">
      <Container className="h-100">
        <Router />
      </Container>
    </div >
  )
}

export default App;
