import os
import google.generativeai as genai
from typing import List
import json

# Import your Pydantic schema to help with data formatting
from . import schemas

# Configure the Gemini client with your API key
try:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel('gemini-1.5-flash')
except Exception as e:
    print(f"Error configuring Gemini: {e}")
    model = None

def get_ai_insights(query: str, events: List[schemas.QMSEvent]) -> str:
    """
    Takes a user's query and a list of QMS events, formats them into a prompt,
    and gets insights from the Gemini model.
    """
    if not model:
        return "Error: Gemini model is not configured. Please check your API key."

    # Convert the list of event objects into a simplified JSON string for the prompt
    # This gives the AI all the context it needs to answer questions
    events_json = json.dumps([event.model_dump(mode='json') for event in events], indent=2)

    # --- This is the core of the AI integration: The Prompt ---
    prompt = f"""
    You are an expert AI assistant for a Quality Management System (QMS) in a life science company.
    Your role is to help users analyze and understand their QMS events.

    Here is the current list of all QMS events in the system, in JSON format:
    ```json
    {events_json}
    ```

    Now, please answer the following user's question based ONLY on the data provided above.
    Be concise and clear in your response.

    User's Question: "{query}"

    Your Answer:
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return "An error occurred while communicating with the AI model."

