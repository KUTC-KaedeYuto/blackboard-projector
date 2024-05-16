import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

export default function UserController({
  className = "position-absolute top-0 start-0 p-1",
  style = {
    background: "none",
    zIndex: 1000,
    width: "100%",
    maxWidth: "400px",
  },
  data = [{
    label: "",
    state: null,
    setState: null,
  }],
}) {
  return (
    <Container fluid className={className} style={style}>
      {data.map((d, i) => (
        <div key={`userController-${i}`}>
          <Form.Label>{d.label}</Form.Label>
          <Form.Range value={d.state} onChange={d.setState} />
        </div>
      ))}
    </Container>
  );
}


