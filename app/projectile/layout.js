'use client'

import { useState, useContext, createContext } from "react";
import { Button, Form, Container } from 'react-bootstrap';
import { ContextShowMenu } from '@/app/layout';

export const ShowUIContext = createContext(null);

export default function Layout({ children }) {
    const [showGraph, setShowGraph] = useState(true);
    const { setShowMenu } = useContext(ContextShowMenu);

    return (
        <>
            <ShowUIContext.Provider value={{showGraph}}>
                <div className="d-flex align-items-center">
                    <div className="p-2 m-2">
                        <Button variant='outline-secondary' className='ml-2' onClick={() => { setShowMenu(true) }}>メニューを表示</Button>
                    </div>
                    <Form>
                        <Form.Label>グラフを表示</Form.Label>
                        <Form.Switch defaultChecked onChange={() => {
                            setShowGraph(!showGraph);
                            console.log(showGraph);
                        }} />
                    </Form>
                </div>
                {children}
            </ShowUIContext.Provider>
        </>
    );
}