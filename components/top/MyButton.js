import Button from "react-bootstrap/Button";
import '@/app/globals.scss'

export default function MyButton({variant, fontSize, color, children}){
    return(
        <Button variant={variant} style={{
            fontSize: `${fontSize}px`,
            color
        }}>{children}</Button>
    );
}