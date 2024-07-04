import Form from 'react-bootstrap/Form';
import { forwardRef, useState } from 'react';


const LabeledRange = forwardRef(_LabeledRange);
export default LabeledRange;

function _LabeledRange({min, max, step, defaultValue, onChange=() => {}}, ref){
    const [val, setVal] = useState(defaultValue);
    return (
        <div className="mx-2">
            <Form.Range ref={ref} min={min} max={max} step={step} defaultValue={defaultValue}
                    onChange={(e) => {
                        setVal(+e.target.value);
                        onChange();
                    }}
                />
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "80%"
            }}>
                <span style={{
                    color:"#aaa"
                }}>
                    {
                        min !== undefined ? min : ""
                    }
                </span>
                <span>
                    {
                        val
                    }
                </span>
                <span style={{
                    color:"#aaa"
                }}>
                    {
                        max !== undefined ? max : ""
                    }
                </span>
            
            </div>
            
        </div>
    );
}