import React, { useState } from 'react';
import Papa from 'papaparse';

const OrgChartValidator = () => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [fileSelected, setFileSelected] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setFileSelected(false);
            return;
        }

        setFileSelected(true);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setUsers(result.data);
                validateData(result.data);
            }
        });
    };

    const validateData = (data) => {
        let errorList = [];
        const userMap = new Map(data.map(user => [user.Email, user]));

        // Cycle detection: Build adjacency list
        const graph = new Map();
        data.forEach(user => {
            if (!graph.has(user.Email)) graph.set(user.Email, []);
            if (user.ReportsTo) {
                graph.get(user.Email).push(user.ReportsTo);
            }
        });

        // Cycle detection using DFS
        const visited = new Set();
        const stack = new Set();

        const hasCycle = (node) => {
            if (stack.has(node)) return true; // Cycle detected
            if (visited.has(node)) return false;

            visited.add(node);
            stack.add(node);

            for (let neighbor of graph.get(node) || []) {
                if (hasCycle(neighbor)) return true;
            }

            stack.delete(node);
            return false;
        };

        for (let user of data) {
            if (hasCycle(user.Email)) {
                errorList.push(`Cycle detected in hierarchy! User ${user.FullName} is part of a reporting cycle.`);
                break; // Stop further validation if cycle found
            }
        }

        // Role-based validation
        data.forEach(user => {
            if (user.Role === 'Root' && user.ReportsTo) {
                errorList.push(`${user.FullName} (Root) should not report to anyone.`);
            }
            if (user.Role === 'Admin' && userMap.get(user.ReportsTo)?.Role !== 'Root') {
                errorList.push(`${user.FullName} (Admin) should report only to Root.`);
            }
            if (user.Role === 'Manager' && !['Admin', 'Manager'].includes(userMap.get(user.ReportsTo)?.Role)) {
                errorList.push(`${user.FullName} (Manager) should report only to an Admin or another Manager.`);
            }
            if (user.Role === 'Caller' && userMap.get(user.ReportsTo)?.Role !== 'Manager') {
                errorList.push(`${user.FullName} (Caller) should report only to a Manager.`);
            }
        });

        setErrors(errorList);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Upload Org Chart CSV</h2>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mb-4 p-2 border rounded-lg cursor-pointer"
            />
            {!fileSelected && <p className="text-red-500">No file selected!</p>}
            <h3 className="text-xl font-semibold mt-4">Errors:</h3>
            {errors.length > 0 ? (
                <ul className="mt-2 p-4 bg-white shadow-md rounded-lg">
                    {errors.map((error, index) => (
                        <li key={index} className="text-red-600">
                            {error}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-green-600 mt-2">No errors found!</p>
            )}
        </div>
    );
};

export default OrgChartValidator;
