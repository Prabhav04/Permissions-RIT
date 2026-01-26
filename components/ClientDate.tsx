"use client";

import { useState, useEffect } from 'react';

const ClientDate = () => {
    const [dateStr, setDateStr] = useState('');

    useEffect(() => {
        setDateStr(new Date().toLocaleDateString('en-GB'));
    }, []);

    return <>{dateStr}</>;
};

export default ClientDate;
