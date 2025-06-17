import spacy
from typing import List, Dict
import google.generativeai as genai
import json
import re

# --- Embed your Gemini API key here ---
GEMINI_API_KEY = "AIzaSyCwg902HLytTm7bwpxMFv70EluwPdFGuoo"

nlp = spacy.load("en_core_web_sm")

# ---- FULL COURSE PLAN PROMPT ----
FULL_COURSE_PROMPT = """
You are an expert course designer. Given the following educational content, do the following:

1. Remove any irrelevant, redundant, or off-topic information. Focus only on the core subject matter.
2. Analyze the content and break it down into logical topics or modules, each suitable for a 1-hour study session.
3.For each topic/module:
    - Provide a short, descriptive topic name (3-5 words).
    - Assign a difficulty level: "easy", "medium", or "hard" (easy topics first, then medium, then hard).
    - Write a concise summary (2-4 sentences) of the topic.
    - Generate exactly 5 unique, high-quality multiple-choice questions (MCQs) with 4 options (A, B, C, D), and provide the correct answer for each. The questions must be challenging and cover different aspects of the topic. Do not repeat questions.

4. Group the topics into weeks, assuming the learner studies {hours_per_week} hours per week. Each week should contain a set of topics whose total estimated study time does not exceed {hours_per_week} hours.

5. Output ONLY in the following JSON format (no extra text):

{{
  "weekly_plan": [
    {{
      "week": 1,
      "topics": [
        {{
          "topic_name": "GRC Fundamentals",
          "summary": "...",
          "difficulty": "easy",
          "questions": [
            {{
              "question": "...",
              "options": ["A", "B", "C", "D"],
              "answer": "A"
            }},
            ...
          ]
        }},
        ...
      ]
    }},
    ...
  ]
}}

Content: {content}
"""

# ---- CHUNKED MCQ PROMPT ----
CHUNK_PROMPT = """
Given the following content, do the following:
1. Create a short, descriptive topic name (3-5 words)
2. Write a concise summary (2-4 sentences)
3. Generate exactly 5 unique MCQs with 4 options (A, B, C, D) and answers
Output ONLY in this JSON format:
{{
  "topic_name": "...",
  "summary": "...",
  "questions": [
    {{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A"}},
    ...
  ]
}}
Content: {content}
"""

def build_course_plan(full_text: str, hours_per_week: int = 3) -> dict:
    """
    For small/medium content: Generate the entire course plan in one Gemini call.
    """
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')
    prompt = FULL_COURSE_PROMPT.format(hours_per_week=hours_per_week, content=full_text)
    response = model.generate_content(prompt)
    try:
        # Clean the response text to ensure valid JSON
        cleaned_text = re.sub(r'[\n\r\t]', '', response.text)
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
        cleaned_text = re.sub(r',\s*([}\]])', r'\1', cleaned_text)  # Remove trailing commas
        # Find the first valid JSON object
        match = re.search(r'(\{.*\})', cleaned_text)
        if match:
            json_str = match.group(1)
            # Additional JSON validation/cleanup
            json_str = re.sub(r',\s*}', '}', json_str)  # Remove trailing commas before closing braces
            return json.loads(json_str)
        return json.loads(cleaned_text)
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {str(e)}")
        # Try to fix common JSON formatting issues
        try:
            cleaned_text = re.sub(r',(\s*[}\]])', r'\1', cleaned_text)
            return json.loads(cleaned_text)
        except:
            raise

def chunk_text(pages: List[Dict], chunk_size: int = 5) -> List[str]:
    """
    Combine every chunk_size pages into a text chunk.
    """
    chunks = []
    for i in range(0, len(pages), chunk_size):
        chunk_text = " ".join([p['text'] for p in pages[i:i+chunk_size]])
        chunks.append(chunk_text)
    return chunks

def generate_structured_qa(text: str) -> dict:
    """
    For large content: Generate summary and MCQs for each chunk.
    """
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash-preview-05-20')
    prompt = CHUNK_PROMPT.format(content=text)
    response = model.generate_content(prompt)
    try:
        # Clean the response text to ensure valid JSON
        cleaned_text = re.sub(r'[\n\r\t]', '', response.text)
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
        cleaned_text = re.sub(r',\s*([}\]])', r'\1', cleaned_text)
        # Find the first valid JSON object
        match = re.search(r'(\{.*\})', cleaned_text)
        if match:
            json_str = match.group(1)
            json_str = re.sub(r',\s*}', '}', json_str)
            return json.loads(json_str)
        return json.loads(cleaned_text)
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {str(e)}")
        try:
            cleaned_text = re.sub(r',(\s*[}\]])', r'\1', cleaned_text)
            return json.loads(cleaned_text)
        except:
            raise

def classify_difficulty(text: str) -> str:
    """
    Simple heuristic for difficulty.
    """
    doc = nlp(text)
    tech_terms = len([token.text for token in doc if token.pos_ in ["NOUN", "PROPN"]])
    if len(text.split()) < 150 and tech_terms < 5:
        return "easy"
    elif len(text.split()) < 400 and tech_terms < 10:
        return "medium"
    return "hard"

def build_chunked_course_plan(pages: List[Dict], hours_per_week: int = 3) -> dict:
    """
    For large content: Generate MCQs and summaries per chunk, then assemble into weeks.
    """
    chunks = chunk_text(pages, chunk_size=5)
    topics = []
    for chunk in chunks:
        qa_data = generate_structured_qa(chunk)
        difficulty = classify_difficulty(chunk)
        topics.append({
            "topic_name": qa_data.get("topic_name", "Unnamed Topic"),
            "summary": qa_data.get("summary", ""),
            "difficulty": difficulty,
            "questions": qa_data.get("questions", [])
        })
    # Sort by difficulty
    topics = sorted(topics, key=lambda x: ["easy", "medium", "hard"].index(x["difficulty"]))
    # Group into weeks
    weekly_plan = []
    i = 0
    week = 1
    while i < len(topics):
        week_topics = topics[i:i+hours_per_week]
        weekly_plan.append({
            "week": week,
            "topics": week_topics
        })
        i += hours_per_week
        week += 1
    return {"total_weeks": len(weekly_plan), "weekly_plan": weekly_plan}
