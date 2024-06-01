import { Todo } from "@/lib/drizzle";

const Data = async (): Promise<{ Data: Todo[] }> => {
    try {
        const res = await fetch("http://localhost:3000/api/todo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch Data");
        }

        const result: Todo[] = await res.json();
        console.log('Fetched Data:', result);  // Log the fetched data

        return { Data: result };
    } catch (err) {
        console.error('Error fetching data:', err);
        return { Data: [] }; // Return an empty array in case of error
    }
};

export default Data;
