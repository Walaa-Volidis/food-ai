import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { z } from 'zod';
import { SERVER_SETTINGS } from '../../../settings';
import { uploadToS3 } from '../../../lib/uploadToS3';

const ZResponseSchema = z.discriminatedUnion('isFood', [
  z.object({
    isFood: z.literal(true),
    dishName: z.string(),
    cuisine: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    cookingTime: z.string(),
    servings: z.string(),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
    nutritionInfo: z.string(),
  }),
  z.object({
    isFood: z.literal(false),
  }),
]);

const groq = new Groq({
  apiKey: SERVER_SETTINGS.groqApiKey,
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get('image');

  if (!image) {
    return NextResponse.json({ error: 'no image uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await (image as Blob).arrayBuffer());
  let imageUrl = '';
  try {
    imageUrl = await uploadToS3(buffer);
  } catch (error) {
    console.log('Error uploading image', error);
    return NextResponse.json(
      { error: 'Error uploading image' },
      { status: 500 }
    );
  }
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `This is an image of food at URL: ${imageUrl}. Analyze it and answer the following:

            - **Is Food**: Is this image of a food dish? (true/false)
            - If yes, provide:
            - **Dish Name**: Name of the dish
            - **Cuisine**: Type of cuisine (e.g., Italian, Indian, etc.)
            - **Difficulty**: How hard is it to make? (easy, medium, hard)
            - **Cooking Time**: Estimated time to cook
            - **Servings**: Number of servings
            - **Ingredients**: List of ingredients
            - **Instructions**: Step-by-step instructions
            - **Nutrition Info**: Short nutrition summary
            - If not food, return only { "isFood": false }

            Respond ONLY in JSON format with this structure:
            If food:
            {
            "isFood": true,
            "dishName": string,
            "cuisine": string,
            "difficulty": "easy" | "medium" | "hard",
            "cookingTime": string,
            "servings": string,
            "ingredients": [string, ...],
            "instructions": [string, ...],
            "nutritionInfo": string
            }
            If not food:
            {
            "isFood": false
            }`,
      },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
    response_format: { type: 'json_object' },
  });
  try {
    const content = chatCompletion.choices[0].message.content;
    if (!content)
      return NextResponse.json({ error: 'No content' }, { status: 500 });
    const parsedData = ZResponseSchema.safeParse(JSON.parse(content));
    return NextResponse.json(parsedData.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error occurred while parsing response: ${error}` },
      { status: 500 }
    );
  }
}
