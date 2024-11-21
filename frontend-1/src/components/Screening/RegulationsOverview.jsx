//import { useEffect, useState } from 'react';

const RegulationsOverview = () => {
    {/*
    const [crawlerData, setCrawlerData] = useState(null);

    useEffect(() => {
        // Placeholder: Fetch from the Django backend in the future
        fetch('/api/dffe-crawl')  // Placeholder URL
            .then(response => response.json())
            .then(data => setCrawlerData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    */}

    const crawlerData = {
        "eia": {
            "title": "Environmental Impact Assessment for Proposed Solar Power Plant",
            "date": "2021-07-15",
            "location": "Nairobi, Kenya",
            "description": "This is an EIA report for a proposed solar power plant in Nairobi, Kenya. The report covers the environmental impacts of the project and mitigation measures.",
            "link": "https://example.com/eia-report"
        },
        "public_comments": [
            {
                "date": "2021-07-20",
                "comment": "This is a public comment on the EIA report for the proposed solar power plant. The commenter raises concerns about the impact on local wildlife and suggests additional mitigation measures."
            },
            {
                "date": "2021-07-22",
                "comment": "This is another public comment on the EIA report. The commenter supports the project and highlights the benefits of renewable energy."
            }
        ]
    };

    return (
        <div>
            <h2>EIA Regulations</h2>
            {crawlerData ? (
                <div>
                    <h3>Relevant EIA Information:</h3>
                    <pre>{JSON.stringify(crawlerData, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading EIA information...</p>
            )}
        </div>
    );
};

export default RegulationsOverview;
