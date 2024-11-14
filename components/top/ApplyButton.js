import Button from "react-bootstrap/Button";

export default function ApplyButton({onClick}){
    return (
        <Button variant="secondary" className="me-2" onClick={onClick}>適用</Button>
    );
}