'use client'

import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '@/app/globals.css'

export default function RootCli({ children }) {

/*     useEffect(() => {
        require('bootstrap/dist/js/bootstrap.min.js');
    }, []); */

    return (
        <>
            {children}
        </>
    )
}