const axios = require('axios');

const GCP_ENDPOINT_URL = 'https://language.googleapis.com/v1beta2/documents:classifyText?key=AIzaSyCjmTGnC5L82d6aCGPkZOe2x6HamYoPbzw';
const UPDATE_ENDPOINT_URL = 'https://a42hfubjdc.execute-api.us-east-1.amazonaws.com/prod/questions';

exports.handler = async (event) => {
    const { question: questionData } = event;

    if (!questionData || !questionData.question_id || !questionData.question) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Question data or Question ID is missing" }),
        };
    }

    const question = questionData.question;
    const question_id = questionData.question_id;
    const options = questionData.options;
    const correct_answer = questionData.correct_answer;
    const difficulty_level = questionData.difficulty_level;
    const category = questionData.category;

    console.log("Received Options:", options);
    console.log("Received Correct Answer:", correct_answer);
    console.log("Received Difficulty Level:", difficulty_level);
    console.log("Received Category:", category);

    try {
        const gcpResponse = await axios.post(GCP_ENDPOINT_URL, {
            document: {
                type: "PLAIN_TEXT",
                content: question
            }
        });

        console.log("Google NLP Response:", JSON.stringify(gcpResponse.data));

        if (!gcpResponse.data || !gcpResponse.data.categories || gcpResponse.data.categories.length === 0) {
            throw new Error("Failed to fetch category from NLP");
        }

        let category = gcpResponse.data.categories[0].name;

        if (category.includes('/')) {
            category = category.split('/')[1];
        }

        const updatePayload = {
            question_id: question_id,
            category: category,
            question: question,
            options: options,
            correct_answer: correct_answer,
            difficulty_level: difficulty_level
        };

        console.log("Sending Update payload:", updatePayload);

        const updateResponse = await axios.patch(`${UPDATE_ENDPOINT_URL}/${question_id}`, updatePayload, {
            headers: {
                'Content-Type': 'application/json', 
            }
        });

        console.log("Update Table Response:", JSON.stringify(updateResponse.data));

        return {
            statusCode: updateResponse.status,
            body: JSON.stringify(updateResponse.data),
        };

    } catch (error) {
        console.error("Error encountered:", error.message);
        if (error.response) {
            console.error("API Error response:", {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data 
            });
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
